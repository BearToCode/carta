import { type ThemeInput } from 'shiki';

const theme = {
	displayName: 'Carta Dark' as const,
	name: 'carta-dark' as const,
	semanticHighlighting: true,
	fg: '#f8f8f2',
	bg: 'transparent',
	tokenColors: [
		{
			scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
			settings: {
				foreground: '#6a737d'
			}
		},
		{
			scope: ['variable.other.constant', 'variable.other.enummember', 'variable.language'],
			settings: {
				foreground: '#fff'
			}
		},
		{
			scope: ['constant', 'entity.name.constant'],
			settings: {
				foreground: '#71d58a'
			}
		},
		{
			scope: ['entity', 'entity.name'],
			settings: {
				foreground: '#b392f0'
			}
		},
		{
			scope: 'variable.parameter.function',
			settings: {
				foreground: '#e1e4e8'
			}
		},
		{
			scope: 'entity.name.tag',
			settings: {
				foreground: '#85e89d'
			}
		},
		{
			scope: ['keyword', 'punctuation.definition.template-expression'],
			settings: {
				foreground: '#ff7cc6'
			}
		},
		{
			scope: ['storage', 'storage.type'],
			settings: {
				foreground: '#ff7cc6'
			}
		},
		{
			scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'],
			settings: {
				foreground: '#e1e4e8'
			}
		},
		{
			scope: [
				'string',
				'punctuation.definition.string',
				'string punctuation.section.embedded source'
			],
			settings: {
				foreground: '#4dacfa'
			}
		},
		{
			scope: 'support',
			settings: {
				foreground: '#71d58a'
			}
		},
		{
			scope: 'meta.property-name',
			settings: {
				foreground: '#71d58a'
			}
		},
		{
			scope: 'variable',
			settings: {
				foreground: '#b581fd'
			}
		},
		{
			scope: 'variable.other',
			settings: {
				foreground: '#e1e4e8'
			}
		},
		{
			scope: 'invalid.broken',
			settings: {
				fontStyle: 'italic',
				foreground: '#fdaeb7'
			}
		},
		{
			scope: 'invalid.deprecated',
			settings: {
				fontStyle: 'italic',
				foreground: '#fdaeb7'
			}
		},
		{
			scope: 'invalid.illegal',
			settings: {
				fontStyle: 'italic',
				foreground: '#fdaeb7'
			}
		},
		{
			scope: 'invalid.unimplemented',
			settings: {
				fontStyle: 'italic',
				foreground: '#fdaeb7'
			}
		},
		{
			scope: 'carriage-return',
			settings: {
				background: '#ff7cc6',
				fontStyle: 'italic underline',
				foreground: '#24292e'
			}
		},
		{
			scope: 'message.error',
			settings: {
				foreground: '#fdaeb7'
			}
		},
		{
			scope: 'string variable',
			settings: {
				foreground: '#71d58a'
			}
		},
		{
			scope: ['source.regexp', 'string.regexp'],
			settings: {
				foreground: '#4dacfa'
			}
		},
		{
			scope: [
				'string.regexp.character-class',
				'string.regexp constant.character.escape',
				'string.regexp source.ruby.embedded',
				'string.regexp string.regexp.arbitrary-repitition'
			],
			settings: {
				foreground: '#4dacfa'
			}
		},
		{
			scope: 'string.regexp constant.character.escape',
			settings: {
				fontStyle: 'bold',
				foreground: '#85e89d'
			}
		},
		{
			scope: 'support.constant',
			settings: {
				foreground: '#71d58a'
			}
		},
		{
			scope: 'support.variable',
			settings: {
				foreground: '#71d58a'
			}
		},
		{
			scope: 'meta.module-reference',
			settings: {
				foreground: '#71d58a'
			}
		},
		{
			scope: 'punctuation.definition.list.begin.markdown',
			settings: {
				foreground: '#ff7cc6'
			}
		},
		{
			scope: ['markup.heading', 'markup.heading entity.name'],
			settings: {
				fontStyle: 'bold',
				foreground: '#e8e8e8'
			}
		},
		{
			scope: 'markup.quote',
			settings: {
				foreground: '#7d828b'
			}
		},
		{
			scope: 'markup.italic',
			settings: {
				fontStyle: 'italic',
				foreground: '#ff7cc6'
			}
		},
		{
			scope: 'markup.bold',
			settings: {
				foreground: '#b581fd'
			}
		},
		{
			scope: ['markup.underline'],
			settings: {
				foreground: '#71d58a',
				fontStyle: 'underline'
			}
		},
		{
			scope: ['markup.strikethrough'],
			settings: {
				foreground: '#ff5261',
				fontStyle: 'strikethrough'
			}
		},
		{
			scope: 'markup.inline.raw',
			settings: {
				foreground: '#4dacfa'
			}
		},
		{
			scope: ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted'],
			settings: {
				background: '#86181d',
				foreground: '#fdaeb7'
			}
		},
		{
			scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
			settings: {
				background: '#144620',
				foreground: '#85e89d'
			}
		},
		{
			scope: ['markup.changed', 'punctuation.definition.changed'],
			settings: {
				background: '#c24e00',
				foreground: '#b581fd'
			}
		},
		{
			scope: ['markup.ignored', 'markup.untracked'],
			settings: {
				background: '#71d58a',
				foreground: '#2f363d'
			}
		},
		{
			scope: 'meta.diff.range',
			settings: {
				fontStyle: 'bold',
				foreground: '#b392f0'
			}
		},
		{
			scope: 'meta.diff.header',
			settings: {
				foreground: '#71d58a'
			}
		},
		{
			scope: 'meta.separator',
			settings: {
				fontStyle: 'bold',
				foreground: '#71d58a'
			}
		},
		{
			scope: 'meta.output',
			settings: {
				foreground: '#71d58a'
			}
		},
		{
			scope: [
				'brackethighlighter.tag',
				'brackethighlighter.curly',
				'brackethighlighter.round',
				'brackethighlighter.square',
				'brackethighlighter.angle',
				'brackethighlighter.quote'
			],
			settings: {
				foreground: '#d1d5da'
			}
		},
		{
			scope: 'brackethighlighter.unmatched',
			settings: {
				foreground: '#fdaeb7'
			}
		},
		{
			scope: ['constant.other.reference.link', 'string.other.link'],
			settings: {
				fontStyle: 'underline',
				foreground: '#4dacfa'
			}
		},
		{
			scope: ['punctuation.definition.markdown', 'fenced_code.block.language'],
			settings: {
				foreground: '#ff7cc6'
			}
		}
	],
	type: 'light'
} satisfies ThemeInput;

export default theme;
