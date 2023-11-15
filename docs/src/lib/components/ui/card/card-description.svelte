<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type $$Props = HTMLAttributes<HTMLParagraphElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<p class={cn('text-muted-foreground text-base', className)} {...$$restProps}>
	<slot />
</p>
