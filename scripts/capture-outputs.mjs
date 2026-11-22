import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CLASSES = path.join(ROOT, 'build', 'classes', 'java', 'main');
const OUTPUTS = path.join(ROOT, 'site', 'src', 'data', 'outputs.json');
const COURSE = path.join(ROOT, 'site', 'src', 'data', 'course.mjs');
const TIMEOUT_MS = 20_000;

const notes = {
  'optional-and-friends': 'Дата и время в выводе зависят от момента запуска.',
  list: 'Время выполнения в блоке Performance зависит от машины.',
  map: 'Время выполнения в блоке Performance зависит от машины.',
  'stream-api': 'Время выполнения параллельного стрима зависит от машины.',
  synchronized: 'Порядок строк и итоговые значения могут отличаться при каждом запуске.',
  'thread-vs-runnable': 'Порядок строк может отличаться при каждом запуске.',
  'callable-future': 'Порядок выполнения задач может отличаться.',
  'thread-lifecycle': 'Порядок строк и моменты времени могут отличаться при каждом запуске.',
  'executor-service': 'Порядок выполнения задач может отличаться при каждом запуске.',
  'atomic-variables': 'Порядок выполнения потоков может отличаться, итоговое значение стабильно.',
  'stack-trace': 'Номера строк в стеке соответствуют текущей версии исходника.'
};

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function versionOf(java) {
  const result = spawnSync(java, ['-version'], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  const text = `${result.stdout ?? ''}\n${result.stderr ?? ''}`;
  const match = /version "(\d+)(?:\.(\d+))?/.exec(text);
  if (!match) return null;
  return Number(match[1]);
}

function findJava() {
  const candidates = [];

  const add = (home) => {
    if (!home) return;
    for (const name of ['java.exe', 'java']) {
      const candidate = path.join(home, 'bin', name);
      if (fs.existsSync(candidate)) {
        candidates.push(candidate);
        return;
      }
    }
  };

  add(process.env.JAVA_HOME);

  const jdks = path.join(os.homedir(), '.jdks');
  if (fs.existsSync(jdks)) {
    const dirs = fs.readdirSync(jdks).filter((name) => fs.statSync(path.join(jdks, name)).isDirectory());
    for (const dir of dirs) add(path.join(jdks, dir));
  }

  for (const base of ['C:/Program Files/Java', 'C:/Program Files/Eclipse Adoptium']) {
    if (!fs.existsSync(base)) continue;
    for (const dir of fs.readdirSync(base)) add(path.join(base, dir));
  }

  const scored = [];
  for (const java of candidates) {
    const major = versionOf(java);
    if (major && major >= 17) scored.push({ java, major });
  }
  scored.sort((a, b) => {
    const rank = (major) => (major === 21 ? 0 : major === 17 ? 1 : major === 22 ? 2 : major === 23 ? 3 : 4);
    return rank(a.major) - rank(b.major) || b.major - a.major;
  });
  return scored[0] ?? null;
}

const jdk = findJava();
if (!jdk) fail('Не найден JDK 17+. Установите JDK 21 или задайте JAVA_HOME.');

console.log(`JDK: ${jdk.java} (${jdk.major})`);

if (!fs.existsSync(CLASSES)) {
  console.log('Классы не найдены, запускаю Gradle compileJava…');
  const home = path.dirname(path.dirname(jdk.java));
  const gradle = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
  const result = spawnSync(gradle, ['compileJava', '--console=plain', '--no-daemon'], {
    cwd: ROOT,
    env: { ...process.env, JAVA_HOME: home },
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  if (result.status !== 0) fail('Не удалось скомпилировать Java-классы.');
}

const { lessons } = await import(pathToFileURL(COURSE).href);
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ljc-capture-'));
const result = {};
let totalRuns = 0;
let skipped = 0;

try {
  for (const lesson of lessons) {
    if (!lesson.runs?.length) continue;
    const runs = [];
    for (const fqcn of lesson.runs) {
      const run = spawnSync(jdk.java, ['-Dstdout.encoding=UTF-8', '-Dstderr.encoding=UTF-8', '-cp', CLASSES, fqcn], {
        cwd: tempDir,
        encoding: 'utf8',
        timeout: TIMEOUT_MS,
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      });

      if (run.error) {
        console.warn(`  ! ${fqcn}: ${run.error.code === 'ETIMEDOUT' ? 'таймаут' : run.error.message}`);
        skipped += 1;
        continue;
      }
      if (run.status !== 0) {
        const stderr = (run.stderr || '').trim().split('\n').slice(0, 3).join('\n');
        console.warn(`  ! ${fqcn}: exit ${run.status}${stderr ? `\n${stderr}` : ''}`);
        skipped += 1;
        continue;
      }

      const output = (run.stdout || '').replace(/\r\n?/g, '\n').replace(/\s+$/g, '');
      if (!output.trim()) {
        console.warn(`  ! ${fqcn}: пустой вывод, пропускаю`);
        skipped += 1;
        continue;
      }

      runs.push({ class: fqcn, output });
      totalRuns += 1;
      console.log(`  ✓ ${fqcn}: ${output.split('\n').length} строк`);
    }
    if (runs.length) {
      result[lesson.id] = notes[lesson.id] ? { note: notes[lesson.id], runs } : { runs };
    }
  }
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

fs.writeFileSync(OUTPUTS, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(`\n✓ ${path.relative(ROOT, OUTPUTS)}`);
console.log(`  уроков с выводом: ${Object.keys(result).length}, запусков: ${totalRuns}, пропущено: ${skipped}`);
