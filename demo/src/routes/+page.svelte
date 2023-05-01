<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	import { katexExtension } from '@cartamd/katex';
	import 'carta-md/default-theme.css';
	import 'carta-md/light.css';
	import 'katex/dist/katex.css';

	const carta = new Carta({
		extensions: [katexExtension()]
	});
</script>

<CartaEditor {carta} />
