import { highlightCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	installation: {
		lang: 'bash',
		code: 'npm i @cartamd/plugin-emoji'
	},
	styles: {
		lang: 'js',
		code: "import '@cartamd/plugin-emoji/default.css';"
	},
	extension: {
		lang: 'svelte',
		code: deindent`
      <script>
        import { Carta, MarkdownEditor } from 'carta-md';
        import { emoji } from '@cartamd/plugin-emoji';

        const carta = new Carta({
          extensions: [emoji()]
        });
      </script>

      <MarkdownEditor {carta} />`
	},
	options: {
		lang: 'ts',
		code: deindent`
      export interface EmojiExtensionOptions {
        /**
         * Custom in transition. See https://svelte.dev/docs#run-time-svelte-transition.
         */
        inTransition?: (node: Element) => TransitionConfig;
        /**
         * Custom out transition. See https://svelte.dev/docs#run-time-svelte-transition.
         */
        outTransition?: (node: Element) => TransitionConfig;
      }`
	}
} as const;

export const load = async () => {
	return {
		codeBlocks: await highlightCodeBlocks(codeBlocks)
	};
};
