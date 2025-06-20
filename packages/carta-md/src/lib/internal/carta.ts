import type { Component } from 'svelte';
import { unified, type Processor } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm, { type Options as GfmOptions } from 'remark-gfm';
import remarkRehype, { type Options as RehypeOptions } from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import type { TextAreaHistoryOptions } from './history';
import { InputEnhancer } from './input';
import {
	type DefaultShortcutId,
	type KeyboardShortcut,
	defaultKeyboardShortcuts
} from './shortcuts';
import { defaultIcons, type Icon, type DefaultIconId } from './icons';
import { defaultPrefixes, type DefaultPrefixId, type Prefix } from './prefixes';
import { Renderer } from './renderer';
import { CustomEvent, type MaybeArray } from './utils';
import type {
	Highlighter,
	GrammarRule,
	ShikiOptions,
	DualTheme,
	Theme,
	HighlightingRule
} from './highlight';
import { BROWSER } from 'esm-env';
import { defaultTabOuts, type DefaultTabOutId, type TabOut } from './tabouts';

/**
 * Carta-specific event with extra payload.
 */
export type Event = CustomEvent<{ carta: Carta }>;
const cartaEvents = ['carta-render', 'carta-render-ssr'] as const;
type CartaEventType = (typeof cartaEvents)[number];

/**
 * Custom listeners for the textarea element.
 */
export type Listener<K extends CartaEventType | keyof HTMLElementEventMap> = [
	type: K,
	listener: (
		this: HTMLTextAreaElement,
		ev: K extends CartaEventType
			? Event
			: K extends keyof HTMLElementEventMap
			  ? HTMLElementEventMap[K]
			  : Event
	) => unknown,
	options?: boolean | AddEventListenerOptions
];
/**
 * Custom Svelte component for extensions.
 */
