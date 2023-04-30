import { marked } from 'marked';
import type { CartaHistoryOptions } from './history';
import { CartaInput } from './input';
import {
	defaultKeyboardShortcuts,
	type DefaultShortcutId,
	type KeyboardShortcut
} from './shortcuts';
import { defaultIcons, type CartaIcon, type DefaultIconId } from './icons';
import { defaultPrefixes, type DefaultPrefixId, type Prefix } from './prefixes';

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
	 * Remove default shortcuts by ids.
	 */
	disableShortcuts?: DefaultShortcutId[];
	/**
	 * Remove default icons by ids.
	 */
	disableIcons?: DefaultIconId[];
	/**
	 * Remove default prefixes by ids.
	 */
	disablePrefixes?: DefaultPrefixId[];
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
	/**
	 * Additional icons.
	 */
	icons?: CartaIcon[];
	/**
	 * Additional prefixes.
	 */
	prefixes?: Prefix[];
}

export class Carta {
	public readonly keyboardShortcuts: KeyboardShortcut[];
	public readonly icons: CartaIcon[];
	public readonly prefixes: Prefix[];
	public input: CartaInput | undefined;

	public constructor(public readonly options?: CartaOptions) {
		this.keyboardShortcuts = [];
		this.icons = [];
		this.prefixes = [];

		for (const ext of options?.extensions ?? []) {
			this.keyboardShortcuts = this.keyboardShortcuts.concat(
				this.keyboardShortcuts,
				ext.shortcuts ?? []
			);
			this.icons = this.icons.concat(this.icons, ext.icons ?? []);
			this.prefixes = this.prefixes.concat(this.prefixes, ext.prefixes ?? []);
		}

		// Load default keyboard shortcuts
		this.keyboardShortcuts = this.keyboardShortcuts.concat(
			defaultKeyboardShortcuts.filter(
				(shortcut) => !options?.disableShortcuts?.includes(shortcut.id)
			)
		);

		// Load default icons
		this.icons = this.icons.concat(
			defaultIcons.filter((icon) => !options?.disableIcons?.includes(icon.id))
		);

		// Load default prefixes
		this.prefixes = this.prefixes.concat(
			defaultPrefixes.filter((prefix) => !options?.disablePrefixes?.includes(prefix.id))
		);

		// Load marked extensions
		const markedExtensions = this.options?.extensions
			?.flatMap((ext) => ext.markedExtensions)
			.filter((ext) => ext != null) as marked.MarkedExtension[] | undefined;
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
	 * Set the input element.
	 * @param textarea The input textarea element.
	 * @param onUpdate Update callback.
	 */
	public setInput(textarea: HTMLTextAreaElement, onUpdate: () => void) {
		this.input = new CartaInput(
			textarea,
			this.keyboardShortcuts,
			this.prefixes,
			onUpdate,
			this.options?.historyOptions
		);
	}
}
