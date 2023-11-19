<script lang="ts">
	import { Copy } from 'radix-icons-svelte';

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
      absolute right-4 top-[min(50%_,_32px)] -translate-y-1/2 transform
      rounded p-2 hover:bg-neutral-800 hover:text-neutral-300 active:text-sky-300
    "
	>
		<Copy class="h-5 w-5" />
	</button>
</div>
