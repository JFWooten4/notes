import {cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync} from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceYears = ['2024', '2025', '2026'];
const docsRoot = path.join(root, 'docs', 'notes');
const staticFilesRoot = path.join(root, 'static', 'files');

const monthOrder = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

function ensureDir(dir) {
  mkdirSync(dir, {recursive: true});
}

function titleFromSegments(year, parts, filename) {
  const stem = filename.replace(/\.[^.]+$/, '');
  const named = stem.replace(/[-_]/g, ' ').trim();
  if (/^\d+$/.test(named) && parts.length > 0) {
    return `${year} ${parts.join(' ')} ${named}`;
  }
  return named.replace(/\b\w/g, (c) => c.toUpperCase());
}

function frontMatter(title, slug) {
  return ['---', `title: ${title}`, `slug: /notes/${slug}`, '---', ''].join('\n');
}

function normalizeBody(body) {
  return body.replace(/^\uFEFF/, '').trimStart();
}

function walk(dir, relative = []) {
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const absolute = path.join(dir, entry.name);
    const nextRelative = [...relative, entry.name];

    if (entry.isDirectory()) {
      walk(absolute, nextRelative);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (extension === '.md') {
      const [year, ...rest] = nextRelative;
      const destinationDir = path.join(docsRoot, ...relative);
      const destinationFile = path.join(destinationDir, entry.name);
      const slugParts = [...relative, path.basename(entry.name, extension)]
        .map((part) => monthOrder[part] ?? part)
        .join('/');
      const title = titleFromSegments(year, rest.slice(0, -1), entry.name);
      const content = normalizeBody(readFileSync(absolute, 'utf8'));
      ensureDir(destinationDir);
      writeFileSync(destinationFile, `${frontMatter(title, slugParts)}${content}\n`);
      continue;
    }

    if (extension === '.pdf') {
      const destinationDir = path.join(staticFilesRoot, ...relative);
      ensureDir(destinationDir);
      cpSync(absolute, path.join(destinationDir, entry.name));
    }
  }
}

ensureDir(path.join(root, 'docs'));
ensureDir(path.join(root, 'static'));

if (existsSync(docsRoot)) {
  rmSync(docsRoot, {recursive: true, force: true});
}
if (existsSync(staticFilesRoot)) {
  rmSync(staticFilesRoot, {recursive: true, force: true});
}

ensureDir(docsRoot);
ensureDir(staticFilesRoot);

writeFileSync(
  path.join(docsRoot, 'index.md'),
  ['---', 'title: Notes Index', 'slug: /notes', '---', '', 'Generated note pages live under this section and are grouped by year.', '', 'Use the sidebar to browse chronologically.', ''].join('\n'),
);

for (const year of sourceYears) {
  const yearPath = path.join(root, year);
  if (existsSync(yearPath) && statSync(yearPath).isDirectory()) {
    walk(yearPath, [year]);
  }
}
