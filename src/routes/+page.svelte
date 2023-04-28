<script lang="ts">
	import { CartaEditor } from '$lib';
	import { Carta } from '$lib/internal/carta';

	import '$lib/default-theme.css';
	import '$lib/light.css';

	const carta = new Carta();
</script>

<svelte:head>
	<!-- Custom font -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<CartaEditor {carta} />

<style>
	:root {
		font-family: 'Fira Code', monospace;
		font-variant-ligatures: normal;
	}
</style>
