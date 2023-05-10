# Carta Emoji Plugin

This plugin adds support for code blocks **syntax highlighting**. Install it using:

```
npm i @cartamd/plugin-code
```

This is done using [Speed-highlight JS](https://github.com/speed-highlight/core), which supports dynamic imports. This way, languages definitions are only imported at the moment of need.

## Setup

### Styles

Import the default theme:

```ts
import '@cartamd/plugin-code/default.css';
```

[Here](https://github.com/speed-highlight/core/tree/main/src/themes) you can find other themes, but the default one is still required.

### Extension

```svelte
<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	import { code } from '@cartamd/plugin-code';

	const carta = new Carta({
		extensions: [code()]
	});
</script>

<CartaEditor {carta} />
```

## Options

Here are the options you can pass to `code()`:

```ts
interface CodeExtensionOptions {
	/**
	 * Default language when none is provided.
	 */
	defaultLanguage?: string;
	/**
	 * Whether to autodetect a language when none is provided.
	 * Overwritten by `defaultLanguage`.
	 */
	autoDetect?: string;
	/**
	 * Line numbering.
	 * @defaults false.
	 */
	lineNumbering?: boolean;
}
```
