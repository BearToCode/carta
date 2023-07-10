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
import type { SvelteComponentTyped } from 'svelte';

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
	 * History (Undo/Redo) options.
	 */
	historyOptions?: Partial<CartaHistoryOptions>;
	/**
	 * HTML sanitizer.
	 */
	sanitizer?: (html: string) => string;
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
	/**
	 * Textarea event listeners.
	 */
	listeners?: CartaListener[];
	/**
	 * Additional components, that will be put after the editor.
	 * All components are given a `carta: Carta` prop.
	 * The editor has a `relative` position, so you can position
	 * elements absolutely.
	 */
	components?: CartaExtensionComponentArray;
}

type CartaEventType = keyof HTMLElementEventMap | 'carta-render' | 'carta-render-ssr';

export type CartaListener<K = CartaEventType> = [
	type: K,
	listener: (
		this: HTMLTextAreaElement,
		ev: K extends keyof HTMLElementEventMap ? HTMLElementEventMap[K] : Event
	) => unknown,
	options?: boolean | AddEventListenerOptions
];

export interface CartaExtensionComponent<T extends object> {
	/**
	 * Svelte components that exports `carta: Carta` and all the other properties specified in `props`.
	 */
	component: typeof SvelteComponentTyped<T & { carta: Carta }>;
	/**
	 * Properties that will be handed to the component.
	 */
	props: T;
	/**
	 * Where this component will be placed.
	 */
	parent: 'editor' | 'input' | 'renderer';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CartaExtensionComponentArray = Array<CartaExtensionComponent<any>>;

export class Carta {
	public readonly keyboardShortcuts: KeyboardShortcut[];
	public readonly icons: CartaIcon[];
	public readonly prefixes: Prefix[];
	public readonly listeners: CartaListener[];
	public readonly components: CartaExtensionComponentArray;
	public input: CartaInput | undefined;

	public constructor(public readonly options?: CartaOptions) {
		this.keyboardShortcuts = [];
		this.icons = [];
		this.prefixes = [];
		this.listeners = [];
		this.components = [];

		for (const ext of options?.extensions ?? []) {
			this.keyboardShortcuts.push(...(ext.shortcuts ?? []));
			this.icons.push(...(ext.icons ?? []));
			this.prefixes.push(...(ext.prefixes ?? []));
			this.listeners.push(...(ext.listeners ?? []));
			this.components.push(...(ext.components ?? []));
		}

		// Load default keyboard shortcuts
		this.keyboardShortcuts.push(
			...defaultKeyboardShortcuts.filter(
				(shortcut) => !options?.disableShortcuts?.includes(shortcut.id)
			)
		);

		// Load default icons
		this.icons.push(...defaultIcons.filter((icon) => !options?.disableIcons?.includes(icon.id)));

		// Load default prefixes
		this.prefixes.push(
			...defaultPrefixes.filter((prefix) => !options?.disablePrefixes?.includes(prefix.id))
		);

		// Load marked extensions
		const markedExtensions = this.options?.extensions
			?.flatMap((ext) => ext.markedExtensions)
			.filter((ext) => ext != null) as marked.MarkedExtension[] | undefined;
		if (markedExtensions) marked.use(...markedExtensions);
	}

	/**
	 * Render markdown to html asynchronously.
	 * @param markdown Markdown input.
	 * @returns Rendered html.
	 */
	public async render(markdown: string): Promise<string> {
		const dirty = await marked.parse(markdown, { async: true });
		this.input?.textarea.dispatchEvent(new Event('carta-render'));
		return (this.options?.sanitizer && this.options?.sanitizer(dirty)) ?? dirty;
	}

	/**
	 * Render markdown, excluding syntax highlighting (SSR).
	 * @param markdown Markdown input.
	 * @returns Rendered html.
	 */
	public renderSSR(markdown: string): string {
		const dirty = marked.parse(markdown, { async: false });
		this.input?.textarea.dispatchEvent(new Event('carta-render-ssr'));
		if (this.options?.sanitizer) return this.options.sanitizer(dirty);
		return dirty;
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
			this.listeners,
			onUpdate,
			this.options?.historyOptions
		);
	}
}
