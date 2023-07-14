import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

export default {
	plugins: [
		dynamicImportVars({
			// options
		})
	],
	input: [
		'node_modules/@speed-highlight/core/src/index.js',
		'node_modules/@speed-highlight/core/src/detect.js'
	],
	output: {
		dir: './dist'
	}
};
