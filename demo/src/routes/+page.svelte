<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	import { math } from '@cartamd/plugin-math';
	import { slash } from '@cartamd/plugin-slash';
	import { emoji } from '@cartamd/plugin-emoji';
	import { code } from '@cartamd/plugin-code';
	import { tikz } from '@cartamd/plugin-tikz';
	import { placeholderText } from './placeholder';

	import 'carta-md/default-theme.css';
	import 'carta-md/light.css';

	import 'katex/dist/katex.css';

	import '@cartamd/plugin-code/default.css';
	import '@cartamd/plugin-slash/default-theme.css';
	import '@cartamd/plugin-emoji/default-theme.css';
	import '@cartamd/plugin-tikz/fonts.css';

	const carta = new Carta({
		extensions: [
			tikz({
				debug: true
			}),
			slash(),
			emoji(),
			code(),
			math()
		]
	});

	let syncScroll = true;
	let mode: 'tabs' | 'split' | 'auto' = 'auto';
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
	<div class="options">
		<fieldset>
			<legend>Scroll</legend>

			<input bind:checked={syncScroll} type="checkbox" id="scroll" name="scroll" />
			<label for="scroll">Sync scroll</label>
		</fieldset>

		<fieldset>
			<legend>Editor mode</legend>

			<div>
				<input type="radio" id="auto" name="drone" value="auto" bind:group={mode} />
				<label for="auto">Auto</label>
			</div>

			<div>
				<input type="radio" id="tabs" name="drone" value="tabs" bind:group={mode} />
				<label for="tabs">Tabs</label>
			</div>

			<div>
				<input type="radio" id="split" name="drone" value="split" bind:group={mode} />
				<label for="split">Split</label>
			</div>
		</fieldset>
	</div>

	<CartaEditor value={placeholderText} scroll={syncScroll ? 'sync' : 'async'} {carta} {mode} />
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
	}

	:global(input, textarea, button) {
		font-family: inherit;
	}

	main {
		max-width: 1536px;
		margin: 0 auto 0 auto;
		padding: 2rem 0 2rem 0;
	}

	fieldset {
		display: flex;
	}

	.options {
		margin-bottom: 1.5rem;
		display: flex;
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
