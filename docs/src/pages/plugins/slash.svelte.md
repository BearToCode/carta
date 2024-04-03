---
section: Plugins
title: Slash
---

<script>
	import Code from '$lib/components/code/Code.svelte';
</script>

This plugin adds support for **Slash** commands.

## Installation

<Code>

```
npm i @cartamd/plugin-slash
```

</Code>

## Setup

### Styles

Import the default theme, or create you own:

<Code>

```ts
import '@cartamd/plugin-slash/default.css';
```

</Code>

### Extension

<Code>

```svelte
<script>
	import { Carta, MarkdownEditor } from 'carta-md';
	import { slash } from '@cartamd/plugin-slash';

	const carta = new Carta({
		extensions: [slash()]
	});
</script>

<MarkdownEditor {carta} />
```

</Code>

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
