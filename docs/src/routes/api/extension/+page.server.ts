import { highlightCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	extension: {
		lang: 'ts',
		code: deindent`
      const plugin: Plugin = {
        // ...
      };

      const carta = new Carta({
        extensions: [plugin]
      });`
	},
	transformer: {
		lang: 'ts',
		code: deindent`
			const transformer: UnifiedTransformer = {
				execution: 'sync',
				type: 'rehype',
				transform({ processor }) {
					processor
						.use(rehypeSlug)
						.use(rehypeAutolinkHeadings);
				}
			}`
	},
	shortcut: {
		lang: 'ts',
		code: deindent`
			const shortcut: KeyboardShortcut = {
				id: 'bold',
				combination: new Set(['control', 'b']),
				action: (input) => input.toggleSelectionSurrounding('**')
			};`
	},
	icon: {
		lang: 'ts',
		code: deindent`
			const icon: Icon = {
				id: 'heading',
				action: (input) => input.toggleLinePrefix('###'),
				component: HeadingIcon
			};`
	},
	prefix: {
		lang: 'ts',
		code: deindent`
			const prefix: Prefix = {
				id: 'bulletedList',
				match: (line) => {
					const prefix = line.slice(0, 2);
					if (prefix === '- ') return prefix;
				},
				maker: () => '- '
			};`
	},
	prefixMaker: {
		lang: 'ts',
		code: deindent`
			const prefix: Prefix = {
				id: 'numberedList',
				match: (line) => line.match(/^d+./)?.at(0),
				maker: (prev) => \`\$\{Number(prev.slice(0, -1)) + 1\}. \`
			};`
	},
	tabOut: {
		lang: 'ts',
		code: deindent`
			const tabOut: TabOut = {
				id: 'strikethrough',
				delimiter: '~~'
			};`
	},
	listener: {
		lang: 'ts',
		code: deindent`
			const click: Listener = ['click', () => console.log('I was clicked!')];
			const render: Listener = [
				'carta-render',
				(e) => {
					const carta = e.detail.carta;
					// ...
				},
				{
					once: true
				}
			];`
	}
} as const;

export const load = async () => {
	return {
		codeBlocks: await highlightCodeBlocks(codeBlocks)
	};
};
