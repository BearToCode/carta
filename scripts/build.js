import { packages, execAsync } from './packages.js';
import ora from 'ora';
import process from 'process';

const spinner = ora().start();

spinner.color = 'red';

for (const [index, pkg] of packages.entries()) {
	spinner.text = `Building ${pkg} [${index + 1}/${packages.length}]`;
	try {
		await execAsync(`npm run build`, `./packages/${pkg}`);
	} catch (e) {
		spinner.fail(`Failed to build ${pkg}: \n ${e}`);
		process.exit(1);
	}
}

spinner.succeed(`All packages built`);
