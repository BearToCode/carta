import type { SvelteComponent } from 'svelte';
import type { Processor } from 'unified';
import type { KeyboardShortcut } from './shortcuts';
import type { Icon } from './icons';
import type { Prefix } from './prefixes';
import type { GrammarRule, HighlightingRule } from './highlight';
import type { CartaBase } from '$lib/bundle/base';
import type { CartaBrowser } from '$lib/bundle/browser';
import type { CartaServer } from '$lib/bundle/server';
import { CustomEvent, type MaybeArray } from './utils';

export type Carta = CartaBase | CartaServer | CartaBrowser;

/**
 * Carta-specific event with extra payload.
 */
export type Event = CustomEvent<{ carta: Carta }>;
export const cartaEventsKeys = ['carta-render', 'carta-render-ssr'] as const;
type CartaEventType = (typeof cartaEventsKeys)[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listeners = Listener<any>[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtensionComponents = Array<ExtensionComponent<any>>;

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
	component: typeof SvelteComponent<T & { carta: Carta }>;
	/**
	 * Properties that will be handed to the component.
	 */
	props: T;
	/**
	 * Where this component will be placed.
	 */
	parent: MaybeArray<'editor' | 'input' | 'renderer' | 'preview'>;
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
