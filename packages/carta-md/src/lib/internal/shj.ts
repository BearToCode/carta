import { detectLanguage } from '@speed-highlight/core/detect.js';
import type { ShjLanguageDefinition } from '@speed-highlight/core';

/**
 * Markdown syntax highlighting rules.
 */
const cartaMarkdown: ShjLanguageDefinition = [
	{
		type: 'cmnt',
		match: /^>.*|(=|-)\1+/gm
	},
	{
		type: 'class',
		match: /\*\*((?!\*\*).)*\*\*/g
	},
	{
		match: /```((?!```)[^])*\n```/g,
		sub: (code) => ({
			type: 'kwd',
			sub: [
				{
					match: /\n[^]*(?=```)/g,
					sub: code.split('\n')[0].slice(3) || detectLanguage(code)
				}
			]
		})
	},
	{
		type: 'str',
		match: /`[^`]*`/g
	},
	{
		type: 'var',
		match: /~~((?!~~).)*~~/g
	},
	{
		type: 'kwd',
		match: /_[^_]*_|\*[^*]*\*/g
	},
	{
		type: 'kwd',
		match: /^\s*(\*|\d+\.)\s/gm
	},
	{
		type: 'oper',
		match: /\[[^\]]*]/g
	},
	{
		type: 'func',
		match: /\([^)]*\)/g
	}
];

export default cartaMarkdown;
