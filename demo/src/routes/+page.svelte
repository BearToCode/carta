<script lang="ts">
	import { Carta } from 'carta-md';
	import { katexExtension } from '@cartamd/katex';

	const carta = new Carta({
		extensions: [katexExtension()]
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
