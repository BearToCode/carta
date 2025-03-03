<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv';
	import { cn } from '$lib/utils';

	type Props = {
		class?: string | undefined | null;
	} & CommandPrimitive.SeparatorProps;

	let { class: className = undefined, ...rest }: Props = $props();
</script>

<CommandPrimitive.Separator class={cn('bg-border -mx-1 h-px', className)} {...rest} />
