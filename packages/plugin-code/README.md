# Carta Code Plugin

This plugin adds support for code blocks **syntax highlighting**. Install it using:

```
npm i @cartamd/plugin-code
```

This is done using [Speed-highlight JS](https://github.com/speed-highlight/core), which supports dynamic imports. This way, languages definitions are only imported at the moment of need.

## Setup

### Styles

Import the default styles:

```ts
import '@cartamd/plugin-code/default.css';
```

### Using the default highlighter

Carta comes with a default highlighter that matches the one used to highlight markdown in the editor and is used by default.
The theme is the same as the one used in the main carta package (`carta-md/light.css` or `carta-md/dark.css`).
[Here](https://github.com/speed-highlight/core/tree/main/src/themes) you can find other themes.

### Using a custom highlighter

You can also provide a custom highlighter, that can be either sync or async.

```ts
code({
	customHighlight: {
		highlighter: (code, lang) => myCustomHighlighter(code, lang),
		langPrefix: 'my-highlighter-'
	}
});
```

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
