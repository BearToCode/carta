import * as childProcess from 'child_process';

export const execAsync = (command, cwd = undefined) =>
	new Promise((resolve, reject) => {
		const child = childProcess.spawn(command, { cwd, shell: true });
		let out = '';

		child.stdout.setEncoding('utf8');
		child.stdout.on('data', function (data) {
			out += 'stdout: ' + data.toString();
		});

		child.stderr.setEncoding('utf8');
		child.stderr.on('data', function (data) {
			out += 'stderr: ' + data.toString();
		});

		child.on('error', (e) => {
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
	'plugin-tikz'
];
