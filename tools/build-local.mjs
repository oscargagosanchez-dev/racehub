import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

const updater = spawnSync(process.execPath, [path.join(here, 'update-risan-project.mjs')], {
  cwd: root,
  stdio: 'inherit'
});
if (updater.status !== 0) process.exit(updater.status ?? 1);

const parts = ['app.part1.txt','app.part2.txt','app.part3.txt','app.part4.txt','app.part5.txt'];
const output = parts.map(file => fs.readFileSync(path.join(root, file), 'utf8')).join('');
fs.writeFileSync(path.join(root, 'app.js'), output, 'utf8');

console.log('Build local generado: app.js');
