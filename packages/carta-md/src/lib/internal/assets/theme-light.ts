import { type ThemeInput } from 'shiki';

const theme = {
	displayName: 'Carta Light' as const,
	name: 'carta-light' as const,
	semanticHighlighting: true,
	fg: '#333333',
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
				foreground: '#000'
			}
		},
		{
			scope: ['constant', 'entity.name.constant'],
			settings: {
				foreground: '#3bf'
			}
		},
		{
			scope: ['entity', 'entity.name'],
			settings: {
				foreground: '#6f42c1'
			}
		},
		{
			scope: 'variable.parameter.function',
			settings: {
				foreground: '#24292e'
			}
		},
		{
			scope: 'entity.name.tag',
			settings: {
				foreground: '#22863a'
			}
		},
		{
			scope: ['keyword', 'punctuation.definition.template-expression'],
			settings: {
				foreground: '#e16'
			}
		},
		{
			scope: ['storage', 'storage.type'],
			settings: {
				foreground: '#e16'
			}
		},
		{
			scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'],
			settings: {
				foreground: '#24292e'
			}
		},
		{
			scope: [
				'string',
				'punctuation.definition.string',
				'string punctuation.section.embedded source'
			],
			settings: {
				foreground: '#7d8'
			}
		},
		{
			scope: 'support',
			settings: {
				foreground: '#3bf'
			}
		},
		{
			scope: 'meta.property-name',
			settings: {
				foreground: '#3bf'
			}
		},
		{
			scope: 'variable',
			settings: {
				foreground: '#f60'
			}
		},
		{
			scope: 'variable.other',
			settings: {
				foreground: '#24292e'
			}
		},
		{
			scope: 'invalid.broken',
			settings: {
				fontStyle: 'italic',
				foreground: '#b31d28'
			}
		},
		{
			scope: 'invalid.deprecated',
			settings: {
				fontStyle: 'italic',
				foreground: '#b31d28'
			}
		},
		{
			scope: 'invalid.illegal',
			settings: {
				fontStyle: 'italic',
				foreground: '#b31d28'
			}
		},
		{
			scope: 'invalid.unimplemented',
			settings: {
				fontStyle: 'italic',
				foreground: '#b31d28'
			}
		},
		{
			scope: 'carriage-return',
			settings: {
				background: '#e16',
				fontStyle: 'italic underline',
				foreground: '#fafbfc'
			}
		},
		{
			scope: 'message.error',
			settings: {
				foreground: '#b31d28'
			}
		},
		{
			scope: 'string variable',
			settings: {
				foreground: '#3bf'
			}
		},
		{
			scope: ['source.regexp', 'string.regexp'],
			settings: {
				foreground: '#7d8'
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
				foreground: '#7d8'
			}
		},
		{
			scope: 'string.regexp constant.character.escape',
			settings: {
				fontStyle: 'bold',
				foreground: '#22863a'
			}
		},
		{
			scope: 'support.constant',
			settings: {
				foreground: '#3bf'
			}
		},
		{
			scope: 'support.variable',
			settings: {
				foreground: '#3bf'
			}
		},
		{
			scope: 'meta.module-reference',
			settings: {
				foreground: '#3bf'
			}
		},
		{
			scope: 'punctuation.definition.list.begin.markdown',
			settings: {
				foreground: '#e16'
			}
		},
		{
			scope: ['markup.heading', 'markup.heading entity.name'],
			settings: {
				fontStyle: 'bold',
				foreground: '#212121'
			}
		},
		{
			scope: 'markup.quote',
			settings: {
				foreground: '#999'
			}
		},
		{
			scope: 'markup.italic',
			settings: {
				foreground: '#e16'
			}
		},
		{
			scope: 'markup.bold',
			settings: {
				foreground: '#f60'
			}
		},
		{
			scope: ['markup.underline'],
			settings: {
				foreground: '#84f',
				fontStyle: 'underline'
			}
		},
		{
			scope: ['markup.strikethrough'],
			settings: {
				foreground: '#f44',
				fontStyle: 'strikethrough'
			}
		},
		{
			scope: 'markup.inline.raw',
			settings: {
				foreground: '#5af'
			}
		},
		{
			scope: ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted'],
			settings: {
				background: '#ffeef0',
				foreground: '#b31d28'
			}
		},
		{
			scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
			settings: {
				background: '#f0fff4',
				foreground: '#22863a'
			}
		},
		{
			scope: ['markup.changed', 'punctuation.definition.changed'],
			settings: {
				background: '#ffebda',
				foreground: '#f60'
			}
		},
		{
			scope: ['markup.ignored', 'markup.untracked'],
			settings: {
				background: '#3bf',
				foreground: '#f6f8fa'
			}
		},
		{
			scope: 'meta.diff.range',
			settings: {
				fontStyle: 'bold',
				foreground: '#6f42c1'
			}
		},
		{
			scope: 'meta.diff.header',
			settings: {
				foreground: '#3bf'
			}
		},
		{
			scope: 'meta.separator',
			settings: {
				fontStyle: 'bold',
				foreground: '#3bf'
			}
		},
		{
			scope: 'meta.output',
			settings: {
				foreground: '#3bf'
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
				foreground: '#586069'
			}
		},
		{
			scope: 'brackethighlighter.unmatched',
			settings: {
				foreground: '#b31d28'
			}
		},
		{
			scope: ['constant.other.reference.link', 'string.other.link'],
			settings: {
				fontStyle: 'underline',
				foreground: '#5af'
			}
		},
		{
			scope: ['punctuation.definition.markdown', 'fenced_code.block.language'],
			settings: {
				foreground: '#e16'
			}
		}
	],
	type: 'light'
} satisfies ThemeInput;

export default theme;
