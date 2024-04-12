---
section: Plugins
title: TikZ
---

<script>
	import Code from '$lib/components/code/Code.svelte';
</script>

This plugin adds support for **PGF/TikZ** illustrations thanks to [TikZJax](https://tikzjax.com/). It uses the code generated for the [Obsidian-TikZ plugin](https://github.com/artisticat1/obsidian-tikzjax).

<Code>

```
npm i @cartamd/plugin-tikz
```

</Code>

## Important Notes

1. This plugin requires the import of a **heavy** library (~7Mb), which is dynamically imported at runtime;
2. Generated images are **not SSR compatible**, as they are rendered in the browser;
3. You need to update your sanitizer to allow the specific tag: `<div type="text/tikz">`.

## Setup

<Code>

```svelte
<script>
	import { Carta, MarkdownEditor } from 'carta-md';
	import { tikz } from '@cartamd/plugin-tikz';
	import '@cartamd/plugin-tikz/fonts.css';

	const carta = new Carta({
		extensions: [tikz()]
	});
</script>

<MarkdownEditor {carta} />
```

</Code>

## Options

Here are the options you can pass to `tikz()`:

```ts
interface TikzExtensionOptions {
	/**
	 * Enables Tikzjax console output.
	 */
	debug?: boolean;
	/**
	 * Class for generated svg div container.
	 */
	class?: string;
	/**
	 * Whether to center the generated expression.
	 * @default true
	 */
	center?: boolean;
	/**
	 * Post processing function for html.
	 * This also runs on stored html.
	 */
	postProcessing?: (html: string) => string;
}
```
