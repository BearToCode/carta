# Carta Emoji Plugin

This plugin adds support for **Emojis**. Install it using:

```
npm i @cartamd/plugin-emoji
```

## Setup

### Styles

Import the default theme, or create you own:

```ts
import '@cartamd/plugin-emoji/default.css';
```

### Extension

```svelte
<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { emoji } from '@cartamd/plugin-emoji';

	const carta = new Carta({
		extensions: [emoji()]
	});
</script>

<MarkdownEditor {carta} />
```

## Documentation

Checkout the [docs](https://beartocode.github.io/carta/plugins/emoji) for examples, options and more.
