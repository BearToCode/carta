<script lang="ts">
	import { onMount } from 'svelte';
	import type { Carta } from './';

	export let carta: Carta;
	export let value: string;
	export let theme = 'default';

	let elem: HTMLDivElement;
	let mounted = false;

	let rendered = carta.renderSSR(value);
	onMount(async () => {
		carta.$setRenderer(elem);
		// Add code syntax highlighting (if plugin is present) once loaded on the client.
		rendered = await carta.render(value);

		mounted = true;
	});
</script>

<div bind:this={elem} class="carta-viewer carta-theme__{theme} markdown-body">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html rendered}
	{#if mounted}
		{#each carta.components.filter(({ parent }) => [parent]
				.flat()
				.includes('preview')) as { component, props }}
			<svelte:component this={component} {carta} {...props} />
		{/each}
	{/if}
</div>
