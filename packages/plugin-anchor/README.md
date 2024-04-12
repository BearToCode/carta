# Carta Anchor Plugin

This plugin adds `id` attributes and permalinks to headings. Install it using:

```
npm i @cartamd/plugin-anchor
```

## Setup

### Styles

Import the default theme, or create you own:

```ts
import '@cartamd/plugin-anchor/default.css';
```

### Extension

```svelte
<script>
	import { Carta, MarkdownEditor } from 'carta-md';
	import { anchor } from '@cartamd/plugin-anchor';

	const carta = new Carta({
		extensions: [anchor()]
	});
</script>

<MarkdownEditor {carta} />
```

## Documentation

Checkout the [docs](https://beartocode.github.io/carta/plugins/anchor) for examples, options and more.
