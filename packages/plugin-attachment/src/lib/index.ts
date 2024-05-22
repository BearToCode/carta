import type { Carta, Plugin, Listener } from 'carta-md';
import { get, writable, type Writable } from 'svelte/store';
import type { SvelteComponent } from 'svelte';
import DropOverlay from './DropOverlay.svelte';
import AttachIcon from './icons/AttachIcon.svelte';
import LoadingOverlay from './LoadingOverlay.svelte';

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
	 * Custom drop overlay component. Use `false` to disable the overlay.
	 */
	dropOverlay?: false | typeof SvelteComponent;
	/**
	 * Custom loading overlay component. Use `false` to disable the overlay.
	 */
	loadingOverlay?: false | typeof SvelteComponent<{ uploadingFiles: Writable<File[]> }>;
}

const ImageMimeTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'];

/**
 * Carta attachment plugin.
 */
export const attachment = (options: AttachmentExtensionOptions): Plugin => {
	let carta: Carta | undefined;
	const allowedMimeTypes = options.supportedMimeTypes || ImageMimeTypes;

	const draggingOverTextArea = writable(false);
	const draggingOverOverlay = writable(false);
	const uploadingFiles = writable<File[]>([]);

	const draggingOver = writable(false);
	draggingOverTextArea.subscribe((v) => draggingOver.set(v || get(draggingOverOverlay)));
	draggingOverOverlay.subscribe((v) => draggingOver.set(v || get(draggingOverTextArea)));

	draggingOver.subscribe((v) => {
		if (!carta) return;
		// Add custom class to editor
		if (!carta.element) return;

		if (v) carta.element.classList.add('dragging-attachment');
		else carta.element.classList.remove('dragging-attachment');
	});

	async function handleFile(file: File) {
		if (!allowedMimeTypes.includes(file.type)) return;
		if (!carta?.input) return;
		const textarea = carta.input.textarea;

		const loadingStr = `[Uploading ${file.name}](loading)`;
		carta.input.insertAt(carta.input.textarea.selectionStart, loadingStr);
		carta.input.update();

		uploadingFiles.update((files) => [...files, file]);
		const path = await options.upload(file);
		uploadingFiles.update((files) => files.filter((f) => f !== file));

		// Remove loading string
		const value = carta.input.textarea.value;
		const loadingStrIndex = value.indexOf(loadingStr);
		if (loadingStrIndex !== -1) carta.input.removeAt(loadingStrIndex, loadingStr.length);
		carta.input.update();

		if (!path) return;

		const str = ImageMimeTypes.includes(file.type)
			? `![${file.name}](${path})`
			: `[${file.name}](${path})`;

		carta.input.insertAt(loadingStrIndex, str);
		carta.input.update();
		carta.input.history.saveState(textarea.value, textarea.selectionStart);
	}

	function handleDrop(this: HTMLTextAreaElement, e: DragEvent) {
		e.preventDefault();
		draggingOverOverlay.set(false);
		draggingOverTextArea.set(false);

		const files = e.dataTransfer?.files;
		if (!files) return;

		for (const file of files) handleFile(file);
	}

	function handlePaste(this: HTMLTextAreaElement, e: ClipboardEvent) {
		const items = e.clipboardData?.items;
		if (!items) return;

		const itemsArray = Array.from(items);
		for (const item of itemsArray) {
			if (item.kind === 'file') {
				const file = item.getAsFile();
				if (!file) continue;
				e.preventDefault();
				handleFile(file);
			}
		}
	}

	return {
		onLoad: ({ carta: c }) => {
			carta = c;
		},
		listeners: [
			['drop', handleDrop, false] satisfies Listener<'drop'>,
			['dragenter', () => draggingOverTextArea.set(true)] satisfies Listener<'dragenter'>,
			['dragleave', () => draggingOverTextArea.set(false)] satisfies Listener<'dragleave'>,
			['dragover', (e) => e.preventDefault()] satisfies Listener<'dragover'>,
			['paste', handlePaste, false] satisfies Listener<'paste'>
		],
		components: [
			{
				component: DropOverlay,
				props: {
					draggingOverTextArea,
					draggingOverOverlay,
					handleDrop,
					dropOverlay: options.dropOverlay
				},
				parent: 'input'
			},
			{
				component: LoadingOverlay,
				props: {
					uploadingFiles,
					loadingOverlay: options.loadingOverlay
				},
				parent: 'input'
			}
		],
		icons: options.disableIcon
			? []
			: [
					{
						component: AttachIcon,
						action() {
							// Tricky way to open file selection dialog
							const input = document.createElement('input');
							input.type = 'file';
							input.multiple = true;
							input.accept = allowedMimeTypes.join(', ');

							input.onchange = (e) => {
								const files = (e.target as HTMLInputElement)?.files;
								if (!files) return;
								for (const file of files) handleFile(file);
							};

							input.click();
						},
						id: 'attach',
						label: 'Attach file'
					}
			  ]
	};
};
