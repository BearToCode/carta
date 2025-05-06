<!--
	@component
	A wrapped textarea component integrated with Carta. It handles the highlighting
	and propagates events to the Carta instance.	
-->

<script lang="ts">
	import type { Carta } from '../carta';
	import type { UIEventHandler } from 'svelte/elements';
	import type { TextAreaProps } from '../textarea-props';
	import { onMount, type Snippet } from 'svelte';
	import { debounce } from '../utils';
	import { BROWSER } from 'esm-env';
	import { speculativeHighlightUpdate } from '../speculative';

	interface Props {
		/**
		 * The Carta instance to use.
		 */
		carta: Carta;
		/**
		 * The editor content.
		 */
		value: string;
		/**
		 * The placeholder text for the textarea.
		 */
		placeholder: string;
		/**
		 * The element of the wrapper div.
		 */
		elem: HTMLDivElement | undefined;
		/**
		 * Additional textarea properties.
		 */
		props: TextAreaProps;
		/**
		 * Whether this component is hidden (display: none).
		 */
		hidden: boolean;
		/**
		 * Highlight delay in milliseconds.
		 */
		highlightDelay: number;
		onscroll: UIEventHandler<HTMLDivElement>;
		children: Snippet;
	}

	let {
		carta,
		value = $bindable(''),
		placeholder = '',
		elem = $bindable(),
		props: textareaProps = {},
		hidden = false,
		onscroll,
		children,
		highlightDelay
	}: Props = $props();

	let textarea: HTMLTextAreaElement;
	let highlightElem: HTMLDivElement;
	let wrapperElem: HTMLDivElement;
	let currentlyHighlightedValue = value;

	const simpleUUID = Math.random().toString(36).substring(2);

	/**
	 * Manually resize the textarea to fit the content, so that it
	 * always perfectly overlaps the highlighting overlay.
	 */
	export const resize = () => {
		if (!mounted || !textarea) return;
		textarea.style.height = '0';
		textarea.style.minHeight = '0';
		textarea.style.height = textarea.scrollHeight + 'px';
		textarea.style.minHeight = wrapperElem.clientHeight + 'px';
		textarea.scrollTop = 0;

		const isFocused = document.activeElement === textarea;
		if (!isFocused) return;
		if (!carta.input) return;
		const coords = carta.input.getCursorXY();
		if (!coords) return;

		if (
			elem &&
			(coords.top < 0 ||
				coords.top + carta.input.getRowHeight() >= elem.scrollTop + elem.clientHeight)
		) {
			elem.scrollTo({ top: coords?.top, behavior: 'instant' });
		}
	};

	/**
	 * Focus the textarea element.
	 */
	const focus = () => {
		// Allow text selection
		const selectedText = window.getSelection()?.toString();
		if (selectedText) return;

		textarea?.focus();
	};

	/**
	 * Highlight the text in the textarea.
	 * @param text The text to highlight.
	 */
	async function highlight(text: string) {
		const highlighter = await carta.highlighter();
		if (!highlighter) return null;

		const html = highlighter.codeToHtml(text);
		const timestamp = new Date().getTime();

		if (carta.sanitizer) {
			return { html: carta.sanitizer(html), timestamp };
		} else {
			return { html, timestamp };
		}
	}

	/**
	 * Debounced version of the highlight function.
	 */
	const debouncedHighlight = debounce(highlight, highlightDelay);

	/**
	 * Returns the highlighted text using a speculative update.
	 * @param text The text to highlight.
	 */
	function speculativeHighlight(value: string) {
		const timestamp = new Date().getTime();

		if (!mounted) return { html: '', timestamp };

		const currentOverlay = highlightElem.innerHTML;
		if (highlightElem) {
			try {
				const html = speculativeHighlightUpdate(currentlyHighlightedValue, value, currentOverlay);
				currentlyHighlightedValue = value;

				return { html, timestamp };
			} catch (e) {
				console.error(`Error executing speculative update: ${e}.`);
			}
		}

		return {
			html: highlightElem.innerHTML,
			timestamp
		};
	}

	/**
	 * Highlight the nested languages in the markdown, loading the necessary
	 * languages if needed.
	 */
	const highlightNestedLanguages = debounce(async (text: string) => {
		const highlighter = await carta.highlighter();

		const hl = await import('$lib/internal/highlight');
		const { loadNestedLanguages } = hl;

		if (!highlighter) return;
		const { updated } = await loadNestedLanguages(highlighter, text);
		if (updated) overlayPromise = debouncedHighlight(text);
	}, 300);

	/**
	 * Value change handler.
	 */
	const onchange = (value: string) => {
		highlightNestedLanguages(value);
	};

	/**
	 * Runes
	 */
	let mounted = $state(false);
	let overlayPromise = $derived(debouncedHighlight(value));
	let overlay = $state<Awaited<typeof overlayPromise>>(null);
	let speculativeOverlay = $derived(speculativeHighlight(value));
	let displayedOverlay = $derived(
		overlay && overlay.timestamp > speculativeOverlay.timestamp ? overlay : speculativeOverlay
	);

	$effect(() => {
		if (BROWSER) onchange(value);
	});

	$effect(() => {
		overlayPromise.then(async (o) => (overlay = await o));
	});

	$effect(() => {
		if (mounted) {
			displayedOverlay; // When the overlay changes
			requestAnimationFrame(resize); // Resize the textarea
		}
	});

	/**
	 * Mount callback
	 */
	onMount(() => {
		mounted = true;
		// Resize once the DOM is updated.
		requestAnimationFrame(resize);

		carta.$setInput(textarea, elem!, () => {
			value = textarea.value;
		});
	});
