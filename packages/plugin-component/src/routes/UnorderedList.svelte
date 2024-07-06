<script lang="ts">
	import { Slot } from '$lib/svelte';
</script>

<ul>
	<li>Something before.</li>
	<Slot />
	<li>Something after.</li>
</ul>
