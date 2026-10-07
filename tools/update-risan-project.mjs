import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const manifestPath = path.join(root, 'risan-project.json');
const versionPath = path.join(root, 'VERSION');

const readJson = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const writeJson = (p, value) => fs.writeFileSync(p, JSON.stringify(value, null, 2) + '\n', 'utf8');

const args = process.argv.slice(2);
const getArg = name => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : null;
};

const manifest = readJson(manifestPath);
const version = fs.existsSync(versionPath) ? fs.readFileSync(versionPath, 'utf8').trim() : manifest.project.current_version;

manifest.project.current_version = getArg('--version') || version;
manifest.project.development_status = getArg('--status') || manifest.project.development_status;
manifest.project.last_important_change = getArg('--last-change') || manifest.project.last_important_change;
manifest.planning.next_objective = getArg('--next-objective') || manifest.planning.next_objective;

const openBug = getArg('--open-bug');
if (openBug && !manifest.quality.open_bugs.includes(openBug)) manifest.quality.open_bugs.push(openBug);

const fixedBug = getArg('--fix-bug');
if (fixedBug) {
  manifest.quality.open_bugs = manifest.quality.open_bugs.filter(x => x !== fixedBug);
  if (!manifest.quality.fixed_bugs.includes(fixedBug)) manifest.quality.fixed_bugs.push(fixedBug);
}

const addTask = getArg('--add-task');
if (addTask && !manifest.planning.pending_tasks.includes(addTask)) manifest.planning.pending_tasks.push(addTask);

const doneTask = getArg('--done-task');
if (doneTask) manifest.planning.pending_tasks = manifest.planning.pending_tasks.filter(x => x !== doneTask);

manifest.project.project_path = '.';
manifest.project.path_mode = 'manifest_directory';
manifest.project.last_updated = new Date().toISOString();

writeJson(manifestPath, manifest);
console.log('Risan Workspace manifest actualizado:', manifestPath);