</script>

<div
	role="tooltip"
	class="editor-unfocus-suggestion"
	id="editor-unfocus-suggestion-{simpleUUID}"
	style="display: {hidden ? 'none' : 'unset'};"
>
	Press ESC then TAB to move the focus off the field
</div>
<div
	role="textbox"
	tabindex="-1"
	class="carta-input"
	style="display: {hidden ? 'none' : 'unset'};"
	onclick={focus}
	onkeydown={focus}
	{onscroll}
	bind:this={elem}
>
	<div class="carta-input-wrapper" bind:this={wrapperElem}>
		<div
			class="carta-highlight carta-font-code"
			tabindex="-1"
			aria-hidden="true"
			bind:this={highlightElem}
		>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html displayedOverlay.html}
		</div>

		<textarea
			class="carta-font-code"
			aria-multiline="true"
			aria-describedby="editor-unfocus-suggestion-{simpleUUID}"
			spellcheck={textareaProps.spellcheck === true}
			tabindex="0"
			{placeholder}
			{...textareaProps}
			bind:value
			bind:this={textarea}
			onscroll={() => (textarea.scrollTop = 0)}
		></textarea>
	</div>

	{#if mounted}
		{@render children()}
	{/if}
</div>

<style>
	.carta-input {
		position: relative;
	}

	.carta-input-wrapper {
		position: relative;
		font-family: monospace;
		min-height: 100%;
	}

	textarea {
		position: relative;
		width: 100%;
		max-width: 100%;

		overflow-y: hidden;
		resize: none;

		padding: 0;
		margin: 0;
		border: 0;

		color: transparent;
		background: transparent;

		outline: none;
		tab-size: 4;
	}

	.carta-highlight {
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

	:global(.carta-highlight .shiki) {
		margin: 0;
		tab-size: 4;
		background-color: transparent !important;
	}

	:global(.carta-highlight *) {
		font-family: inherit;
		font-size: inherit;

		word-wrap: break-word;
		white-space: pre-wrap;
		word-break: break-word;
	}

	.editor-unfocus-suggestion {
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
