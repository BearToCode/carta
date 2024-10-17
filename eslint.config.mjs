import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import parser from 'svelte-eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

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
	...compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended'
	),
	{
		plugins: {
			'@typescript-eslint': typescriptEslint
		},

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

		settings: {
			'svelte3/typescript': true
		},

		rules: {
			'no-mixed-spaces-and-tabs': 0,
			'@typescript-eslint/no-unused-expressions': 0
		}
	},
	{
		files: ['**/*.svelte'],

		languageOptions: {
			parser: parser,
			ecmaVersion: 5,
			sourceType: 'script',

			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	}
];
