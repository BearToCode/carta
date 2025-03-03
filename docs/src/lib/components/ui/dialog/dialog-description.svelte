<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	type Props = {
		children?: import('svelte').Snippet;
	} & DialogPrimitive.DescriptionProps;

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Description class={cn('text-muted-foreground text-sm', className)} {...rest}>
	{@render children?.()}
</DialogPrimitive.Description>
