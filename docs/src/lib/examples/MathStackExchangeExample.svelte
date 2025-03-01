<script lang="ts">
	import { run } from 'svelte/legacy';

	import { Carta, MarkdownEditor, Markdown } from 'carta-md';
	import placeholder from './assets/math-stack-exchange-placeholder.tex?raw';
	import { math } from '@cartamd/plugin-math';
	import { tikz } from '@cartamd/plugin-tikz';

	import '$lib/styles/math-stack-exchange.scss';
	import 'katex/dist/katex.min.css';
	import { debounce } from '$lib/utils';

	const carta = new Carta({
		sanitizer: false,
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

	let { value = $bindable(placeholder) } = $props();
	let debouncedValue = $state(value);

	const updateValue = debounce((value: string) => {
		debouncedValue = value;
	}, 500);

	run(() => {
		updateValue(value);
	});
</script>

<div class="math-stack-exchange-container">
	<MarkdownEditor bind:value mode="tabs" theme="math-stack-exchange" {carta} />

	{#key debouncedValue}
		<Markdown theme="math-stack-exchange" value={debouncedValue} {carta} />
	{/key}
</div>
