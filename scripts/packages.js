import * as childProcess from 'child_process';
import { stderr, stdout } from 'process';

export const execAsync = (command, cwd = undefined, options = { showLog: false }) =>
	new Promise((resolve, reject) => {
		const child = childProcess.spawn(command, { cwd, shell: true });
		let out = '';

		child.stdout.setEncoding('utf8');
		child.stdout.on('data', function (data) {
			if (options?.showLog) stdout.write(data);
			else out += 'stdout: ' + data.toString();
		});

		child.stderr.setEncoding('utf8');
		child.stderr.on('data', function (data) {
			if (options?.showLog) stderr.write(data);
			else out += 'stderr: ' + data.toString();
		});

		child.on('error', (e) => {
			if (options?.showLog) return;
			console.log(out);
			console.log(e);
		});

		child.on('close', function (code) {
			if (code != 0) reject(out);
			resolve();
		});
	});

/**
 * List of all the packages.
 */
export const packages = [
	'carta-md',
	'plugin-math',
	'plugin-slash',
	'plugin-emoji',
	'plugin-code',
	'plugin-tikz',
	'plugin-attachment'
];
