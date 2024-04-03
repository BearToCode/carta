import type { Plugin, ExtensionComponent } from 'carta-md';
import type { TokenizerAndRendererExtension } from 'marked';
import { fade, scale, type TransitionConfig } from 'svelte/transition';
import nodeEmoji from 'node-emoji';
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
}

interface ComponentProps {
	inTransition: (node: Element) => TransitionConfig;
	outTransition: (node: Element) => TransitionConfig;
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

	const emojiComponent: ExtensionComponent<ComponentProps> = {
		component: Emoji,
		parent: 'input',
		props: {
			inTransition,
			outTransition
		}
	};

	return {
		markedExtensions: [
			{
				extensions: [emojiTokenizerAndRenderer()]
			}
		],
		components: [emojiComponent],
		highlightRules: [
			{
				type: 'oper',
				match: /:[a-z0-9_]+:/g
			}
		]
	};
};

function emojiTokenizerAndRenderer(): TokenizerAndRendererExtension {
	return {
		name: 'emoji',
		level: 'inline',
		start: (src) => src.indexOf(':'),
		tokenizer: (src) => {
			const match = src.match(/^:.*?:/)?.at(0);
			if (!match) return undefined;
			const emoji = nodeEmoji.find(match)?.emoji;
			if (emoji) {
				return {
					type: 'emoji',
					raw: match,
					emoji
				};
			}
		},
		renderer: (token) => token.emoji
	};
}
