const assert = require('node:assert/strict');

global.window = {};
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
};

require('../app/user-paper-lists.js');
const { extractPaperKey, extractPaperKeysFromText, buildListMarkdown } =
  window.DPRUserPaperLists.__test;

function testExtractPaperKey() {
  assert.equal(extractPaperKey('2401.12345'), '2401.12345');
  assert.equal(extractPaperKey('2401.12345v2'), '2401.12345');
  assert.equal(extractPaperKey('https://arxiv.org/abs/2401.12345v3'), '2401.12345');
  assert.equal(extractPaperKey('https://arxiv.org/pdf/2401.12345.pdf'), '2401.12345');
  assert.equal(extractPaperKey('arxiv:2401.12345'), '2401.12345');
  assert.equal(extractPaperKey('cs.LG/0703123v1'), 'cs.LG/0703123');
  assert.equal(extractPaperKey('10.1000/journal.2024.001'), '10.1000/journal.2024.001');
  // 纯标题等不可靠输入应丢弃
  assert.equal(extractPaperKey('A Study of Large Language Models'), '');
  assert.equal(extractPaperKey(''), '');
}

function testExtractPaperKeysFromText() {
  const md = [
    '# 已读论文',
    '- [Attention Is All You Need](https://arxiv.org/abs/1706.03762v7)',
    '- 2401.12345',
    '- https://arxiv.org/pdf/2406.00001v2.pdf',
    '- doi.org/10.1000/abc.123',
    '- 没有标识符的一行',
  ].join('\n');
  const keys = extractPaperKeysFromText(md);
  assert.ok(keys.includes('1706.03762'), 'arxiv url');
  assert.ok(keys.includes('2401.12345'), 'bare id');
  assert.ok(keys.includes('2406.00001'), 'pdf url with version');
  assert.ok(keys.includes('10.1000/abc.123'), 'doi');
  assert.equal(keys.length, 4, 'dedupe + no false positives');
}

function testBuildListMarkdown() {
  const markdown = buildListMarkdown('已读论文清单', [
    { id: '2401.12345', title: 'Example Paper', link: '', siteHref: '#/202603/06/2401.12345-example' },
  ]);
  assert.ok(markdown.includes('# 已读论文清单'));
  assert.ok(markdown.includes('[Example Paper](https://arxiv.org/abs/2401.12345)'));
  assert.ok(markdown.includes('`(2401.12345)`'));
}

testExtractPaperKey();
testExtractPaperKeysFromText();
testBuildListMarkdown();

console.log('user paper lists tests passed');
