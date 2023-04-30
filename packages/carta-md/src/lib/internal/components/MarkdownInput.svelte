<script lang="ts">
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-markdown.js';
	import type { Carta } from '../carta';

	export let carta: Carta;
	export let value = '';

	let textarea: HTMLTextAreaElement;
	let highlighted: string;

	const focus = () => {
		// Allow text selection
		const selectedText = window.getSelection()?.toString();
		if (selectedText) return;

		textarea.focus();
	};
	const resize = () => {
		textarea.style.height = '0';
		textarea.style.height = textarea.scrollHeight + 'px';
	};

	const highlight = (val: string) => {
		highlighted = Prism.highlight(val, Prism.languages.markdown, 'language-markdown');
	};

	$: highlight(value);

	onMount(() => {
		carta.setInput(textarea, () => (value = textarea.value));
	});
</script>

<div on:click={focus} on:keydown={focus} class="carta-input">
	<pre class="hljs" aria-hidden="true">{@html highlighted}</pre>

	<textarea
		name="md"
		id="md"
		bind:value
		bind:this={textarea}
		on:input={resize}
		spellcheck="false"
	/>
</div>

<style>
	div {
		position: relative;
	}

	textarea {
		position: relative;
		width: 100%;
		min-height: 100%;

		overflow-y: hidden;
		resize: none;

		padding: 0;
		margin: 0;
		border: 0;

		color: transparent;
		background: transparent;

		font-size: inherit;
		font-family: inherit;

		outline: none;
	}

	pre {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: 0;
		user-select: none;

		padding: inherit;
		margin: inherit;

		word-wrap: break-word;
		white-space: pre-wrap;
		word-break: break-word;

		font-family: inherit;
	}
</style>
