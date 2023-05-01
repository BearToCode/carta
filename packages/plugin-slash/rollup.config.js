import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/index.js'
	},
	plugins: [
		svelte({
			include: 'src/**/*.svelte'
		}),
		typescript(),
		resolve({ browser: true })
	]
};
