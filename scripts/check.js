import { packages, execAsync } from './packages.js';
import ora from 'ora';

const spinner = ora('Checking packages').start();
spinner.color = 'red';

for (const pkg of packages) {
	spinner.text = `Checking ${pkg}`;
	try {
		await execAsync(`cd packages/${pkg} && npm run check`);
	} catch (e) {
		spinner.fail(`Failed to check ${pkg}: \n ${e}`);
	}
}

spinner.succeed(`No errors found`);
