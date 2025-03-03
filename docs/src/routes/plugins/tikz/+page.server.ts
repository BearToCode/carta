import { highlightCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	installation: {
		lang: 'bash',
		code: 'npm i @cartamd/plugin-tikz'
	},
	extension: {
		lang: 'svelte',
		code: deindent`
      <script>
				import { Carta, MarkdownEditor } from 'carta-md';
				import { tikz } from '@cartamd/plugin-tikz';
				import '@cartamd/plugin-tikz/fonts.css';

				const carta = new Carta({
					extensions: [tikz()]
				});
			</script>

			<MarkdownEditor {carta} />`
	},
	options: {
		lang: 'ts',
		code: deindent`
      interface TikzExtensionOptions {
				/**
				 * Enables Tikzjax console output.
				 */
				debug?: boolean;
				/**
				 * Class for generated svg div container.
				 */
				class?: string;
				/**
				 * Whether to center the generated expression.
				 * @default true
				 */
				center?: boolean;
				/**
				 * Post processing function for html.
				 * This also runs on stored html.
				 */
				postProcessing?: (html: string) => string;
			}`
	}
} as const;

export const load = async () => {
	return {
		codeBlocks: await highlightCodeBlocks(codeBlocks)
	};
};
