import type { Component } from 'svelte';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { base } from '$app/paths';
import { render } from 'svelte/server';


export const load: PageServerLoad = async (event) => {
	const pages = import.meta.glob('../../pages/**/*.svelte.md');
	const path = event.url.pathname.slice(base.length).slice(1);
	const match = pages[`../../pages/${path}.svelte.md`];
	if (!match) throw error(404, 'Not found');

	const Markdown = (await match()) as {
		default: Component;
		metadata: Record<string, unknown>;
	};
	const content =  render(Markdown.default);
	const metadata = Markdown.metadata;

	return {
		content,
		metadata
	};
};
