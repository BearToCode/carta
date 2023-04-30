import { packages, execAsync } from './packages.js';
import ora from 'ora';

let succeeded = true;
const spinner = ora('Building packages').start();
spinner.color = 'red';

for (const pkg of packages) {
	spinner.text = `Building ${pkg}`;
	try {
		await execAsync(`cd packages/${pkg} && npm run build`);
	} catch (e) {
		spinner.fail(`Failed to build ${pkg}: \n ${e}`);
		succeeded = false;
	}
}

if (succeeded) spinner.succeed(`All packages built`);
