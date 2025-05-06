import { highlightCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	installation: {
		lang: 'bash',
		code: 'npm i @cartamd/plugin-slash'
	},
	styles: {
		lang: 'js',
		code: "import '@cartamd/plugin-slash/default.css';"
	},
	extension: {
		lang: 'svelte',
		code: deindent`
      <script>
				import { Carta, MarkdownEditor } from 'carta-md';
				import { slash } from '@cartamd/plugin-slash';

				const carta = new Carta({
					extensions: [slash()]
				});
			</script>

			<MarkdownEditor {carta} />`
	},
	options: {
		lang: 'ts',
		code: deindent`
      export interface SlashExtensionOptions {
				/**
				 * List of default snippets to disable.
				 */
				disableDefaultSnippets?: DefaultSnippetId[] | true;
				/**
				 * Additional snippets.
				 */
				snippets?: SlashSnippet[];
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
