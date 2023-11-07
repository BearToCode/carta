import { execAsync, packages } from './packages.js';

for (const pkg of packages) {
	await execAsync(
		`npx --no-install semantic-release -e semantic-release-monorepo`,
		`./packages/${pkg}`,
		{ showLog: true }
	);
}
