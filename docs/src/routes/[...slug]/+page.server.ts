import type { SvelteComponent } from 'svelte';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const pages = import.meta.glob('../../pages/**/*.svelte.md');
	const match = pages[`../../pages/${event.url.pathname.slice(1)}.svelte.md`];
	if (!match) throw error(404, 'Not found');

	const Markdown = (await match()) as {
		default: SvelteComponent;
		metadata: Record<string, unknown>;
	};
	const content = Markdown.default.render();
	const metadata = Markdown.metadata;

	return {
		content,
		metadata
	};
};
