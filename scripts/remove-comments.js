const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const exts = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass', '.html', '.md']);
const ignoreDirs = new Set(['node_modules', '.git']);
const ignoreFiles = new Set(['package-lock.json', 'yarn.lock']);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ignoreDirs.has(ent.name)) continue;
      walk(full);
    } else if (ent.isFile()) {
      if (ignoreFiles.has(ent.name)) continue;
      const ext = path.extname(ent.name).toLowerCase();
      if (exts.has(ext)) processFile(full, ext);
    }
  }
}

function processFile(filePath, ext) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const backup = filePath + '.bak';
    if (!fs.existsSync(backup)) fs.copyFileSync(filePath, backup);

    // Remove JSX comments {/* ... */}
    content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

    // Remove HTML comments <!-- ... --> (for .html and .md)
    if (ext === '.html' || ext === '.md') {
      content = content.replace(/<!--([\s\S]*?)-->/g, '');
    }

    // Remove block comments /* ... */ for css/js/scss
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');

    // Remove single-line comments for JS/TS/CSS-like files
    if (['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass'].includes(ext)) {
      const lines = content.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        // Remove lines that are only comments
        if (/^\/\//.test(trimmed)) {
          lines[i] = '';
          continue;
        }
        // Find // occurrences and remove trailing comment unless part of protocol (http:// or https://)
        const idx = line.indexOf('//');
        if (idx !== -1) {
          const before = line.slice(0, idx);
          const after = line.slice(idx + 2);
          const protoIdx = before.lastIndexOf('http:');
          const protoIdx2 = before.lastIndexOf('https:');
          if (protoIdx === -1 && protoIdx2 === -1) {
            // remove from // to end
            lines[i] = before.replace(/\s+$/,'');
          }
        }
      }
      content = lines.join('\n');
    }

    // Trim extra consecutive blank lines (more than 2)
    content = content.replace(/(\n\s*){3,}/g, '\n\n');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed:', filePath);
  } catch (err) {
    console.error('Failed:', filePath, err.message);
  }
}

console.log('Starting comment removal in', root);
walk(root);
console.log('Done. Backups created with .bak');
