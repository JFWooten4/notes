import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {test} from 'node:test';
import {fileURLToPath} from 'node:url';

const syncScript = fileURLToPath(new URL('./sync-notes.mjs', import.meta.url));

function fixture(t) {
  const root = mkdtempSync(path.join(tmpdir(), 'notes-latest-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));

  return {
    add(relativePath) {
      const destination = path.join(root, relativePath);
      mkdirSync(path.dirname(destination), {recursive: true});
      writeFileSync(destination, `# ${relativePath}\n`);
    },
    sync() {
      execFileSync(process.execPath, [syncScript], {cwd: root});
      return JSON.parse(readFileSync(path.join(root, 'docs', 'latest-note.json'), 'utf8')).path;
    },
  };
}

test('selects the latest note by numeric year, month, and day', (t) => {
  const notes = fixture(t);
  notes.add('2025/Dec/31.md');
  notes.add('2026/Sep/30.md');
  notes.add('2026/Oct/2.md');

  assert.equal(notes.sync(), '/2026/10/2');
});

test('refreshes the latest note path on successive builds', (t) => {
  const notes = fixture(t);
  notes.add('2026/Mar/6.md');
  assert.equal(notes.sync(), '/2026/3/6');

  notes.add('2026/May/6.md');
  assert.equal(notes.sync(), '/2026/5/6');

  notes.add('2027/Jan/1.md');
  assert.equal(notes.sync(), '/2027/1/1');
});
