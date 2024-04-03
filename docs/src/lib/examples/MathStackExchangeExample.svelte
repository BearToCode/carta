<script lang="ts">
	import { Carta, MarkdownEditor, Markdown } from 'carta-md';
	import placeholder from './math-stack-exchange-placeholder.tex?raw';
	import { math } from '@cartamd/plugin-math';
	import { tikz } from '@cartamd/plugin-tikz';
	import 'carta-md/dark.css';
	import '$lib/styles/math-stack-exchange.scss';
	import 'katex/dist/katex.min.css';

	const carta = new Carta({
		extensions: [
			math(),
			tikz({
				postProcessing: (html) => {
					// Simple dark mode support
					return html
						.replaceAll('#000000', '~~~')
						.replaceAll('#000', '~~~')
						.replaceAll('black', '~~~')
						.replaceAll('#ffffff', '#000')
						.replaceAll('#fff', '#000')
						.replaceAll('white', '#000')
						.replaceAll('~~~', '#fff');
				}
			})
		]
	});

	export let value = placeholder;
</script>

<div class="math-stack-exchange-container">
	<MarkdownEditor bind:value mode="tabs" theme="math-stack-exchange" {carta} />

	{#key value}
		<Markdown theme="math-stack-exchange" {value} {carta} />
	{/key}
</div>
