import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/f_sta/IdeaProjects/learn-java-core';
const SRC = path.join(ROOT, 'src/main/java/org/baileyseyes');
const APP = path.join(ROOT, 'app.js');

const app = fs.readFileSync(APP, 'utf8');

function sliceBlock(marker) {
    const start = app.indexOf(marker);
    if (start === -1) throw new Error('marker not found: ' + marker);
    const end = app.indexOf('\n    ];', start);
    return app.slice(start, end);
}

const ids = [];
for (const marker of ['var CHAIN_NODES = [', 'var EXTRA_NODES = [']) {
    const block = sliceBlock(marker);
    const re = /^\s{8}\['([^']+)',\s*'(class|interface|enum|record|annotation)'/gm;
    let m;
    while ((m = re.exec(block)) !== null) ids.push({ id: m[1], kind: m[2] });
}

const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n?/g, '\n').replace(/\s+$/, '');

function extractNested(fileText, declRegex) {
    const m = declRegex.exec(fileText);
    if (!m) return null;
    const from = fileText.lastIndexOf('\n', m.index) + 1;
    let i = fileText.indexOf('{', m.index);
    let depth = 0;
    for (; i < fileText.length; i++) {
        if (fileText[i] === '{') depth++;
        else if (fileText[i] === '}') { depth--; if (depth === 0) { i++; break; } }
    }
    return fileText.slice(from, i);
}

const out = [];
const stats = [];

for (const { id } of ids) {
    let code = null;
    let loc = null;

    if (id === '_7.Container') {
        const t = read(path.join(SRC, '_7/GenericsDemo.java'));
        const nested = extractNested(t, /^\s*static class Container<T> \{/m);
        if (nested) {
            code = 'package org.baileyseyes._7;\n\n' +
                '// Вложенный static-класс внутри GenericsDemo.java (файл GenericsDemo.java)\n' +
                nested.replace(/\bstatic class\b/, 'class') + '\n';
        }
    } else {
        const file = path.join(SRC, id.split('.').join('/') + '.java');
        if (fs.existsSync(file)) {
            code = read(file);
            loc = code.split('\n').length;
        }
    }

    if (code === null) { stats.push('MISSING  ' + id); continue; }
    const safe = code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    out.push("    SNIPPETS['" + id + "'] = `" + safe + '`;');
    stats.push('OK       ' + id + '  ' + (loc ?? '-'));
}

const banner = [
    '    /*',
    '     * Полные тексты исходников. Сгенерировано из src/main/java — не править вручную,',
    '     * иначе код на странице разъедется с реальным файлом.',
    '     */',
    ''
].join('\n');

const newBlock = '    var SNIPPETS = {};\n\n' + banner + '\n' + out.join('\n\n') + '\n';

const headMark = '    var SNIPPETS = {};';
const tailMark = '    var KIND_COLORS =';
const s = app.indexOf(headMark);
const e = app.indexOf(tailMark);
if (s === -1 || e === -1 || e < s) throw new Error('SNIPPETS block bounds not found');

fs.writeFileSync(APP, app.slice(0, s) + newBlock + '\n' + app.slice(e), 'utf8');

console.log(stats.join('\n'));
console.log('total ids:', ids.length, '| snippets:', out.length);
console.log('app.js bytes:', fs.statSync(APP).size);