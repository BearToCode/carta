<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	import { math } from '@cartamd/plugin-math';
	import { slash } from '@cartamd/plugin-slash';
	import { emoji } from '@cartamd/plugin-emoji';
	import { code } from '@cartamd/plugin-code';

	import 'carta-md/default-theme.css';
	import 'carta-md/light.css';

	import '@cartamd/plugin-code/default.css';
	import 'katex/dist/katex.css';

	import '@cartamd/plugin-slash/default-theme.css';
	import '@cartamd/plugin-emoji/default-theme.css';

	const carta = new Carta({
		extensions: [math(), slash(), emoji(), code()]
	});
</script>

<svelte:head>
	<!-- Custom fonts -->
	<!-- Fira font -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<!-- Inter -->
	<link rel="preconnect" href="https://rsms.me/" />
	<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<main>
	<CartaEditor {carta} />
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter var', sans-serif;
		min-height: 100vh;
	}

	:global(.carta-font-code) {
		font-family: 'Fira Code', monospace;
		font-variant-ligatures: normal;
	}

	:global(input, textarea, button) {
		font-family: inherit;
	}

	main {
		max-width: 1536px;
		margin: 0 auto 0 auto;
		padding: 2rem 0 2rem 0;
	}

	/* Responsive main */

	@media screen and (max-width: 640px) {
		main {
			width: 95%;
		}
	}

	@media screen and (min-width: 640px) and (max-width: 767px) {
		main {
			width: 640px;
		}
	}

	@media screen and (min-width: 767px) and (max-width: 1023px) {
		main {
			width: 768px;
		}
	}

	@media screen and (min-width: 1023px) and (max-width: 1279px) {
		main {
			width: 1024px;
		}
	}

	@media screen and (min-width: 1279px) and (max-width: 1535px) {
		main {
			width: 1280px;
		}
	}
</style>
