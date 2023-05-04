import { fade, scale, type TransitionConfig } from 'svelte/transition';
import SlashComponent from './Slash.svelte';
import type { CartaExtension, CartaExtensionComponent } from 'carta-md';
import BezierEasing from 'bezier-easing';
import { defaultSnippets, type DefaultSnippetId, type SlashSnippet } from './snippets';

export interface SlashExtensionOptions {
	/**
	 * List of default snippets to disable.
	 */
	disableDefaultSnippets?: DefaultSnippetId[];
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
	snippets: SlashSnippet[];
	inTransition: (node: Element) => TransitionConfig;
	outTransition: (node: Element) => TransitionConfig;
}

/**
 * Carta slash extension.
 * @param options Extension options.
 * @returns The slash extension.
 */
export const slash = (options?: SlashExtensionOptions): CartaExtension => {
	const snippets = defaultSnippets.filter(
		(snippet) => !options?.disableDefaultSnippets?.includes(snippet.id)
	);
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
	const slashComponent: CartaExtensionComponent<ComponentProps> = {
		// Type assertion is needed due to the fact that the Svelte version(3.39.0) is different
		// from the one of carta-md(3.54.0). That's because upgrading to newer versions cause
		// this issue: https://github.com/sveltejs/svelte/issues/6584
		component: SlashComponent as CartaExtensionComponent<ComponentProps>['component'],
		props: {
			snippets,
			inTransition,
			outTransition
		},
		parent: 'input'
	};

	return {
		components: [slashComponent]
	};
};
