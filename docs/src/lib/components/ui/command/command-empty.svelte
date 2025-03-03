<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv';
	import { cn } from '$lib/utils';

	type Props = {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
	} & CommandPrimitive.EmptyProps;

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<CommandPrimitive.Empty class={cn('py-6 text-center text-sm', className)} {...rest}>
	{@render children?.()}
</CommandPrimitive.Empty>
