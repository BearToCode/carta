# Carta TikZ Plugin

This plugin adds support for **PGF/TikZ** illustrations thanks to [TikzJax](https://tikzjax.com/). It uses the code generated for the [Obsidian-TikZ plugin](https://github.com/artisticat1/obsidian-tikzjax). Install it using:

```
npm i @cartamd/plugin-tikz
```

## Important Notes

1. This plugin requires the import of a **heavy** library (~7Mb), which is dynamically imported at runtime;
2. Generated images are **not ssr compatible**, as they are rendered in the browser;
3. You need to update your sanitizer to allow the specific tag: `<div type="text/tikz">`.

## Setup

```svelte
<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	import { tikz } from '@cartamd/plugin-tikz';

	import '@cartamd/plugin-tikz/fonts.css';

	const carta = new Carta({
		extensions: [tikz()]
	});
</script>

<CartaEditor {carta} />
```

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
	 * This also runs on stored html, differently
	 * from `postProcess`, which only runs when
	 * the element is first created.
	 */
	postProcessing?: (html: string) => string;
	/**
	 * Post processing function for rendered SVGs Elem.
	 * @deprecated Use `postProcessing` instead.
	 */
	postProcess?: (elem: SVGElement) => void;
}
```
