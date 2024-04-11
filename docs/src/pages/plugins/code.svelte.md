---
section: Plugins
title: Code
---

<script>
	import Code from '$lib/components/code/Code.svelte';
</script>

This plugin adds support for code blocks **syntax highlighting**. It uses the same highlighter from the core package(Shiki).

## Installation

<Code>

```
npm i @cartamd/plugin-code
```

</Code>

## Setup

### Styles

Import the default styles:

<Code>

```ts
import '@cartamd/plugin-code/default.css';
```

</Code>

### Using the default highlighter

Carta comes with a default highlighter that matches the one used to highlight markdown in the editor and is used by default (Shiki). If you want to use a theme different from the one used to highlight Markdown, you can specify it in the options.

<Code>

```ts
const carta = new Carta({
	// ...
	extensions: [
		code({
			theme: 'ayu-light'
		})
	]
});
```

</Code>

### Using a custom highlighter

It is no longer possible to specify a custom highlighter in this plugin. However, there are many different [Remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins) that provide syntax highlighting.

### Extension

<Code>

```svelte
<script>
	import { Carta, MarkdownEditor } from 'carta-md';
	import { code } from '@cartamd/plugin-code';

	const carta = new Carta({
		extensions: [code()]
	});
</script>

<MarkdownEditor {carta} />
```

</Code>

## Options

The options you can pass to `code()` extend the ones provided by [Shiki](https://shiki.matsu.io/guide/transformers).
