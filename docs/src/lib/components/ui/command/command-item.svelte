<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv';
	import { cn } from '$lib/utils';

	type Props = {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
	} & CommandPrimitive.ItemProps;

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<CommandPrimitive.Item
	class={cn(
		'aria-selected:bg-accent aria-selected:text-accent-foreground relative cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className
	)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Item>
