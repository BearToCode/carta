<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv';
	import { cn } from '$lib/utils';

	// type $$Props = CommandPrimitive.InputProps;

	let className: string | undefined | null = undefined;
	export let value = '';
	export { className as class };
</script>

<div class="flex items-center border-b px-3" data-cmdk-input-wrapper="">
	<iconify-icon icon="ion:search" class="mr-2 shrink-0 text-xl opacity-50"></iconify-icon>
	<CommandPrimitive.Input
		bind:value
		class={cn(
			'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		{...$$restProps}
	/>
</div>
