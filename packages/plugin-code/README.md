# Carta Code Plugin

This plugin adds support for code blocks **syntax highlighting**. It uses the same highlighter from the core package(Shiki).

```
npm i @cartamd/plugin-code
```

## Setup

### Styles

Import the default styles:

```ts
import '@cartamd/plugin-code/default.css';
```

### Using the default highlighter

Carta comes with a default highlighter that matches the one used to highlight markdown in the editor and is used by default (Shiki). If you want to use a theme different from the one used to highlight Markdown, you can specify it in the options. Remember to also have it loaded into the highlighter, by specifying it in `shikiOptions`.

```ts
const carta = new Carta({
	// ...
	extensions: [
		code({
			theme: 'ayu-light'
		})
	],
	shikiOptions: {
		themes: ['ayu-light']
	}
});
```

### Using a custom highlighter

It is no longer possible to specify a custom highlighter in this plugin. However, there are many different [Remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins) that provide syntax highlighting.

### Extension

```svelte
<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { code } from '@cartamd/plugin-code';

	const carta = new Carta({
		extensions: [code()]
	});
</script>

<MarkdownEditor {carta} />
```

## Documentation

Checkout the [docs](https://beartocode.github.io/carta/plugins/code) for examples, options and more.
