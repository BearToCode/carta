import { packages, execAsync } from './packages.js';
import ora from 'ora';
import process from 'process';

const spinner = ora('Building packages').start();
spinner.color = 'red';

for (const pkg of packages) {
	spinner.text = `Building ${pkg}`;
	try {
		await execAsync(`cd packages/${pkg} && npm run build`);
	} catch (e) {
		spinner.fail(`Failed to build ${pkg}: \n ${e}`);
		process.exit(1);
	}
}

spinner.succeed(`All packages built`);
