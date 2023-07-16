<script lang="ts">
	import { onMount } from 'svelte';
	import { Carta } from '../carta';

	export let carta: Carta;
	export let value = '';
	export let elem: HTMLDivElement;
	export let handleScroll: (e: UIEvent) => void;

	let textarea: HTMLTextAreaElement;
	let highlighted = value;

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

	const highlight = async (val: string) => {
		highlighted = (await Carta.highlight(val, 'cartamd', true)) as string;
	};

	$: highlight(value);

	onMount(() => {
		carta.$setInput(textarea, () => {
			value = textarea.value;
			highlight(value);
		});
		resize();
	});
</script>

<div
	on:click={focus}
	on:keydown={focus}
	on:scroll={handleScroll}
	class="carta-input"
	bind:this={elem}
>
	<div class="carta-input-wrapper">
		<pre class="shj-lang-md carta-font-code" aria-hidden="true">{@html highlighted}</pre>

		<textarea
			name="md"
			id="md"
			bind:value
			bind:this={textarea}
			on:input={resize}
			spellcheck="false"
			class="carta-font-code"
		/>
	</div>

	<slot />
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

	textarea#md {
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

		padding: inherit;
		margin: inherit;

		word-wrap: break-word;
		white-space: pre-wrap;
		word-break: break-word;
	}
</style>
