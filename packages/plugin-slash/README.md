# Carta Slash Plugin

This plugin adds support for **Slash** commands. Install it using:

```
npm i @cartamd/plugin-slash
```

## Setup

### Styles

Import the default theme, or create you own:

```ts
import '@cartamd/plugin-code/default.css';
```

### Extension

```svelte
<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	import { math } from '@cartamd/plugin-math';

	const carta = new Carta({
		extensions: [slash()]
	});
</script>

<CartaEditor {carta} />
```

## Options

Here are the options you can pass to `slash()`:

```ts
export interface SlashExtensionOptions {
	/**
	 * List of default snippets to disable.
	 */
	disableDefaultSnippets?: DefaultSnippetId[] | true;
	/**
	 * Additional snippets.
	 */
	snippets?: SlashSnippet[];
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
