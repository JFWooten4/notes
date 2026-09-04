import {cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync} from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceYears = readdirSync(root, {withFileTypes: true})
  .filter((entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name))
  .map((entry) => entry.name)
  .sort();
const docsRoot = path.join(root, 'docs', 'notes');
const monthsRoot = path.join(root, 'docs', 'months');
const staticFilesRoot = path.join(root, 'static', 'files');
const noteRecords = [];

const monthNumbers = {
  Jan: '1',
  Feb: '2',
  Mar: '3',
  Apr: '4',
  May: '5',
  Jun: '6',
  Jul: '7',
  Aug: '8',
  Sep: '9',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

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

function frontMatter(title, slug, sidebarPosition) {
  return [
    '---',
    `title: ${title}`,
    `slug: /${slug}`,
    `sidebar_position: ${sidebarPosition}`,
    '---',
    '',
  ].join('\n');
}

function normalizeBody(body) {
  return body.replace(/^\uFEFF/, '').trimStart();
}

function dateParts(relative, filename) {
  const [year, ...directories] = relative;
  const stem = path.basename(filename, path.extname(filename));
  const rawDate = /^\d+$/.test(stem) ? [...directories, stem] : directories;

  if (!/^\d{4}$/.test(year) || rawDate.length !== 2) {
    throw new Error(`Cannot derive a date from ${path.join(...relative, filename)}`);
  }

  const [rawMonth, rawDay] = rawDate;
  const month = monthNumbers[rawMonth] ?? String(Number(rawMonth));
  const day = String(Number(rawDay));

  if (!/^\d+$/.test(month) || !/^\d+$/.test(day) || month === 'NaN' || day === 'NaN') {
    throw new Error(`Cannot derive a date from ${path.join(...relative, filename)}`);
  }

  return {year, month, day};
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
      const {month, day} = dateParts(relative, entry.name);
      const destinationDir = path.join(docsRoot, year);
      const destinationFile = path.join(destinationDir, `${month}-${day}.md`);
      const slug = `${year}/${month}/${day}`;
      const title = titleFromSegments(year, rest.slice(0, -1), entry.name);
      const content = normalizeBody(readFileSync(absolute, 'utf8'));
      ensureDir(destinationDir);
      if (existsSync(destinationFile)) {
        throw new Error(`Multiple notes resolve to ${slug}`);
      }
      writeFileSync(
        destinationFile,
        `${frontMatter(title, slug, Number(month) * 100 + Number(day))}${content}\n`,
      );
      noteRecords.push({year, month, day, title, slug});
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
if (existsSync(monthsRoot)) {
  rmSync(monthsRoot, {recursive: true, force: true});
}
if (existsSync(staticFilesRoot)) {
  rmSync(staticFilesRoot, {recursive: true, force: true});
}

ensureDir(docsRoot);
ensureDir(staticFilesRoot);

for (const year of sourceYears) {
  const yearPath = path.join(root, year);
  if (existsSync(yearPath) && statSync(yearPath).isDirectory()) {
    walk(yearPath, [year]);
  }
}

const notesByMonth = new Map();
for (const note of noteRecords) {
  const key = `${note.year}-${note.month}`;
  const notes = notesByMonth.get(key) ?? [];
  notes.push(note);
  notesByMonth.set(key, notes);
}
ensureDir(monthsRoot);

for (const notes of notesByMonth.values()) {
  const [{year, month}] = notes;
  const title = `${monthNames[Number(month) - 1]} ${year}`;
  const items = notes
    .sort((left, right) => Number(left.day) - Number(right.day))
    .map((note) => ({
      type: 'link',
      href: `/${note.slug}`,
      label: note.title,
    }));

  writeFileSync(
    path.join(monthsRoot, `${year}-${month}.md`),
    [
      '---',
      `title: ${title}`,
      `slug: /${year}/${month}`,
      'displayed_sidebar: docsSidebar',
      '---',
      '',
      "import DocCardList from '@theme/DocCardList';",
      '',
      `<DocCardList items={${JSON.stringify(items)}} />`,
      '',
    ].join('\n'),
  );
}
