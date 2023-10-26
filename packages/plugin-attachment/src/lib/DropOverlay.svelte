<script lang="ts">
	import type { Carta } from 'carta-md';
	import type { Writable } from 'svelte/store';
	import UploadIcon from './icons/UploadIcon.svelte';
	import type { SvelteComponent } from 'svelte';

	export let carta: Carta;
	export let draggingOverTextArea: Writable<boolean>;
	export let draggingOverOverlay: Writable<boolean>;
	export let handleDrop: (event: DragEvent) => void;
	export let dropOverlay: typeof SvelteComponent | false | undefined;

	// Prevent unused property warning
	carta;
</script>

{#if dropOverlay !== false && ($draggingOverTextArea || $draggingOverOverlay)}
	<div
		class="carta-drop-overlay"
		on:dragover|preventDefault
		on:dragenter={() => draggingOverOverlay.set(true)}
		on:dragleave={() => draggingOverOverlay.set(false)}
		on:drop={handleDrop}
		role="button"
		tabindex="0"
		aria-label="Drop files to upload"
	>
		{#if dropOverlay}
			<svelte:component this={dropOverlay} />
		{:else}
			<div class="carta-drop-overlay-container">
				<div class="carta-drop-overlay-content">
					<UploadIcon />
				</div>
			</div>
		{/if}
	</div>
{/if}
