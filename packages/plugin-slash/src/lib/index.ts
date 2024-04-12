import { fade, scale, type TransitionConfig } from 'svelte/transition';
import SlashComponent from './Slash.svelte';
import type { Plugin, ExtensionComponent } from 'carta-md';
import BezierEasing from 'bezier-easing';
import { defaultSnippets, type DefaultSnippetId, type SlashSnippet } from './snippets';
export * from './default.css?inline';

export interface SlashExtensionOptions {
	/**
	 * List of default snippets to disable.
	 */
	disableDefaultSnippets?: DefaultSnippetId[] | true;
	/**
	 * Additional snippets.
	 */
	snippets?: SlashSnippet[];
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
export const slash = (options?: SlashExtensionOptions): Plugin => {
	const snippets: SlashSnippet[] = defaultSnippets.filter((snippet) =>
		options?.disableDefaultSnippets === true
			? false
			: !options?.disableDefaultSnippets?.includes(snippet.id)
	);
	snippets.push(...(options?.snippets ?? []));

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
	const slashComponent: ExtensionComponent<ComponentProps> = {
		component: SlashComponent,
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
