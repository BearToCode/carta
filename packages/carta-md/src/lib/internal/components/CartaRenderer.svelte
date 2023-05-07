<script lang="ts">
	import type { Carta } from '../carta';
	import { debounce } from '../utils';

	export let carta: Carta;
	export let value: string;

	let renderedHtml = '';

	$: {
		// On value updates
		value = value;
		debounce(() => {
			carta.render(value).then((rendered) => (renderedHtml = rendered));
		}, carta.options?.rendererDebounce ?? 300)();
	}
</script>

<div class="carta-renderer">
	{@html renderedHtml}
	<slot />
</div>

<style>
	.carta-renderer {
		position: relative;
		word-wrap: break-word;
		white-space: pre-wrap;
		word-break: break-word;
	}
</style>
