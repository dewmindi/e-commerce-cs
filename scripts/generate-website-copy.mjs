import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const outputDir = path.join(rootDir, 'chatbot-data');
const outputFile = path.join(outputDir, 'website-copy.txt');

const dirsToScan = ['app', 'components', 'lib', 'data']; // Added data if it exists as top level
const extensions = ['.tsx', '.ts', '.json', '.md', '.css'];

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

let aggregatedContent = '';

function scanDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (file === 'node_modules' || file === '.next' || file === '.git') continue;
            scanDirectory(fullPath);
        } else {
            const ext = path.extname(file);
            if (extensions.includes(ext)) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    const relativePath = path.relative(rootDir, fullPath);
                    
                    // Simple heuristic to skip very large files or minified code if needed, 
                    // but for now we include everything.
                    
                    aggregatedContent += `\n\n--- FILE: ${relativePath} ---\n\n`;
                    aggregatedContent += content;
                } catch (e) {
                    console.error(`Error reading ${fullPath}:`, e);
                }
            }
        }
    }
}

console.log('Scanning directories...');
for (const dir of dirsToScan) {
    const fullPath = path.join(rootDir, dir);
    if (fs.existsSync(fullPath)) {
        console.log(`Scanning ${dir}...`);
        scanDirectory(fullPath);
    }
}

fs.writeFileSync(outputFile, aggregatedContent);
console.log(`Website copy generated at ${outputFile}`);
