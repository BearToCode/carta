import { execAsync, packages } from './packages.js';
import prettier from 'prettier';
import ora from 'ora';
import process from 'process';
import fs from 'fs';
import readline from 'readline';

let versionDigits = currentVersion.split('.').map((digit) => Number(digit));

switch (process.argv.at(-1)) {
	case 'major':
		versionDigits[0]++;
		versionDigits[1] = 0;
		versionDigits[2] = 0;
		break;
	case 'minor':
		versionDigits[1]++;
		versionDigits[2] = 0;
		break;
	case 'patch':
		versionDigits[2]++;
		break;
	default:
		spinner.fail(`Usage pnpm run publish -- [patch | minor | major]`);
		process.exit(1);
}

const version = versionDigits.join('.');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const spinner = ora('Building packages').start();
await execAsync(`npm run build`);
spinner.stop();

const otp = await prompt('Otp: ');

spinner.start();
spinner.color = 'green';

// Get current version from main package.json
const mainPackage = JSON.parse(fs.readFileSync('package.json').toString());
const currentVersion = mainPackage.version;
if (!currentVersion) {
	spinner.fail(`Failed to read current version from package.json`);
	process.exit(1);
}

async function updatePackageVersion(path) {
	const pkgJson = JSON.parse(fs.readFileSync(path).toString());
	const prettierConfig = await prettier.resolveConfig(path);
	pkgJson.version = version;
	if (pkgJson?.peerDependencies?.['carta-md']) {
		pkgJson.peerDependencies['carta-md'] = `^${version}`;
	}
	const formatted = prettier.format(JSON.stringify(pkgJson), {
		...prettierConfig,
		parser: 'json'
	});
	fs.writeFileSync(path, formatted);
}

// Main
await updatePackageVersion('package.json');

// Packages
for (const pkg of packages) {
	// Set new version
	spinner.text = `Updating ${pkg} version`;
	const pkgPath = `packages/${pkg}/package.json`;
	await updatePackageVersion(pkgPath);

	spinner.text = `Publishing ${pkg}`;
	try {
		await execAsync(`cd packages/${pkg} && npm publish --otp=${otp} --access public`);
	} catch (e) {
		spinner.fail(`Failed to publish ${pkg}: \n ${e}`);
		process.exit(1);
	}
}

spinner.succeed(`All packages published`);
process.exit(0);
