<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv';
	import { cn } from '$lib/utils';

	type Props = {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
	} & CommandPrimitive.GroupProps;

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<CommandPrimitive.Group
	class={cn(
		'text-foreground [&_[data-cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:py-1.5 [&_[data-cmdk-group-heading]]:text-xs [&_[data-cmdk-group-heading]]:font-medium',
		className
	)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Group>
