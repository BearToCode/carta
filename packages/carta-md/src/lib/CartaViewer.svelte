<script lang="ts">
	import type { Carta } from './';

	export let carta: Carta;
	export let value: string;
	export let theme = 'default';
</script>

<div class="carta-viewer__{theme}">
	{@html carta.render(value)}
</div>
