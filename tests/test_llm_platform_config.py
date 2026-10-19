import sys
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from llm import (
    DEFAULT_DEEPSEEK_BASE_URL,
    LLMClient,
    ClientFactory,
    resolve_llm_config,
)


def _clear_env():
    return patch.dict(
        os.environ,
        {
            "LLM_API_KEY": "",
            "LLM_BASE_URL": "",
            "LLM_MODEL": "",
            "SUMMARY_API_KEY": "",
            "SUMMARY_BASE_URL": "",
            "SUMMARY_MODEL": "",
            "DEEPSEEK_API_KEY": "",
            "DEEPSEEK_BASE_URL": "",
            "DEEPSEEK_MODEL": "",
            "LLM_PRIMARY_BASE_URL": "",
        },
        clear=False,
    )


import os


class ResolveLlmConfigTest(unittest.TestCase):
    def test_defaults_when_nothing_set(self):
        with _clear_env():
            config = resolve_llm_config()
        self.assertEqual(config["api_key"], "")
        self.assertEqual(config["base_url"], DEFAULT_DEEPSEEK_BASE_URL)
        self.assertEqual(config["model"], "deepseek-v4-flash")

    def test_llm_names_take_priority_over_legacy(self):
        with _clear_env(), patch.dict(
            os.environ,
            {
                "LLM_API_KEY": "llm-key",
                "LLM_BASE_URL": "https://api.siliconflow.cn/v1",
                "LLM_MODEL": "Qwen/Qwen3-32B",
                "SUMMARY_API_KEY": "summary-key",
                "DEEPSEEK_API_KEY": "deepseek-key",
                "DEEPSEEK_BASE_URL": "https://api.deepseek.com",
            },
        ):
            config = resolve_llm_config()
        self.assertEqual(config["api_key"], "llm-key")
        self.assertEqual(config["base_url"], "https://api.siliconflow.cn/v1")
        self.assertEqual(config["model"], "Qwen/Qwen3-32B")

    def test_fallback_chain_per_field(self):
        with _clear_env(), patch.dict(
            os.environ,
            {
                "SUMMARY_BASE_URL": "https://summary.example.com",
                "DEEPSEEK_API_KEY": "deepseek-key",
                "DEEPSEEK_MODEL": "deepseek-chat",
            },
        ):
            config = resolve_llm_config()
        # api_key: 无 LLM_/SUMMARY_ 时回退 DEEPSEEK_API_KEY
        self.assertEqual(config["api_key"], "deepseek-key")
        # base_url: SUMMARY_BASE_URL 优先于默认值
        self.assertEqual(config["base_url"], "https://summary.example.com")
        # model: 无 LLM_/SUMMARY_ 时回退 DEEPSEEK_MODEL
        self.assertEqual(config["model"], "deepseek-chat")

    def test_model_with_slash_is_kept_raw(self):
        with _clear_env(), patch.dict(
            os.environ,
            {"LLM_MODEL": "openai/gpt-4o-mini"},
        ):
            config = resolve_llm_config()
        self.assertEqual(config["model"], "openai/gpt-4o-mini")


class ClientFactoryTest(unittest.TestCase):
    def test_custom_platform(self):
        with _clear_env(), patch.dict(
            os.environ,
            {
                "LLM_API_KEY": "sk-test",
                "LLM_BASE_URL": "https://api.example.com/v1",
                "LLM_MODEL": "my-model",
            },
        ):
            client = ClientFactory.from_env()
        self.assertIsInstance(client, LLMClient)
        self.assertEqual(client.api_key, "sk-test")
        self.assertEqual(client.model, "my-model")
        self.assertEqual(client.base_url, "https://api.example.com/v1")

    def test_missing_key_raises(self):
        with _clear_env():
            with self.assertRaises(ValueError):
                ClientFactory.from_env()


class ThinkingFieldGateTest(unittest.TestCase):
    def test_third_party_deepseek_model_is_not_official_dialect(self):
        client = LLMClient(api_key='test', model='deepseek-v4-flash', base_url='https://gateway.example/v1')
        self.assertNotEqual(client._provider_name(), 'deepseek')

    def _mock_response(self):
        resp = MagicMock()
        resp.raise_for_status.return_value = None
        resp.json.return_value = {
            "choices": [{"message": {"content": "ok"}}],
            "usage": {"prompt_tokens": 1, "completion_tokens": 1, "total_tokens": 2},
        }
        return resp

    @patch("llm.requests.post")
    def test_thinking_stripped_for_non_deepseek(self, mock_post):
        mock_post.return_value = self._mock_response()
        client = LLMClient(
            api_key="k",
            model="my-model",
            base_url="https://api.example.com/v1",
        )
        client.kwargs["thinking"] = {"type": "disabled"}
        client.chat([{"role": "user", "content": "hi"}])
        sent = mock_post.call_args.kwargs["json"]
        self.assertNotIn("thinking", sent)

    @patch("llm.requests.post")
    def test_thinking_kept_for_deepseek(self, mock_post):
        mock_post.return_value = self._mock_response()
        client = LLMClient(
            api_key="k",
            model="deepseek-v4-flash",
            base_url=DEFAULT_DEEPSEEK_BASE_URL,
        )
        client.kwargs["thinking"] = {"type": "disabled"}
        client.chat([{"role": "user", "content": "hi"}])
        sent = mock_post.call_args.kwargs["json"]
        self.assertEqual(sent.get("thinking"), {"type": "disabled"})


if __name__ == "__main__":
    unittest.main()
