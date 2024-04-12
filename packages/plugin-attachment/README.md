# Carta Attachment Plugin

This plugin adds support for attachments. Install it using:

```
npm i @cartamd/plugin-attachment
```

## Setup

### Styles

Import the default theme, or create you own:

```ts
import '@cartamd/plugin-attachment/default.css';
```

### Extension

```svelte
<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { attachment } from '@cartamd/plugin-attachment';

	const carta = new Carta({
		extensions: [
			attachment({
				upload(file) {
					/* ... */
				}
			})
		]
	});
</script>

<MarkdownEditor {carta} />
```

## Documentation

Checkout the [docs](https://beartocode.github.io/carta/plugins/attachment) for examples, options and more.
