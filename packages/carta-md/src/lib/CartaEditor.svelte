<script lang="ts">
	import type { Carta } from './internal/carta';
	import { onMount } from 'svelte';
	import CartaRenderer from './internal/components/CartaRenderer.svelte';
	import MarkdownInput from './internal/components/MarkdownInput.svelte';
	import { debounce } from './internal/utils';

	export let carta: Carta;
	export let theme = 'default';
	export let value = '';
	export let mode: 'tabs' | 'split' | 'auto' = 'auto';
	export let scroll: 'sync' | 'async' = 'sync';
	export let disableToolbar = false;
	export let placeholder = '';

	let width: number;
	let selectedTab: 'write' | 'preview' = 'write';
	let windowMode: 'tabs' | 'split';
	let mounted = false;
	let hideIcons = false;
	let resizeInput: () => void;
	onMount(() => (mounted = true));

	$: {
		windowMode = mode === 'auto' ? (width > 768 ? 'split' : 'tabs') : mode;
		hideIcons = width < 576;
	}

	$: {
		windowMode; // Resize when changing from tabs to split
		resizeInput && resizeInput();
	}

	let editorElem: HTMLDivElement;
	let inputElem: HTMLDivElement;
	let rendererElem: HTMLDivElement;
	let currentlyScrolling: HTMLDivElement | null;
	let currentScrollPercentage = 0;

	function calculateScrollPercentage(elem: HTMLDivElement) {
		const scrolledAvbSpace = elem.scrollHeight - elem.clientHeight;
		const scrolledAmount = elem.scrollTop * (1 + elem.clientHeight / scrolledAvbSpace);
		return scrolledAmount / elem.scrollHeight;
	}

	const clearCurrentlyScrolling = debounce(() => {
		currentlyScrolling = null;
	}, 1000);

	function handleScroll(e: UIEvent) {
		const [scrolled, target] =
			e.target == inputElem ? [inputElem, rendererElem] : [rendererElem, inputElem];
		const percentage = calculateScrollPercentage(scrolled);
		currentScrollPercentage = percentage;

		if (windowMode != 'split') return;

		if (scroll == 'async') {
			// Scrolling one element does not affect the other
			return;
		} else if (scroll == 'sync') {
			// Return if the scrolled is caused by a previous scrollTo
			if (currentlyScrolling && currentlyScrolling != scrolled) return;

			currentlyScrolling = scrolled;
			const targetAvbSpace = target.scrollHeight - target.clientHeight;

			target.scrollTo({ top: percentage * targetAvbSpace, behavior: 'smooth' });
			clearCurrentlyScrolling();
		}
	}

	function loadScrollPosition(tab: 'write' | 'preview') {
		if (windowMode !== 'tabs') return;
		const elem = tab === 'write' ? inputElem : rendererElem;
		if (!elem) return;

		const avbSpace = elem.scrollHeight - elem.clientHeight;
		elem.scroll({ top: avbSpace * currentScrollPercentage, behavior: 'instant' });
	}

	$: {
		inputElem, rendererElem;
		loadScrollPosition(selectedTab);
	}

	onMount(() => carta.$setElement(editorElem));
</script>

<div bind:this={editorElem} bind:clientWidth={width} class="carta-editor carta-theme__{theme}">
	{#if !disableToolbar}
		<div class="carta-toolbar">
			<div class="carta-toolbar-left">
				{#if windowMode == 'tabs'}
					<button
						on:click={() => (selectedTab = 'write')}
						class={selectedTab === 'write' ? 'carta-active' : ''}
					>
						Write
					</button>
					<button
						on:click={() => (selectedTab = 'preview')}
						class={selectedTab === 'preview' ? 'carta-active' : ''}
					>
						Preview
					</button>
				{/if}
			</div>
			<div class="carta-toolbar-right">
				{#if !hideIcons}
					{#each carta.icons as icon}
						<button
							on:click|preventDefault|stopPropagation={() => {
								carta.input && icon.action(carta.input);
								carta.input?.update();
								carta.input?.textarea.focus();
							}}
							class="carta-icon"
						>
							<svelte:component this={icon.component} />
						</button>
					{/each}
				{/if}
			</div>
		</div>
	{/if}

	<div class="carta-wrapper">
		<div class="carta-container mode-{windowMode}">
			{#if windowMode == 'split' || selectedTab == 'write'}
				<MarkdownInput
					{carta}
					{placeholder}
					{handleScroll}
					bind:value
					bind:resize={resizeInput}
					bind:elem={inputElem}
				>
					<!-- Input extensions components -->
					{#if mounted}
						{#each carta.components.filter(({ parent }) => [parent]
								.flat()
								.includes('input')) as { component, props }}
							<svelte:component this={component} {carta} {...props} />
						{/each}
					{/if}
				</MarkdownInput>
			{/if}
			{#if windowMode == 'split' || selectedTab == 'preview'}
				<CartaRenderer {carta} {handleScroll} bind:value bind:elem={rendererElem}>
					<!-- Renderer extensions components -->
					{#if mounted}
						{#each carta.components.filter(({ parent }) => [parent]
								.flat()
								.includes('renderer')) as { component, props }}
							<svelte:component this={component} {carta} {...props} />
						{/each}
					{/if}
				</CartaRenderer>
			{/if}
		</div>
	</div>

	<!-- Editor extensions components -->
	<!-- prevent loading components on ssr renderings -->
	{#if mounted}
		{#each carta.components.filter(({ parent }) => [parent]
				.flat()
				.includes('editor')) as { component, props }}
			<svelte:component this={component} {carta} {...props} />
		{/each}
	{/if}
</div>

<style>
	.carta-editor {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.carta-toolbar {
		height: 2rem;
		display: flex;
		flex-shrink: 0;
	}

	:global(.mode-split > *) {
		width: 50%;
	}

	:global(.mode-tabs > *) {
		width: 100%;
	}

	.carta-container {
		display: flex;
		position: relative;
	}

	.carta-toolbar-left {
		height: 100%;
	}

	.carta-toolbar-right {
		height: 100%;
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.carta-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 3px;
		cursor: pointer;
		margin-left: 4px;
	}
</style>
