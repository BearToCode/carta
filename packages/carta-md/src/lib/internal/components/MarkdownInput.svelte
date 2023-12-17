<script lang="ts">
	import { onMount } from 'svelte';
	import type { Carta } from '../carta';
	import type { TextAreaProps } from '../textarea-props';

	export let carta: Carta;
	export let value = '';
	export let placeholder = '';
	export let elem: HTMLDivElement;
	export let handleScroll: (e: UIEvent) => void;
	export let props: TextAreaProps = {};

	let textarea: HTMLTextAreaElement;
	let highlighElem: HTMLPreElement;
	let highlighted = value;
	let mounted = false;

	export const resize = () => {
		if (!mounted || !textarea) return;
		textarea.style.height = highlighElem.scrollHeight + 'px';
		textarea.scrollTop = 0;
	};

	const focus = () => {
		// Allow text selection
		const selectedText = window.getSelection()?.toString();
		if (selectedText) return;

		textarea?.focus();
	};

	const setInput = () => {
		carta.$setInput(textarea, elem, () => {
			value = textarea.value;
			highlight(value);
		});
	};

	const highlight = async (text: string) => (highlighted = (await carta.highlight(text)) as string);
	$: highlight(value).then(resize);

	onMount(() => (mounted = true));
	onMount(setInput);
</script>

<div role="tooltip" id="editor-unfocus-suggestion">
	Press ESC then TAB to move the focus off the field
</div>
<div
	on:click={focus}
	on:keydown={focus}
	on:scroll={handleScroll}
	role="textbox"
	tabindex="-1"
	class="carta-input"
	bind:this={elem}
>
	<div class="carta-input-wrapper">
		<pre
			class="shj-lang-md carta-font-code"
			bind:this={highlighElem}
			tabindex="-1"
			aria-hidden="true"><!-- eslint-disable-line svelte/no-at-html-tags -->{@html highlighted}</pre>

		<textarea
			name="md"
			id="md"
			spellcheck="false"
			class="carta-font-code"
			aria-multiline="true"
			aria-describedby="editor-unfocus-suggestion"
			tabindex="0"
			{placeholder}
			{...props}
			bind:value
			bind:this={textarea}
			on:scroll={() => (textarea.scrollTop = 0)}
		/>
	</div>

	{#if mounted}
		<slot />
	{/if}
</div>

<style>
	.carta-input {
		position: relative;
	}

	.carta-input-wrapper {
		height: 100%;
		position: relative;
		font-family: monospace;
	}

	textarea {
		position: relative;
		width: 100%;
		max-width: 100%;
		min-height: 100%;

		overflow-y: hidden;
		resize: none;

		padding: 0;
		margin: 0;
		border: 0;

		color: transparent;
		background: transparent;

		font-size: inherit;

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
		height: fit-content;

		padding: inherit;
		margin: inherit;

		word-wrap: break-word;
		white-space: pre-wrap;
		word-break: break-word;
	}

	#editor-unfocus-suggestion {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}
</style>
