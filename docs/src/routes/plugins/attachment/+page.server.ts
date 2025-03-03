import { highlightCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	installation: {
		lang: 'bash',
		code: 'npm i @cartamd/plugin-attachment'
	},
	styles: {
		lang: 'js',
		code: "import '@cartamd/plugin-attachment/default.css';"
	},
	extension: {
		lang: 'svelte',
		code: deindent`
      <script>
				import { Carta, MarkdownEditor } from 'carta-md';
				import { attachment } from '@cartamd/plugin-attachment';

				const carta = new Carta({
					extensions: [
						attachment({
							upload(file) {
								/* ... */
							}
						})
					]
				});
			</script>

			<MarkdownEditor {carta} />`
	},
	options: {
		lang: 'ts',
		code: deindent`
      export interface AttachmentExtensionOptions {
				/**
				 * Upload a file to the server. Return the url of the uploaded file.
				 * If an error occurs, return null. This function does **not** handle errors.
				 * @param file The file to upload
				 * @returns The uploaded file url, or null if it failed
				 */
				upload: (file: File) => Promise<string | null>;
				/**
				 * Supported mime types.
				 *
				 * @default ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'].
				 */
				supportedMimeTypes?: string[];
				/**
				 * Whether to disable the attach icon.
				 *
				 * @default false
				 */
				disableIcon?: boolean;
				/**
				 * Custom drop overlay component. Use \`false\` to disable the overlay.
				 */
				dropOverlay?: false | typeof SvelteComponent;
				/**
				 * Custom loading overlay component. Use \`false\` to disable the overlay.
				 */
				loadingOverlay?: false | typeof SvelteComponent<{ uploadingFiles: Writable<File[]> }>;
			}`
	}
} as const;

export const load = async () => {
	return {
		codeBlocks: await highlightCodeBlocks(codeBlocks)
	};
};
