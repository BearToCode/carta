<script lang="ts">
	import type { PageData } from './$types';
	import '$lib/styles/markdown.scss';
	import { onMount, type SvelteComponent } from 'svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	let mounted = false;
	let clientSideComponent: typeof SvelteComponent | null = null;
	async function renderClientSideComponent() {
		// Load a reactive version of the page to keep reactivity
		const pages = import.meta.glob('../../pages/**/*.svelte.md');
		const match = pages[`../../pages/${$page.url.pathname.slice(1)}.svelte.md`];
		clientSideComponent = ((await match()) as { default: typeof SvelteComponent }).default;
	}

	onMount(() => {
		mounted = true;
		renderClientSideComponent();
	});

	$: if (mounted) {
		$page.url;
		renderClientSideComponent();
	}
</script>

<svelte:head>
	<title>{data.metadata['title']} - Carta</title>
</svelte:head>

<h3 class="mb-2 font-semibold text-sky-300">{data.metadata['section']}</h3>

<h1 class="mb-4 text-5xl font-bold text-white">{data.metadata['title']}</h1>

<div class="markdown">
	{#if clientSideComponent}
		<svelte:component this={clientSideComponent} />
	{:else}
		{#key $page.url}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.content.html}
		{/key}
	{/if}
</div>
