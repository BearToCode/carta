import type { Plugin, ExtensionComponent, GrammarRule, HighlightingRule } from 'carta-md';
import { fade, scale, type TransitionConfig } from 'svelte/transition';
import remarkEmoji from 'remark-emoji';
import Emoji from './Emoji.svelte';
import BezierEasing from 'bezier-easing';
export * from './default.css?inline';

export interface EmojiExtensionOptions {
	/**
	 * Custom in transition. See https://svelte.dev/docs#run-time-svelte-transition.
	 */
	inTransition?: (node: Element) => TransitionConfig;
	/**
	 * Custom out transition. See https://svelte.dev/docs#run-time-svelte-transition.
	 */
	outTransition?: (node: Element) => TransitionConfig;
	/**
	 * Approximate count of emoji icons per row. Can vary because emojis contain a variable count of unicode characters. Used to determine the number of emoji icons to skip forward or backward when arrow keys are pressed (ie: down and up, respectively).
	 */
	cols?: number;
	/**
	 * Maximum count of rows of emoji icons to display.
	 */
	maxRows?: number;
	/**
	 * Options for the 'remark-emoji' plugin.
	 */
	accessible?: boolean;
	padSpaceAfter?: boolean;
	emoticon?: boolean;
}

interface ComponentProps {
	inTransition: (node: Element) => TransitionConfig;
	outTransition: (node: Element) => TransitionConfig;
	cols: number;
	maxRows: number;
}

/**
 * Carta emoji plugin. Adds support to render emojis as well as an emojis snippet.
 */
export const emoji = (options?: EmojiExtensionOptions): Plugin => {
	const inTransition =
		options?.inTransition ??
		((node: Element) =>
			scale(node, {
				duration: 150,
				easing: BezierEasing(0.05, 0.68, 0.2, 1.15)
			}));
	const outTransition =
		options?.inTransition ??
		((node: Element) =>
			fade(node, {
				duration: 100
			}));
	const cols =
		options?.cols ?? 10;
	const maxRows =
		options?.maxRows ?? 12;

	const emojiComponent: ExtensionComponent<ComponentProps> = {
		component: Emoji,
		parent: 'input',
		props: {
			inTransition,
			outTransition,
			cols,
			maxRows
		}
	};

	const grammar = {
		name: 'emoji',
		type: 'inline',
		definition: {
			match: ':(?:\\+1|[-\\w]+):',
			name: 'markup.emoji.markdown'
		}
	} satisfies GrammarRule;

	const highlighting = {
		light: {
			scope: 'markup.emoji',
			settings: {
				foreground: '#3bf'
			}
		},
		dark: {
			scope: 'markup.emoji',
			settings: {
				foreground: '#4dacfa'
			}
		}
	} satisfies HighlightingRule;

	return {
		transformers: [
			{
				execution: 'sync',
				type: 'remark',
				transform({ processor }) {
					processor.use(remarkEmoji, options);
				}
			}
		],
		components: [emojiComponent],
		grammarRules: [grammar],
		highlightingRules: [highlighting]
	};
};
