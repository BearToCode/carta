import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';
import js from '@eslint/js';

export default [
	{
		ignores: [
			'**/dist',
			'**/build',
			'**/.svelte-kit',
			'**/assets',
			'.DS_Store',
			'node_modules',
			'/build',
			'/.svelte-kit',
			'/package',
			'.env',
			'.env.*',
			'!.env.example',
			'vite.config.js.timestamp-*',
			'vite.config.ts.timestamp-*',
			'.eslintcache',
			'.pnpm-debug.log',
			'**/dis',
			'**/tsconfig.tsbuildinf',
			'**/.rollup.cache'
		]
	},

	js.configs.recommended,
	...tsEslint.configs.recommended,
	...sveltePlugin.configs['flat/recommended'],

	{
		// No plugins block here anymore
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser
			},
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				extraFileExtensions: ['.svelte']
			}
		},

		rules: {
			'no-mixed-spaces-and-tabs': 0,
			'@typescript-eslint/no-unused-expressions': 0,
			'svelte/no-navigation-without-resolve': 0
		}
	},

	{
		files: ['**/*.svelte'],

		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser
			}
		}
	}
];
