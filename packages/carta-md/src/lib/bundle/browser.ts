import { cartaEventsKeys, type Listener } from '$lib/core/carta';
import type {
	ShikiOptions,
	Theme,
	DualTheme,
	GrammarRule,
	HighlightingRule,
	Highlighter
} from '$lib/core/highlight';
import type { TextAreaHistoryOptions } from '$lib/core/history';
import { type DefaultIconId, type Icon, defaultIcons } from '$lib/core/icons';
import { InputEnhancer } from '$lib/core/input';
import { type DefaultPrefixId, type Prefix, defaultPrefixes } from '$lib/core/prefixes';
import { Renderer } from '$lib/core/renderer';
import {
	type DefaultShortcutId,
	type KeyboardShortcut,
	defaultKeyboardShortcuts
} from '$lib/core/shortcuts';
import { CartaBase, type BaseOptions } from './base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listeners = Listener<any>[];

/**
 * Carta editor options.
 */
export interface BrowserOptions extends BaseOptions {
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
	historyOptions?: TextAreaHistoryOptions;
	/**
	 * Highlighter options.
	 */
	shikiOptions?: ShikiOptions;
	/**
	 * ShikiJS theme
	 * @default 'carta-light' for light mode and 'carta-dark' for dark mode.
	 */
	theme?: Theme | DualTheme;
}

/**
 * Browser-side Carta class, for the client.
 */
export class CartaBrowser extends CartaBase {
	public override readonly bundle = () => 'browser';

	public readonly historyOptions?: TextAreaHistoryOptions;
	public readonly theme?: Theme | DualTheme;
	public readonly shikiOptions?: ShikiOptions;
	public readonly rendererDebounce: number;
	public readonly keyboardShortcuts: KeyboardShortcut[];
	public readonly icons: Icon[];
	public readonly prefixes: Prefix[];
	public readonly grammarRules: GrammarRule[];
	public readonly highlightingRules: HighlightingRule[];
	public readonly textareaListeners: Listeners;

	private mElement: HTMLDivElement | undefined;
	private mInput: InputEnhancer | undefined;
	private mRenderer: Renderer | undefined;
	private mHighlighter: Highlighter | undefined;
	private mBoundElements: {
		elem: HTMLElement;
		portal: HTMLElement;
		callback: (() => void) | undefined;
	}[] = [];
	private mHighlighterResolvers: ((value: Highlighter) => void)[] = [];

	public get element() {
		return this.mElement;
	}
	public get input() {
		return this.mInput;
	}
	public get renderer() {
		return this.mRenderer;
	}

	public constructor(options: BrowserOptions) {
		super(options);

		this.historyOptions = options?.historyOptions;
		this.theme = options?.theme;
		this.shikiOptions = options?.shikiOptions;
		this.rendererDebounce = options?.rendererDebounce ?? 300;

		// Load plugins
		this.keyboardShortcuts = [];
		this.icons = [];
		this.prefixes = [];
		this.textareaListeners = [];
		this.grammarRules = [];
		this.highlightingRules = [];

		const listeners = [];
		for (const ext of options?.extensions ?? []) {
			this.keyboardShortcuts.push(...(ext.shortcuts ?? []));
			this.icons.push(...(ext.icons ?? []));
			this.prefixes.push(...(ext.prefixes ?? []));
			this.grammarRules.push(...(ext.grammarRules ?? []));
			this.highlightingRules.push(...(ext.highlightingRules ?? []));

			listeners.push(...(ext.listeners ?? []));
		}

		this.textareaListeners = listeners.filter((it) => !cartaEventsKeys.includes(it[0]));

		// Load default keyboard shortcuts
		this.keyboardShortcuts.push(
			...defaultKeyboardShortcuts.filter((shortcut) =>
				options?.disableShortcuts === true
					? false
					: !options?.disableShortcuts?.includes(shortcut.id)
			)
		);

		// Load default icons
		this.icons.unshift(
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

		this.initExtensions();
	}

	/**
	 * **Internal**: set the editor element.
	 * @param element The editor element.
	 */
	public $setElement(element: HTMLDivElement) {
		this.mElement = element;
	}

	/**
	 * **Internal**: set the input element.
	 * @param textarea The input textarea element.
	 * @param callback Update callback.
	 */
	public $setInput(textarea: HTMLTextAreaElement, container: HTMLDivElement, callback: () => void) {
		// Remove old listeners if any
		const previousInput = this.input;

		this.mInput = new InputEnhancer(textarea, container, {
			shortcuts: this.keyboardShortcuts,
			prefixes: this.prefixes,
			listeners: this.textareaListeners,
			historyOpts: this.historyOptions
		});

		if (previousInput) {
			previousInput.events.removeEventListener('update', callback);
			this.mInput.history = previousInput.history;
		}

		this.mInput.events.addEventListener('update', callback);

		// Bind elements
		this.mBoundElements.forEach((it) => {
			it.callback = this.input?.$bindToCaret(it.elem, {
				portal: it.portal,
				editorElement: this.element
			}).destroy;
		});
	}

	/**
	 * **Internal**: set the renderer element.
	 * @param container Div container of the rendered element.
	 */
	public $setRenderer(container: HTMLDivElement) {
		this.mRenderer = new Renderer(container);
	}

	/**
	 * **Internal**: set the highlighter element.
	 * @param highlighter The highlighter instance.
	 */
	public $setHighlighter(highlighter: Highlighter) {
		this.mHighlighter = highlighter;
		this.mHighlighterResolvers.forEach((it) => it(highlighter));
		this.mHighlighterResolvers = [];
	}

	/**
	 * Bind an element to the caret position.
	 * @param element The element to bind.
	 * @param portal The portal element.
	 * @returns The unbind function.
	 *
	 * @example
	 * ```svelte
	 * <script>
	 * 	export let carta;
	 * </script>
	 *
	 * <div use:carta.bindToCaret>
	 *   <!-- Stuff here -->
	 * </div>
	 *
	 * ```
	 */
	public bindToCaret(element: HTMLElement, portal = document.querySelector('body') as HTMLElement) {
		let callback: (() => void) | undefined;

		if (this.input)
			callback = this.input.$bindToCaret(element, { portal, editorElement: this.element }).destroy;

		// Bind the element later, when the input is ready
		this.mBoundElements.push({ elem: element, portal, callback });

		return {
			destroy: () => {
				callback && callback();
				this.mBoundElements = this.mBoundElements.filter((it) => it.elem != element);
			}
		};
	}

	/**
	 * Get the highlighter instance.
	 * @returns The highlighter instance.
	 */
	public async highlighter(): Promise<Highlighter> {
		if (this.mHighlighter) return this.mHighlighter;

		return new Promise((resolve) => {
			this.mHighlighterResolvers.push(resolve);
		});
	}
}
