# Carta Math Plugin

This plugin adds support for **Katex** expressions. Install it using:

```
npm i @cartamd/plugin-math
```

## Setup

### Styles

You need to get access to the katex **stylesheet**,
to do so, you can either install katex using:

```
npm i katex
```

and then adding this import to your app:

```ts
import 'katex/dist/katex.css';
```

or by using a content delivery network:

```html
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css"
	integrity="sha384-3UiQGuEI4TTMaFmGIZumfRPtfKQ3trwQE2JgosJxCnGmQpL/lJdjpcHkaaFwHlcI"
	crossorigin="anonymous"
/>
```

### Extension

```svelte
<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	import { math } from '@cartamd/plugin-math';

	const carta = new Carta({
		extensions: [math()]
	});
</script>

<CartaEditor {carta} />
```

## Usage

Inline:

```
Pythagorean theorem: $a^2+b^2=c^2$
```

Block:

```
$$
{\displaystyle {d^{2}x^{\mu } \over ds^{2}}+\Gamma ^{\mu }{}_{\alpha \beta }{dx^{\alpha } \over ds}{dx^{\beta } \over ds}=0}
$$
```

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
