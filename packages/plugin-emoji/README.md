# Carta Emoji Plugin

This plugin adds support for **Emojis**. Install it using:

```
npm i @cartamd/plugin-emoji
```

## Setup

### Styles

Import the default theme, or create you own:

```ts
import '@cartamd/plugin-emoji/default-theme.css';
```

### Extension

```svelte
<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	import { emoji } from '@cartamd/plugin-emoji';

	const carta = new Carta({
		extensions: [emoji()]
	});
</script>

<CartaEditor {carta} />
```

## Options

Here are the options you can pass to `emoji()`:

```ts
export interface EmojiExtensionOptions {
	/**
	 * Custom in transition. See https://svelte.dev/docs#run-time-svelte-transition.
	 */
	inTransition?: (node: Element) => TransitionConfig;
	/**
	 * Custom out transition. See https://svelte.dev/docs#run-time-svelte-transition.
	 */
	outTransition?: (node: Element) => TransitionConfig;
}
```
