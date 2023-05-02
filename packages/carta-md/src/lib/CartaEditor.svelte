<script lang="ts">
	import CartaRenderer from './internal/components/CartaRenderer.svelte';
	import MarkdownInput from './internal/components/MarkdownInput.svelte';
	import type { Carta } from './internal/carta';
	import { onMount } from 'svelte';

	export let carta: Carta;
	export let theme = 'default';
	export let value = '';
	export let mode: 'tab' | 'split' | 'auto' = 'auto';
	export let disableToolbar = false;

	let width: number;
	let selectedTab: 'input' | 'preview' = 'input';
	let windowMode: 'tab' | 'split';
	let mounted = false;
	onMount(() => (mounted = true));

	$: {
		windowMode = mode === 'auto' ? (width > 768 ? 'split' : 'tab') : mode;
	}
</script>

<div bind:clientWidth={width} class="carta-editor carta-theme__{theme}">
	{#if !disableToolbar}
		<div class="carta-toolbar">
			<div class="carta-toolbar-left" />
			<div class="carta-toolbar-right">
				{#each carta.icons as icon}
					<button
						on:click|preventDefault|stopPropagation={(e) => {
							carta.input && icon.action(carta.input);
							carta.input?.update();
							carta.input?.textarea.focus();
						}}
						class="carta-icon"
					>
						<svelte:component this={icon.component} />
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<div class="mode-{windowMode} carta-wrapper">
		{#if windowMode == 'split' || selectedTab == 'input'}
			<MarkdownInput {carta} bind:value />
		{/if}
		{#if windowMode == 'split' || selectedTab == 'preview'}
			<CartaRenderer {carta} bind:value />
		{/if}
	</div>

	<!-- Extensions components -->
	<!-- prevent loading components on ssr renderings -->
	{#if mounted}
		{#each carta.components as { component, props }}
			{@debug component, props}
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
		width: 100%;
		height: 2rem;
		display: flex;
	}

	:global(.mode-split > *) {
		width: 50%;
	}

	:global(.mode-tab > *) {
		width: 100%;
	}

	.carta-wrapper {
		flex-grow: 1;
		height: fit-content;
		display: flex;
		flex-grow: 1;
		flex-shrink: 0;
	}

	.carta-toolbar-left {
		height: 100%;
	}

	.carta-toolbar-right {
		height: 100%;
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: end;
		padding-right: 6px;
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
