---
section: Plugins
title: Math
---

<script>
  import Code from '$lib/components/code/Code.svelte';
  import { CartaViewer, Carta } from 'carta-md';
  import { math } from '@cartamd/plugin-math';
  import 'katex/dist/katex.css';

  const carta = new Carta({
    extensions: [math()]
  })
  export let inline = "$a^2+b^2=c^2$";
  export let block = `
$$
\\mathcal{L}\\{f\\}(s) = \\int_0^{\\infty} {f(t)e^{-st}dt}
$$
`;
</script>

This plugins adds support for [KaTeX](https://katex.org/) expressions.

## Installation

<Code>

```
npm i @cartamd/plugin-math
```

</Code>

## Setup

### Styles

You need to get access to the katex **stylesheet**,
to do so, you can either install katex using:

<Code>

```
npm i katex
```

</Code>

and then adding this import to your app:

<Code>

```ts
import 'katex/dist/katex.css';
```

</Code>

or by using a content delivery network:

<Code>

```html
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css"
	integrity="sha384-3UiQGuEI4TTMaFmGIZumfRPtfKQ3trwQE2JgosJxCnGmQpL/lJdjpcHkaaFwHlcI"
	crossorigin="anonymous"
/>
```

</Code>

### Extension

<Code>

```svelte
<script>
	import { Carta, CartaEditor } from 'carta-md';
	import { math } from '@cartamd/plugin-math';

	const carta = new Carta({
		extensions: [math()]
	});
</script>

<CartaEditor {carta} />
```

</Code>

## Usage

Inline:

<Code>

```
Pythagorean theorem: $a^2+b^2=c^2$
```

</Code>

<CartaViewer {carta} value={inline} />

<br>

Block:

<Code>

```
$$
  \\mathcal{L}\\{f\\}(s) = \\int_0^{\\infty} {f(t)e^{-st}dt}
$$
```

</Code>

<CartaViewer {carta} value={block} />

## Options

Here are the options you can pass to `math()`:

```ts
interface MathExtensionOptions {
	/**
	 * Options for inline katex, eg: $a^2+b^2=c^2$
	 */
	inline?: {
		katexOptions?: KatexOptions;
		/**
		 * @default control+m
		 */
		shortcut?: Set<string>;
	};
	/**
	 * Option for block katex, eg:
	 * $$
	 * a^2+b^2=c^2
	 * $$
	 */
	block?: {
		/**
		 * Tag the generated katex will be put into. Must have `display: block`.
		 */
		tag?: string;
		/**
		 * Whether to center the generated expression.
		 * @default true
		 */
		center?: boolean;
		/**
		 * Class for generated katex.
		 */
		class?: string;
		/**
		 * @default ctrl+shift+m
		 */
		shortcut?: Set<string>;
		katexOptions?: KatexOptions;
	};
```
