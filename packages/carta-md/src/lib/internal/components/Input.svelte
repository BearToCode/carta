<script lang="ts">
	import { onMount } from 'svelte';
	import type { Carta } from '../carta';
	import type { TextAreaProps } from '../textarea-props';
	import { debounce } from '../utils';

	export let carta: Carta;
	export let value = '';
	export let placeholder = '';
	export let elem: HTMLDivElement;
	export let handleScroll: (e: UIEvent) => void;
	export let props: TextAreaProps = {};

	let textarea: HTMLTextAreaElement;
	let highlighElem: HTMLDivElement;
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

	const highlight = async (text: string) => {
		const highlighter = await carta.highlighter();
		let html: string;

		if (highlighter.isSingleTheme(highlighter.theme)) {
			// Single theme
			html = highlighter.codeToHtml(text, {
				lang: highlighter.lang,
				theme: highlighter.theme
			});
		} else {
			// Dual theme
			html = highlighter.codeToHtml(text, {
				lang: highlighter.lang,
				themes: highlighter.theme
			});
		}

		if (carta.options?.sanitizer) {
			highlighted = carta.options.sanitizer(html);
		} else {
			highlighted = html;
		}
	};

	const findNestedLanguages = (text: string) => {
		const languages = new Set<string>();

		const regex = /```([a-z]+)\n([\s\S]+?)\n```/g;
		let match: RegExpExecArray | null;
		while ((match = regex.exec(text))) {
			languages.add(match[1]);
		}
		return languages;
	};

	const loadNestedLanguages = debounce(async (text: string) => {
		const languages = findNestedLanguages(text);
		const highlighter = await carta.highlighter();
		const loadedLanguages = highlighter.getLoadedLanguages();
		let updated = false;
		for (const lang of languages) {
			if (highlighter.isBundleLanguage(lang) && !loadedLanguages.includes(lang)) {
				await highlighter.loadLanguage(lang);
				loadedLanguages.push(lang);
				updated = true;
			}
		}
		if (updated) {
			highlight(value);
		}
	}, 500);

	const normalize = (text: string) => {
		return text.replaceAll('\r\n', '\n');
	};

	$: highlight(normalize(value)).then(resize);
	$: loadNestedLanguages(normalize(value));

	onMount(() => {
		mounted = true;
		requestAnimationFrame(resize);
	});
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
		<div
			class="carta-highlight carta-font-code"
			tabindex="-1"
			aria-hidden="true"
			bind:this={highlighElem}
		>
			<!-- eslint-disable-line svelte/no-at-html-tags -->{@html highlighted}
		</div>

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
