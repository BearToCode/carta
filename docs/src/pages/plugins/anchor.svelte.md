---
section: Plugins
title: Anchor
---

<script>
	import Code from '$lib/components/code/Code.svelte';
</script>

This plugin adds `id` attributes and permalinks to headings.

## Installation

<Code>

```
npm i @cartamd/plugin-anchor
```

</Code>

## Setup

### Styles

Import the default theme, or create you own:

<Code>

```ts
import '@cartamd/plugin-anchor/default.css';
```

</Code>

### Extension

<Code>

```svelte
<script>
	import { Carta, MarkdownEditor } from 'carta-md';
	import { anchor } from '@cartamd/plugin-anchor';

	const carta = new Carta({
		extensions: [anchor()]
	});
</script>

<MarkdownEditor {carta} />
```

</Code>

## Options

Here are the options you can pass to `anchor()`:

```ts
export interface AnchorExtensionOptions {
	/**
	 * rehype-slug options.
	 */
	slug?: SlugOptions;
	/**
	 * rehype-autolink-headings options.
	 */
	autolink?: AutolinkOptions;
}
```
