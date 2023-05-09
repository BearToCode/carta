<script lang="ts">
	import { onMount } from 'svelte';
	import type { Carta } from './';

	export let carta: Carta;
	export let value: string;
	export let theme = 'default';

	let rendered = carta.renderSSR(value);

	onMount(async () => {
		// Add code syntax highlighting (if plugin is present) once loaded on the client.
		rendered = await carta.render(value);
	});
</script>

<div class="carta-viewer__{theme} markdown-body">
	{@html rendered}
</div>
