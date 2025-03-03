import { highlightCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	installation: {
		lang: 'bash',
		code: 'npm i @cartamd/plugin-anchor'
	},
	styles: {
		lang: 'js',
		code: "import '@cartamd/plugin-anchor/default.css';';"
	},
	extension: {
		lang: 'svelte',
		code: deindent`
      <script>
				import { Carta, MarkdownEditor } from 'carta-md';
				import { anchor } from '@cartamd/plugin-anchor';

				const carta = new Carta({
					extensions: [anchor()]
				});
			</script>

			<MarkdownEditor {carta} />`
	},
	options: {
		lang: 'ts',
		code: deindent`
      export interface AnchorExtensionOptions {
				/**
				 * rehype-slug options.
				 */
				slug?: SlugOptions;
				/**
				 * rehype-autolink-headings options.
				 */
				autolink?: AutolinkOptions;
			}`
	}
} as const;

export const load = async () => {
	return {
		codeBlocks: await highlightCodeBlocks(codeBlocks)
	};
};
