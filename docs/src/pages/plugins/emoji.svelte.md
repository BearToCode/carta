---
section: Plugins
title: Emoji
---

<script>
	import Code from '$lib/components/code/Code.svelte';
</script>

This plugin adds support for **Emojis**.

## Installation

<Code>

```
npm i @cartamd/plugin-emoji
```

</Code>

## Setup

### Styles

Import the default theme, or create you own:

<Code>

```ts
import '@cartamd/plugin-emoji/default.css';
```

</Code>

### Extension

<Code>

```svelte
<script>
	import { Carta, CartaEditor } from 'carta-md';
	import { emoji } from '@cartamd/plugin-emoji';

	const carta = new Carta({
		extensions: [emoji()]
	});
</script>

<CartaEditor {carta} />
```

</Code>

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
