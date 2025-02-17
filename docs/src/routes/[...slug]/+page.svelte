<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { PageData } from './$types';
	import { onMount, type SvelteComponent } from 'svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	import '$lib/styles/markdown.scss';
	import '$lib/styles/coldark.scss';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let mounted = $state(false);
	let clientSideComponent: typeof SvelteComponent | null = $state(null);
	async function renderClientSideComponent() {
		// Load a reactive version of the page to keep reactivity
		const pages = import.meta.glob('../../pages/**/*.svelte.md');
		const path = $page.url.pathname.slice(base.length).slice(1);
		const match = pages[`../../pages/${path}.svelte.md`];
		clientSideComponent = ((await match()) as { default: typeof SvelteComponent }).default;
	}

	onMount(() => {
		mounted = true;
		renderClientSideComponent();
	});

	run(() => {
		if (mounted) {
			$page.url;
			clientSideComponent = null;
			renderClientSideComponent();
		}
	});
</script>

<svelte:head>
	<title>{data.metadata['title']} - Carta</title>
</svelte:head>

<h3 class="mb-2 font-semibold text-sky-300">{data.metadata['section']}</h3>

<h1 class="mb-4 text-5xl font-bold text-white">{data.metadata['title']}</h1>

<div class="markdown">
	{#if clientSideComponent}
		{@const SvelteComponent_1 = clientSideComponent}
		<SvelteComponent_1 />
	{:else}
		{#key $page.url}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.content.html}
		{/key}
	{/if}
</div>
