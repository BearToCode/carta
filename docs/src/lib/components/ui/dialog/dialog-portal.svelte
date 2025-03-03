<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	type Props = {
		children?: import('svelte').Snippet;
	} & DialogPrimitive.PortalProps;

	let { children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Portal {...rest}>
	{@render children?.()}
</DialogPrimitive.Portal>