export interface ExtensionComponent<T extends object | undefined> {
	/**
	 * Svelte components that exports `carta: Carta` and all the other properties specified in `props`.
	 */
	component: Component<T & { carta: Carta }>;
	/**
	 * Properties that will be handed to the component.
	 */
	props: T;
	/**
	 * Where this component will be placed.
	 */
	parent: MaybeArray<'editor' | 'input' | 'renderer' | 'preview'>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listeners = Listener<any>[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtensionComponents = Array<ExtensionComponent<any>>;

/**
 * Carta editor options.
 */
export interface Options {
	/**
	 * GitHub Flavored Markdown options.
	 */
	gfmOptions?: GfmOptions;
	/**
	 * Editor/viewer extensions.
	 */
	extensions?: Plugin[];
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
	 * Remove default tab-outs by ids.
	 */
	disableTabOuts?: DefaultTabOutId[] | true;
	/**
	 * History (Undo/Redo) options.
	 */
	historyOptions?: TextAreaHistoryOptions;
	/**
	 * HTML sanitizer.
	 */
	sanitizer: ((html: string) => string) | false;
	/**
	 * Highlighter options.
	 */
	shikiOptions?: ShikiOptions;
	/**
	 * ShikiJS theme
	 * @default 'carta-light' for light mode and 'carta-dark' for dark mode.
	 */
	theme?: Theme | DualTheme;
	/**
	 * Options that will be passed to rehype
	 */
	rehypeOptions?: RehypeOptions;
	/**
	 * Whether to avoid capturing tab events.
	 */
	disableTabCapture?: boolean;
}

/**
 * Unified transformers plugins.
 */
export type UnifiedTransformer<E extends 'sync' | 'async'> = {
	execution: 'sync' | 'async';
	type: 'remark' | 'rehype';
	transform: ({
		processor,
		carta
	}: {
		processor: Processor;
		carta: Carta;
	}) => E extends 'sync' ? void : Promise<void>;
};

/**
 * Carta editor extensions.
 */
export interface Plugin {
	/**
	 * Unified transformers plugins.
	 * @important If the plugin is async, it will not run in SSR rendering.
	 */
	transformers?: UnifiedTransformer<'sync' | 'async'>[];
	/**
	 * Additional keyboard shortcuts.
	 */
	shortcuts?: KeyboardShortcut[];
	/**
	 * Additional icons.
	 */
	icons?: Icon[];
	/**
	 * Additional prefixes.
	 */
	prefixes?: Prefix[];
	/**
	 * Additional tab-outs.
	 */
	tabOuts?: TabOut[];
	/**
	 * Textarea event listeners.
	 */
	listeners?: Listeners;
	/**
	 * Additional components, that will be put after the editor.
	 * All components are given a `carta: Carta` prop.
	 * The editor has a `relative` position, so you can position
	 * elements absolutely.
	 */
	components?: ExtensionComponents;
	/**
	 * Custom markdown grammar highlight rules for ShiKi.
	 */
	grammarRules?: GrammarRule[];
	/**
	 * Custom markdown highlighting rules for ShiKi.
	 */
	highlightingRules?: HighlightingRule[];
	/**
	 * Use this callback to execute code when one Carta instance loads the extension.
	 * @param data General Carta related data.
	 */
	onLoad?: (data: { carta: Carta }) => void;
}

const USE_HIGHLIGHTER =
	BROWSER ||
	// Replaced at build time to tree-shake shiki on the server, if specified
	typeof __ENABLE_CARTA_SSR_HIGHLIGHTER__ === 'undefined' ||
	__ENABLE_CARTA_SSR_HIGHLIGHTER__ === true;

export class Carta {
	public readonly sanitizer?: (html: string) => string;
	public readonly historyOptions?: TextAreaHistoryOptions;
	public readonly theme?: Theme | DualTheme;
	public readonly shikiOptions?: ShikiOptions;
	public readonly rehypeOptions: RehypeOptions;
	public readonly rendererDebounce: number;
	public readonly keyboardShortcuts: KeyboardShortcut[];
	public readonly icons: Icon[];
	public readonly prefixes: Prefix[];
	public readonly tabOuts: TabOut[];
	public readonly grammarRules: GrammarRule[];
	public readonly highlightingRules: HighlightingRule[];
	public readonly textareaListeners: Listeners;
	public readonly cartaListeners: Listeners;
	public readonly components: ExtensionComponents;
	public readonly dispatcher = new EventTarget();
	public readonly gfmOptions: GfmOptions | undefined;
	public readonly syncProcessor: Processor;
	public readonly asyncProcessor: Promise<Processor>;
	public readonly disableTabCapture: boolean;
	private mElement: HTMLDivElement | undefined;
	private mInput: InputEnhancer | undefined;
	private mRenderer: Renderer | undefined;
	private mHighlighter: Promise<Highlighter> | undefined;
	private mSyncTransformers: UnifiedTransformer<'sync'>[] = [];
	private mAsyncTransformers: UnifiedTransformer<'async'>[] = [];

	public get element() {
		return this.mElement;
	}
	public get input() {
		return this.mInput;
	}
	public get renderer() {
		return this.mRenderer;
	}

	public async highlighter(): Promise<Highlighter | undefined> {
		if (this.mHighlighter) return this.mHighlighter;
		if (!USE_HIGHLIGHTER) return;

		this.mHighlighter = (async () => {
			const hl = await import('./highlight');
			const { loadHighlighter, loadDefaultTheme } = hl;
			return loadHighlighter({
				theme: this.theme ?? (await loadDefaultTheme()),
				grammarRules: this.grammarRules,
				highlightingRules: this.highlightingRules,
				shiki: this.shikiOptions
			});
		})();

		return this.mHighlighter;
	}

	private elementsToBind: {
		elem: HTMLElement;
		portal: HTMLElement;
		callback: (() => void) | undefined;
	}[] = [];

	public constructor(options?: Options) {
		this.sanitizer = options?.sanitizer || undefined;
		this.historyOptions = options?.historyOptions;
		this.theme = options?.theme;
		this.shikiOptions = options?.shikiOptions;
		this.rendererDebounce = options?.rendererDebounce ?? 300;

		// Load plugins
		this.keyboardShortcuts = [];
		this.icons = [];
		this.prefixes = [];
		this.tabOuts = [];
		this.textareaListeners = [];
		this.cartaListeners = [];
		this.components = [];
		this.grammarRules = [];
		this.highlightingRules = [];
		this.rehypeOptions = options?.rehypeOptions ?? {};
		const listeners = [];
		for (const ext of options?.extensions ?? []) {
			this.keyboardShortcuts.push(...(ext.shortcuts ?? []));
			this.icons.push(...(ext.icons ?? []));
			this.prefixes.push(...(ext.prefixes ?? []));
			this.tabOuts.push(...(ext.tabOuts ?? []));
			this.components.push(...(ext.components ?? []));
			this.grammarRules.push(...(ext.grammarRules ?? []));
			this.highlightingRules.push(...(ext.highlightingRules ?? []));

			listeners.push(...(ext.listeners ?? []));
		}

		// Split different listeners
		this.textareaListeners = listeners.filter((it) => !cartaEvents.includes(it[0]));
		this.cartaListeners = listeners.filter((it) => cartaEvents.includes(it[0]));

		// Setup carta listeners
		this.cartaListeners.forEach((it) => {
			this.dispatcher.addEventListener(...it);
		});

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

		// Load default tab-outs
		this.tabOuts.push(
			...defaultTabOuts.filter((tabOut) =>
				options?.disableTabOuts === true ? false : !options?.disableTabOuts?.includes(tabOut.id)
			)
		);

		// Set disableTabCapture
		this.disableTabCapture = options?.disableTabCapture ?? false;

		// Load unified extensions
		this.mSyncTransformers = [];
		this.mAsyncTransformers = [];

		for (const ext of options?.extensions ?? []) {
			for (const transformer of ext.transformers ?? []) {
				if (transformer.execution === 'sync') {
					this.mSyncTransformers.push(transformer);
				} else {
					this.mAsyncTransformers.push(transformer);
				}
			}
		}

		this.gfmOptions = options?.gfmOptions;
		this.syncProcessor = this.setupSynchronousProcessor({
			gfmOptions: this.gfmOptions,
			rehypeOptions: this.rehypeOptions
		});
		this.asyncProcessor = this.setupAsynchronousProcessor({
			gfmOptions: this.gfmOptions,
			rehypeOptions: this.rehypeOptions
		});

		for (const ext of options?.extensions ?? []) {
			if (ext.onLoad) {
				ext.onLoad({
					carta: this
				});
			}
		}
	}

	private setupSynchronousProcessor({
		gfmOptions,
		rehypeOptions
	}: {
		gfmOptions?: GfmOptions;
		rehypeOptions?: RehypeOptions;
	}) {
		const syncProcessor = unified();

		const remarkPlugins = this.mSyncTransformers.filter((it) => it.type === 'remark');
		const rehypePlugins = this.mSyncTransformers.filter((it) => it.type === 'rehype');

		syncProcessor.use(remarkParse);
		syncProcessor.use(remarkGfm, gfmOptions);

		for (const plugin of remarkPlugins) {
			plugin.transform({ processor: syncProcessor, carta: this });
		}

		syncProcessor.use(remarkRehype, rehypeOptions);

		for (const plugin of rehypePlugins) {
			plugin.transform({ processor: syncProcessor, carta: this });
		}

		syncProcessor.use(rehypeStringify);

		return syncProcessor;
	}

	private async setupAsynchronousProcessor({
		gfmOptions,
		rehypeOptions
	}: {
		gfmOptions?: GfmOptions;
		rehypeOptions?: RehypeOptions;
	}) {
		const asyncProcessor = unified();

		const remarkPlugins = [...this.mSyncTransformers, ...this.mAsyncTransformers].filter(
			(it) => it.type === 'remark'
		);
		const rehypePlugins = [...this.mSyncTransformers, ...this.mAsyncTransformers].filter(
			(it) => it.type === 'rehype'
		);

		asyncProcessor.use(remarkParse);
		asyncProcessor.use(remarkGfm, gfmOptions);

		for (const plugin of remarkPlugins) {
			await plugin.transform({ processor: asyncProcessor, carta: this });
		}

		asyncProcessor.use(remarkRehype, rehypeOptions);

		for (const plugin of rehypePlugins) {
			await plugin.transform({ processor: asyncProcessor, carta: this });
		}

		asyncProcessor.use(rehypeStringify);

		return asyncProcessor;
	}

	/**
	 * Render markdown to html asynchronously.
	 * @param markdown Markdown input.
	 * @returns Rendered html.
	 */
	public async render(markdown: string): Promise<string> {
		if (USE_HIGHLIGHTER) {
			const hl = await import('./highlight');
			const { loadNestedLanguages } = hl;

			const highlighter = (await this.highlighter()) as Highlighter;
			await loadNestedLanguages(highlighter, markdown);
		}

		const processor = await this.asyncProcessor;
		const result = await processor.process(markdown);
		if (!result) return '';
		const dirty = String(result);
		this.dispatcher.dispatchEvent(
			new CustomEvent<{ carta: Carta }>('carta-render', { detail: { carta: this } })
		);
		return (this.sanitizer && this.sanitizer(dirty)) ?? dirty;
	}

	/**
	 * Render markdown, excluding syntax highlighting (SSR).
	 * @param markdown Markdown input.
	 * @returns Rendered html.
	 */
	public renderSSR(markdown: string): string {
		const dirty = String(this.syncProcessor.processSync(markdown));
		if (typeof dirty != 'string') return '';
		this.dispatcher.dispatchEvent(
			new CustomEvent<{ carta: Carta }>('carta-render-ssr', { detail: { carta: this } })
		);
		if (this.sanitizer) return this.sanitizer(dirty);
		return dirty;
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
			tabOuts: this.tabOuts,
			listeners: this.textareaListeners,
			historyOpts: this.historyOptions,
			disableTabCapture: this.disableTabCapture
		});

		if (previousInput) {
			previousInput.events.removeEventListener('update', callback);
			this.mInput.history = previousInput.history;
		}

		this.mInput.events.addEventListener('update', callback);

		// Bind elements
		this.elementsToBind.forEach((it) => {
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
	 * Bind an element to the caret position.
	 * @param element The element to bind.
	 * @param portal The portal element.
	 * @returns The unbind function.
	 *
	 * @example
	 * ```svelte
	 * <script>
	 *   export let carta;
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
		this.elementsToBind.push({ elem: element, portal, callback });

		return {
			destroy: () => {
				callback && callback();
				this.elementsToBind = this.elementsToBind.filter((it) => it.elem != element);
			}
		};
	}
}
