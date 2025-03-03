import { packages, execAsync } from './packages.js';
import ora from 'ora';
import process from 'process';

const spinner = ora().start();

spinner.color = 'red';

for (const [index, target] of packages.entries()) {
	spinner.text = `Building ${target} [${index + 1}/${packages.length}]`;
	try {
		const buildPath = `./packages/${target}`;
		await execAsync(`pnpm run build`, buildPath);
	} catch (e) {
		spinner.fail(`Failed to build ${target}: \n ${e}`);
		process.exit(1);
	}
}

spinner.succeed(`All packages and docs built`);
