# Carta TikZ Plugin

This plugin adds support for **PGF/TikZ** illustrations thanks to [TikzJax](https://tikzjax.com/). This plugins uses the code generated for the [Obsidian-TikZ plugin](https://github.com/artisticat1/obsidian-tikzjax). Install it using:

```
npm i @cartamd/plugin-tikz
```

## Important Notes

1. This plugin requires the import of a **heavy** library (~7Mb), which dynamically imported at run time;
2. Generated images are **not ssr compatible**, as they are rendered in the browser;
3. You need to update your sanitizer to allow the specific tag: `<script type="text/tikz">`.

## Setup

```svelte
<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	import { tikz } from '@cartamd/plugin-tikz';

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
}
```
