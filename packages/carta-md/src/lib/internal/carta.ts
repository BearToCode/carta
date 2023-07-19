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
import { highlightText, loadLanguage } from '@speed-highlight/core';
import { detectLanguage } from '@speed-highlight/core/detect';
import { CartaRenderer } from './renderer';

/**
 * Carta-specific event with extra payload.
 */
export type CartaEvent = CustomEvent<{ carta: Carta }>;
type CartaEventType = 'carta-render' | 'carta-render-ssr';

export type CartaListener<K extends CartaEventType | keyof HTMLElementEventMap> = [
	type: K,
	listener: (
		this: HTMLTextAreaElement,
		ev: K extends CartaEventType
			? CartaEvent
			: K extends keyof HTMLElementEventMap
			? HTMLElementEventMap[K]
			: Event
	) => unknown,
	options?: boolean | AddEventListenerOptions
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CartaListeners = CartaListener<any>[];

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
type CartaExtensionComponents = Array<CartaExtensionComponent<any>>;

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
	disableShortcuts?: DefaultShortcutId[] | true;
	/**
	 * Remove default icons by ids.
	 */
	disableIcons?: DefaultIconId[] | true;
	/**
	 * Remove default prefixes by ids.
	 */
	disablePrefixes?: DefaultPrefixId[] | true;
	/**
	 * History (Undo/Redo) options.
	 */
	historyOptions?: Partial<CartaHistoryOptions>;
	/**
	 * HTML sanitizer.
	 */
	sanitizer?: (html: string) => string;
}

type HighlightRule =
	| { type: string; match: RegExp }
	| { extand: string }
	| {
			match: RegExp;
			sub:
				| string
				| ((code: string) => { type: string; sub: Array<{ match: RegExp; sub: string }> });
	  };

export type HighlightLanguage = Array<HighlightRule>;

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
	listeners?: CartaListeners;
	/**
	 * Additional components, that will be put after the editor.
	 * All components are given a `carta: Carta` prop.
	 * The editor has a `relative` position, so you can position
	 * elements absolutely.
	 */
	components?: CartaExtensionComponents;
	/**
	 * Custom markdown highlight rules. See [Speed-Highlight Wiki](https://github.com/speed-highlight/core/wiki/Create-or-suggest-new-languages).
	 */
	highlightRules?: Array<HighlightRule>;
}

export class Carta {
	public readonly keyboardShortcuts: KeyboardShortcut[];
	public readonly icons: CartaIcon[];
	public readonly prefixes: Prefix[];
	public readonly highlightRules: HighlightRule[];
	public readonly listeners: CartaListeners;
	public readonly components: CartaExtensionComponents;

	private _input: CartaInput | undefined;
	private _renderer: CartaRenderer | undefined;
	public get input() {
		return this._input;
	}
	public get renderer() {
		return this._renderer;
	}

	public constructor(public readonly options?: CartaOptions) {
		this.keyboardShortcuts = [];
		this.icons = [];
		this.prefixes = [];
		this.listeners = [];
		this.components = [];
		this.highlightRules = [];

		for (const ext of options?.extensions ?? []) {
			this.keyboardShortcuts.push(...(ext.shortcuts ?? []));
			this.icons.push(...(ext.icons ?? []));
			this.prefixes.push(...(ext.prefixes ?? []));
			this.listeners.push(...(ext.listeners ?? []));
			this.components.push(...(ext.components ?? []));
			this.highlightRules.push(...(ext.highlightRules ?? []));
		}

		// Load default keyboard shortcuts
		this.keyboardShortcuts.push(
			...defaultKeyboardShortcuts.filter((shortcut) =>
				options?.disableShortcuts === true
					? false
					: !options?.disableShortcuts?.includes(shortcut.id)
			)
		);

		// Load default icons
		this.icons.push(
			...defaultIcons.filter((icon) =>
				options?.disableIcons === true ? false : !options?.disableIcons?.includes(icon.id)
			)
		);

		// Load default prefixes
		this.prefixes.push(
			...defaultPrefixes.filter((prefix) =>
				options?.disablePrefixes === true ? false : !options?.disablePrefixes?.includes(prefix.id)
			)
		);

		// Load marked extensions
		const markedExtensions = this.options?.extensions
			?.flatMap((ext) => ext.markedExtensions)
			.filter((ext) => ext != null) as marked.MarkedExtension[] | undefined;
		if (markedExtensions) marked.use(...markedExtensions);

		// Load highlight custom language
		import('./highlight.js')
			.then((module) => {
				// inject custom rules
				module.default.unshift(...this.highlightRules);
				return loadLanguage('cartamd', module);
			})
			// trigger re-render
			.then(() => this.input?.update());
	}

