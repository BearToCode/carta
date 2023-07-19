// This script builds the modified speed highlight package and copies its contents to ./speed-highlight
import { execAsync } from './packages.js';
import fs from 'fs';

await execAsync('cd speed-highlight && npm run build');

const dir = './packages/carta-md/src/lib/speed-highlight';

if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}
fs.cpSync('./speed-highlight/dist', dir, { recursive: true });
