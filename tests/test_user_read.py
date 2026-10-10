import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from user_read import (
    collect_user_read_keys,
    extract_paper_key,
    load_supabase_backend_from_config,
    load_user_read_file,
)


class ExtractPaperKeyTest(unittest.TestCase):
    def test_arxiv_variants(self):
        self.assertEqual(extract_paper_key("2401.12345"), "2401.12345")
        self.assertEqual(extract_paper_key("2401.12345v2"), "2401.12345")
        self.assertEqual(extract_paper_key("https://arxiv.org/abs/2401.12345v3"), "2401.12345")
        self.assertEqual(extract_paper_key("https://arxiv.org/pdf/2401.12345.pdf"), "2401.12345")
        self.assertEqual(extract_paper_key("arxiv:2401.12345"), "2401.12345")
        self.assertEqual(extract_paper_key("cs.LG/0703123v1"), "cs.LG/0703123")

    def test_doi_normalized(self):
        self.assertEqual(
            extract_paper_key("10.1000/JOURNAL.2024.001"),
            "10.1000/journal.2024.001",
        )

    def test_unreliable_input_dropped(self):
        self.assertEqual(extract_paper_key("A Study of LLMs"), "")
        self.assertEqual(extract_paper_key(""), "")
        self.assertEqual(extract_paper_key(None), "")


class LoadUserReadFileTest(unittest.TestCase):
    def test_load_and_canonicalize(self):
        import json
        import tempfile

        with tempfile.TemporaryDirectory() as tmp:
            archive = Path(tmp)
            payload = {
                "version": 1,
                "items": [
                    {"id": "2401.12345v2", "status": "good", "title": "A"},
                    {"id": "https://arxiv.org/abs/2406.00001", "status": "bad", "title": "B"},
                    "cs.LG/0703123",
                    {"id": "not-a-paper", "status": "read"},
                ],
            }
            (archive / "user_read.json").write_text(
                json.dumps(payload, ensure_ascii=False), encoding="utf-8"
            )
            records = load_user_read_file(str(archive))
        self.assertEqual(set(records.keys()), {"2401.12345", "2406.00001", "cs.LG/0703123"})
        self.assertEqual(records["2401.12345"]["status"], "good")

    def test_missing_file(self):
        self.assertEqual(load_user_read_file("Z:/nonexistent-dir-xyz"), {})


class CollectKeysTest(unittest.TestCase):
    def test_backend_none_uses_file_only(self):
        import json
        import tempfile

        with tempfile.TemporaryDirectory() as tmp:
            archive = Path(tmp)
            (archive / "user_read.json").write_text(
                json.dumps({"version": 1, "items": [{"id": "2401.12345"}]}),
                encoding="utf-8",
            )
            keys = collect_user_read_keys(str(archive), backend=None)
        self.assertEqual(keys, {"2401.12345"})

    def test_backend_unreachable_returns_file_keys(self):
        import json
        import tempfile

        with tempfile.TemporaryDirectory() as tmp:
            archive = Path(tmp)
            (archive / "user_read.json").write_text(
                json.dumps({"version": 1, "items": [{"id": "2401.12345"}]}),
                encoding="utf-8",
            )
            keys = collect_user_read_keys(
                str(archive),
                backend={"url": "https://invalid.example.supabase.co", "anon_key": "k"},
            )
        self.assertEqual(keys, {"2401.12345"})


class ConfigBackendTest(unittest.TestCase):
    def test_load_from_config(self):
        import tempfile

        with tempfile.TemporaryDirectory() as tmp:
            cfg = Path(tmp) / "config.yaml"
            cfg.write_text(
                "supabase:\n  url: https://example.supabase.co\n  anon_key: pub-key\n",
                encoding="utf-8",
            )
            backend = load_supabase_backend_from_config(str(cfg))
        self.assertEqual(backend, {"url": "https://example.supabase.co", "anon_key": "pub-key"})

    def test_missing_config(self):
        self.assertIsNone(load_supabase_backend_from_config("Z:/nope.yaml"))


if __name__ == "__main__":
    unittest.main()
