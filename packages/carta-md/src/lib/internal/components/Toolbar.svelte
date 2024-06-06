<!--
	@component
	Displays the buttons to switch tabs and the icons to interact with the editor.
-->

<script lang="ts">
	import type { Labels } from '../labels';
	import { handleArrowKeysNavigation } from '../accessibility';
	import type { Carta } from '../carta';
	import MenuIcon from './icons/MenuIcon.svelte';
	import { onMount } from 'svelte';
	import { debounce } from '../utils';

	/**
	 * The Carta instance to use.
	 */
	export let carta: Carta;
	/**
	 * The current editor mode.
	 */
	export let mode: 'tabs' | 'split';
	/**
	 * The current tab.
	 */
	export let tab: 'write' | 'preview';
	/**
	 * Editor labels.
	 */
	export let labels: Labels;

	let toolbar: HTMLDivElement;
	let menu: HTMLDivElement;
	let iconsContainer: HTMLDivElement;

	let visibleIcons = [...carta.icons];
	let availableWidth = 0;
	let iconWidth = 0;
	let toolbarHeight = 0;
	let iconsHidden = false;
	let showMenu = false;

	const IconPadding = 8;

	const waitForDOMUpdate = () => new Promise(requestAnimationFrame);

	const onResize = debounce(async () => {
		if (!toolbar || !iconsContainer) return;
		const overflowing = () => toolbar.scrollWidth - toolbar.clientWidth > 0;
		while (overflowing()) {
			visibleIcons.pop();
			visibleIcons = visibleIcons;
			await waitForDOMUpdate();
		}

		const fitting = () => availableWidth > 2 * iconWidth + IconPadding;
		while (visibleIcons.length < carta.icons.length && fitting()) {
			visibleIcons.push(carta.icons[visibleIcons.length]);
			visibleIcons = visibleIcons;
			await waitForDOMUpdate();
		}
	}, 100);

	function onClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (menu && !menu.contains(target)) {
			showMenu = false;
		}
	}

	onMount(onResize);

	$: iconsHidden = visibleIcons.length !== carta.icons.length;
</script>

<svelte:window on:resize={onResize} on:click={onClick} />

<div class="carta-toolbar" role="toolbar" bind:clientHeight={toolbarHeight} bind:this={toolbar}>
	<div class="carta-toolbar-left">
		{#if mode == 'tabs'}
			<button
				type="button"
				tabindex={0}
				class={tab === 'write' ? 'carta-active' : ''}
				on:click={() => (tab = 'write')}
				on:keydown={handleArrowKeysNavigation}
			>
				{labels.writeTab}
			</button>
			<button
				type="button"
				tabindex={-1}
				class={tab === 'preview' ? 'carta-active' : ''}
				on:click={() => (tab = 'preview')}
				on:keydown={handleArrowKeysNavigation}
			>
				{labels.previewTab}
			</button>
		{/if}
	</div>

	<div class="carta-filler" bind:clientWidth={availableWidth} />

	<div class="carta-toolbar-right" bind:this={iconsContainer}>
		{#each visibleIcons as icon, index}
			{@const label = labels.iconsLabels[icon.id] ?? icon.label}
			<button
				class="carta-icon"
				tabindex={index == 0 ? 0 : -1}
				title={label}
				aria-label={label}
				bind:clientWidth={iconWidth}
				on:click|preventDefault|stopPropagation={() => {
					carta.input && icon.action(carta.input);
					carta.input?.update();
					carta.input?.textarea.focus();
				}}
				on:keydown={handleArrowKeysNavigation}
			>
				<svelte:component this={icon.component} />
			</button>
		{/each}
		{#if iconsHidden}
			{@const label = labels.iconsLabels['menu'] ?? 'Menu'}
			<button
				class="carta-icon"
				tabindex={-1}
				title={label}
				aria-label={label}
				on:keydown={handleArrowKeysNavigation}
				on:click|preventDefault|stopPropagation={() => (showMenu = !showMenu)}
			>
				<MenuIcon />
			</button>
		{/if}
	</div>
</div>

{#if showMenu && iconsHidden}
	<div class="carta-icons-menu" style="top: {toolbarHeight}px;" bind:this={menu}>
		{#each carta.icons.filter((icon) => !visibleIcons.includes(icon)) as icon}
			{@const label = labels.iconsLabels[icon.id] ?? icon.label}

			<button
				class="carta-icon-full"
				aria-label={label}
				on:click|preventDefault|stopPropagation={() => {
					carta.input && icon.action(carta.input);
					carta.input?.update();
					carta.input?.textarea.focus();
					showMenu = false;
				}}
				on:keydown={handleArrowKeysNavigation}
			>
				<svelte:component this={icon.component} />
				<span>{label}</span>
			</button>
		{/each}
	</div>
{/if}

<style>
	.carta-toolbar {
		height: 2rem;
		display: flex;
		flex-shrink: 0;
		overflow-x: auto;
		overflow-y: hidden;
	}

	.carta-toolbar-left {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		height: 100%;
	}

	.carta-filler {
		flex: 1;
	}

	.carta-toolbar-right {
		height: 100%;
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

	.carta-icon-full {
		display: flex;
		align-items: center;
		border-radius: 3px;
		cursor: pointer;
	}

	.carta-icons-menu {
		position: absolute;
		top: 100%;
		right: 0;
		display: flex;
		flex-direction: column;
		margin-right: 0.5rem;
		z-index: 1;
	}
</style>
