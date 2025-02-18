<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	type $$Props = DialogPrimitive.TitleProps;

	interface Props {
		class?: $$Props['class'];
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Title
	class={cn('text-lg font-semibold leading-none tracking-tight', className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Title>
