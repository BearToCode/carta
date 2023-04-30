import { marked } from 'marked';
import type { CartaHistoryOptions } from './history';
import { CartaInput, type KeyboardShortcut } from './input';
import { DefaultKeyboardShortcuts } from './shortcuts';

/**
 * Carta editor options.
 */
export interface CartaOptions {
	/**
	 * Editor/viewer extensions.
	 */
	extensions?: CartaExtension[];
	/**
	 * Renderer debouncing timeout, in ms.
	 * @defaults 300ms
	 */
	rendererDebounce?: number;
	/**
	 * Remove default shortcuts.
	 */
	disableDefaultShortcuts?: boolean;
	/**
	 * History options.
	 */
	historyOptions?: Partial<CartaHistoryOptions>;
}

/**
 * Carta editor extensions.
 */
export interface CartaExtension {
	/**
	 * Marked extensions, more on that [here](https://marked.js.org/using_advanced).
	 */
	markedExtensions?: marked.MarkedExtension[];
	/**
	 * Additional keyboard shortcuts.
	 */
	shortcuts?: KeyboardShortcut[];
}

export class Carta {
	private readonly keyboardShortcuts: KeyboardShortcut[];
	public input: CartaInput | undefined;

	public constructor(public readonly options?: CartaOptions) {
		this.keyboardShortcuts = [];

		// Load keyboard shortcuts
		const extensionKeyboardShortcuts =
			(this.options?.extensions
				?.flatMap((ext) => ext.shortcuts)
				.filter((shortcut) => shortcut != null) as KeyboardShortcut[] | undefined) ?? [];

		if (extensionKeyboardShortcuts)
			this.keyboardShortcuts = this.keyboardShortcuts.concat(extensionKeyboardShortcuts);

		// Load default keyboard shortcuts
		if (!options?.disableDefaultShortcuts)
			this.keyboardShortcuts = this.keyboardShortcuts.concat(DefaultKeyboardShortcuts);

		const markedExtensions = this.options?.extensions
			?.flatMap((ext) => ext.markedExtensions)
			.filter((ext) => ext != null) as marked.MarkedExtension[] | undefined;
		// Load marked extensions
		if (markedExtensions) marked.use(...markedExtensions);
	}

	/**
	 * Render markdown to html.
	 * @param markdown Markdown input.
	 * @returns Rendered html.
	 */
	public render(markdown: string): string {
		return marked.parse(markdown);
	}

	/**
	 * Get all the registered keyboard shortcuts.
	 * @returns Registered keyboard shortcuts.
	 */
	public getKeyboardShortcuts() {
		return this.keyboardShortcuts;
	}

	/**
	 * Set the input element.
	 * @param textarea The input textarea element.
	 * @param onUpdate Update callback.
	 */
	public setInput(textarea: HTMLTextAreaElement, onUpdate: () => void) {
		this.input = new CartaInput(
			textarea,
			this.getKeyboardShortcuts(),
			onUpdate,
			this.options?.historyOptions
		);
	}
}