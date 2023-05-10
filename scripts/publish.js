import { execAsync, packages } from './packages.js';
import prettier from 'prettier';
import ora from 'ora';
import process from 'process';
import fs from 'fs';

const spinner = ora('Publishing packages').start();
spinner.color = 'green';

// Get current version from main package.json
const mainPackage = JSON.parse(fs.readFileSync('package.json').toString());
const currentVersion = mainPackage.version;
if (!currentVersion) {
	spinner.fail(`Failed to read current version from package.json`);
	process.exit(1);
}

let versionDigits = currentVersion.split('.').map((digit) => Number(digit));

switch (process.argv.at(-2)) {
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
		spinner.fail(`Usage pnpm run publish -- [patch | minor | major] <otp>`);
		process.exit(1);
}

const opt = process.argv.at(-1);

const version = versionDigits.join('.');

async function updatePackageVersion(path) {
	const pkgJson = JSON.parse(fs.readFileSync(path).toString());
	const prettierConfig = await prettier.resolveConfig(path);
	pkgJson.version = version;
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

	// Build package
	spinner.text = `Building ${pkg}`;
	try {
		await execAsync(`cd packages/${pkg} && npm run build`);
	} catch (e) {
		spinner.fail(`Failed to build ${pkg}: \n ${e}`);
		process.exit(1);
	}

	spinner.text = `Publishing ${pkg}`;
	try {
		await execAsync(`cd packages/${pkg} && npm publish --otp=${opt} --access public`);
	} catch (e) {
		spinner.fail(`Failed to publish ${pkg}: \n ${e}`);
		process.exit(1);
	}
}

spinner.succeed(`All packages published`);
