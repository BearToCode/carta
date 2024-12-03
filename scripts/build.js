import { packages, execAsync } from './packages.js';
import ora from 'ora';
import process from 'process';

const spinner = ora().start();

spinner.color = 'red';

// Include docs in the build process
const buildTargets = [...packages, 'docs'];

for (const [index, target] of buildTargets.entries()) {
	spinner.text = `Building ${target} [${index + 1}/${buildTargets.length}]`;
	try {
		const buildPath = target === 'docs' ? './docs' : `./packages/${target}`;
		await execAsync(`pnpm run build`, buildPath);
	} catch (e) {
		spinner.fail(`Failed to build ${target}: \n ${e}`);
		process.exit(1);
	}
}

spinner.succeed(`All packages and docs built`);
