<script lang="ts">
	import { component } from '$lib';
	import { Carta, MarkdownEditor } from 'carta-md';
	import { initializeComponents, svelte } from '$lib/svelte';
	import Heading from './Heading.svelte';
	import Img from './Img.svelte';
	import Anchor from './Anchor.svelte';
	import UnorderedList from './UnorderedList.svelte';

	import 'carta-md/default.css';

	const carta = new Carta({
		sanitizer: false,
		extensions: [
			component(
				[
					svelte('h1', Heading),
					svelte('img', Img),
					svelte('ul', UnorderedList),
					svelte('a', Anchor)
				],
				initializeComponents
			)
		]
	});

	let value = $state('');

	$inspect(value);
</script>

<svelte:head>
	<!-- Custom font -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<link rel="preconnect" href="https://rsms.me/" />
	<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<main>
	<MarkdownEditor bind:value {carta} />
	<!-- <Markdown {carta} value="# Heading" /> -->
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter var', sans-serif;
		min-height: 100vh;
	}

	:global(.carta-font-code, code) {
		font-family: 'Fira Code', monospace;
		font-variant-ligatures: normal;
		font-size: 16px;
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
