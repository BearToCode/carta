<script lang="ts">
	import { createBubbler, preventDefault } from 'svelte/legacy';

	const bubble = createBubbler();
	import type { Carta } from 'carta-md';
	import type { Writable } from 'svelte/store';
	import UploadIcon from './icons/UploadIcon.svelte';
	import type { SvelteComponent } from 'svelte';

	interface Props {
		carta: Carta;
		draggingOverTextArea: Writable<boolean>;
		draggingOverOverlay: Writable<boolean>;
		handleDrop: (event: DragEvent) => void;
		dropOverlay: typeof SvelteComponent | false | undefined;
	}

	let { carta, draggingOverTextArea, draggingOverOverlay, handleDrop, dropOverlay }: Props =
		$props();

	// Prevent unused property warning
	carta;
</script>

{#if dropOverlay !== false && ($draggingOverTextArea || $draggingOverOverlay)}
	<div
		class="carta-drop-overlay"
		ondragover={preventDefault(bubble('dragover'))}
		ondragenter={() => draggingOverOverlay.set(true)}
		ondragleave={() => draggingOverOverlay.set(false)}
		ondrop={handleDrop}
		role="button"
		tabindex="0"
		aria-label="Drop files to upload"
	>
		{#if dropOverlay}
			{@const SvelteComponent_1 = dropOverlay}
			<SvelteComponent_1 />
		{:else}
			<div class="carta-drop-overlay-container">
				<div class="carta-drop-overlay-content">
					<UploadIcon />
				</div>
			</div>
		{/if}
	</div>
{/if}