	/**
	 * Render markdown to html asynchronously.
	 * @param markdown Markdown input.
	 * @returns Rendered html.
	 */
	public async render(markdown: string): Promise<string> {
		const dirty = await marked.parse(markdown, { async: true });
		this._input?.textarea.dispatchEvent(
			new CustomEvent<{ carta: Carta }>('carta-render', { detail: { carta: this } })
		);
		return (this.options?.sanitizer && this.options?.sanitizer(dirty)) ?? dirty;
	}

	/**
	 * Render markdown, excluding syntax highlighting (SSR).
	 * @param markdown Markdown input.
	 * @returns Rendered html.
	 */
	public renderSSR(markdown: string): string {
		const dirty = marked.parse(markdown, { async: false });
		this._input?.textarea.dispatchEvent(
			new CustomEvent<{ carta: Carta }>('carta-render-ssr', { detail: { carta: this } })
		);
		if (this.options?.sanitizer) return this.options.sanitizer(dirty);
		return dirty;
	}

	/**
	 * **Internal**: set the input element.
	 * @param textarea The input textarea element.
	 * @param callback Update callback.
	 */
	public $setInput(textarea: HTMLTextAreaElement, container: HTMLDivElement, callback: () => void) {
		this._input = new CartaInput(textarea, container, {
			shortcuts: this.keyboardShortcuts,
			prefixes: this.prefixes,
			listeners: this.listeners,
			callback: callback,
			historyOpts: this.options?.historyOptions
		});
	}

	/**
	 * **Internal**: set the renderer element.
	 * @param container Div container of the rendered element.
	 */
	public $setRenderer(container: HTMLDivElement) {
		this._renderer = new CartaRenderer(container);
	}

	/**
	 * Highlight text using Speed-Highlight. May return null on error(usually if requested
	 * language is not supported).
	 * @param text Text to highlight.
	 * @param lang Language to use, for example "js" or "c"
	 * @param hideLineNumbers Whether to hide line numbering.
	 * @returns Highlighted html text.
	 */
	public static async highlight(
		text: string,
		lang: string,
		hideLineNumbers?: boolean
	): Promise<string | null> {
		try {
			return await highlightText(text, lang, true, { hideLineNumbers });
		} catch (_) {
			return null;
		}
	}

	/**
	 * Highlight text using Speed-Highlight with detected language.
	 * @param text Text to highlight.
	 * @param hideLineNumbers Whether to hide line numbering.
	 * @returns Highlighted html text.
	 */
	public static async highlightAutodetect(text: string, hideLineNumbers?: boolean) {
		const lang = detectLanguage(text);
		return await highlightText(text, lang, true, { hideLineNumbers });
	}

	/**
	 * Load a custom language for reference in highlight rules.
	 * @param id Id of the language.
	 * @param langModule A module that has the default export set to an array of HighlightRule.
	 * @example
	 * ```
	 * // language.ts
	 * import type { HighlightLanguage } from 'carta-md';
	 *
	 * export default [
	 *   {
	 * 		match: /helloworld/g,
	 *      type: 'kwd'
	 * 	 }
	 * ] satisfies HighlightLanguage;
	 * ```
	 * And in another file:
	 * ```
	 * import("./path/to/language.ts")
	 *   .then(module => Carta.loadCustomLanguage("lang-name", module));
	 * ```
	 */
	public static loadCustomLanguage(id: string, langModule: { default: HighlightLanguage }) {
		return loadLanguage(id, langModule);
	}
}
