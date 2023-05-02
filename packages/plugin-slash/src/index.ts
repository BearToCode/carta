import SlashComponent from './Slash.svelte';
import type { CartaExtension, CartaExtensionComponent, CartaInput } from 'carta-md';

export interface SlashExtensionOptions {
	disableDefaultSnippets?: DefaultSnippetId[];
}

export interface SlashSnippet {
	id: string;
	title: string;
	description: string;
	action: (input: CartaInput) => void;
}

const defaultSnippet = [
	{
		id: 'bigHeading',
		title: 'Heading 1',
		description: 'Big section heading',
		action: () => void 1
	}
] as const satisfies readonly SlashSnippet[];

export type DefaultSnippetId = (typeof defaultSnippet)[number]['id'];

export const slash = (options?: SlashExtensionOptions): CartaExtension => {
	const snippets = defaultSnippet.filter(
		(snippet) => !options?.disableDefaultSnippets?.includes(snippet.id)
	);
	const slashComponent: CartaExtensionComponent<{ snippets: SlashSnippet[] }> = {
		// Type assertion is needed due to the fact that the Svelte version(3.39.0) is different
		// from the one of carta-md(3.54.0). That's because upgrading to newer versions cause
		// this issue: https://github.com/sveltejs/svelte/issues/6584
		component: SlashComponent as CartaExtensionComponent<{ snippets: SlashSnippet[] }>['component'],
		props: {
			snippets
		}
	};

	return {
		components: [slashComponent]
	};
};
