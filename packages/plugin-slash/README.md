# Carta Slash Plugin

This plugin adds support for **Slash** commands. Install it using:

```
npm i @cartamd/plugin-slash
```

## Setup

### Styles

Import the default theme, or create you own:

```ts
import '@cartamd/plugin-slash/default.css';
```

### Extension

```svelte
<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { slash } from '@cartamd/plugin-slash';

	const carta = new Carta({
		extensions: [slash()]
	});
</script>

<MarkdownEditor {carta} />
```

## Documentation

Checkout the [docs](https://beartocode.github.io/carta/plugins/slash) for examples, options and more.
