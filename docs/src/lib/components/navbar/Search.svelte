<script lang="ts">
	import { MagnifyingGlass } from 'radix-icons-svelte';
	import * as Command from '$lib/components/ui/command';

	export { className as class };

	let open = false;
	let value = '';
	let className = '';

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<button class="mr-2 block md:hidden">
	<MagnifyingGlass class="h-7 w-7 text-neutral-200" />
</button>

<button
	class="hidden w-[360px] items-center justify-between rounded-lg border border-neutral-700 bg-neutral-900 px-2 py-1.5 text-sm md:flex {className}"
	on:click={() => (open = !open)}
>
	<div class="inline-flex items-center space-x-2">
		<MagnifyingGlass class="h-5 w-5 text-neutral-500" />
		<span class="text-neutral-500">Search...</span>
	</div>
	<kbd
		class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100"
	>
		<span class="text-xs">⌘</span>K
	</kbd>
</button>

<Command.Dialog bind:open bind:value>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<!-- <Command.Group heading="Suggestions">
			<Command.Item>
				<Calendar class="mr-2 h-4 w-4" />
				<span>Calendar</span>
			</Command.Item>
		</Command.Group> -->
	</Command.List>
</Command.Dialog>
