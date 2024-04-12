<script lang="ts">
	let elem: HTMLElement;
</script>

<div bind:this={elem} class="relative">
	<slot />
	<!-- Copy button -->
	<button
		title="Copy"
		on:click={() => {
			navigator.clipboard.writeText(elem.innerText);
		}}
		class="
      absolute right-4 top-[min(50%_,_32px)] aspect-square -translate-y-1/2 transform
      rounded hover:bg-neutral-800 hover:text-neutral-300 active:text-sky-300
    "
	>
		<iconify-icon icon="octicon:copy-16" class="p-2 text-lg"></iconify-icon>
	</button>
</div>
