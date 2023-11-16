---
title: Getting Started
section: Overview
---

<script>
  import Code from '$lib/components/code/Code.svelte';
</script>

## Installation

Installing the core package:

<Code>

```
npm i carta-md
```

</Code>

Installing plugins:

<Code>

```
npm i @cartamd/plugin-name
```

</Code>

## Setup

Setup a basic editor:

<Code>

```svelte
<script>
	import { Carta, CartaEditor } from 'carta-md';
	import 'carta-md/default.css'; /* Default theme */
	import 'carta-md/light.css'; /* Markdown input theme */

	const carta = new Carta({
		// Remember to use a sanitizer to prevent XSS attacks!
		// More on that below
		// sanitizer: ...
	});

	let value = '';
</script>

<CartaEditor {carta} bind:value />

<style>
	/* Set your custom monospace font */
	:global(.carta-font-code) {
		font-family: '...', monospace;
	}
</style>
```

Or, if you just want to render content:

```svelte
<script>
	import { Carta, CartaViewer } from 'carta-md';

	const carta = new Carta({
		/* ... */
	});

	let value = '...';
</script>

<CartaViewer {carta} {value} />
```

</Code>

## Sanitization

By default Carta does **not** sanitize user input, which can include malicious code that could lead to [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting). For this reason it is _strongly recommended_ to install a package that handles that for you.

Since Carta operates both on the server and the client, you'd need a sanitizer able to work in both environments, for example [isomorphic-dompurify](https://www.npmjs.com/package/isomorphic-dompurify) or [sanitize-html](https://www.npmjs.com/package/sanitize-html). Here is an example using the former, which requires minimum configuration.

<Code>

```svelte
<script>
	// Your other stuff...
	import { sanitize } from 'isomorphic-dompurify';

	const carta = new Carta({
		sanitizer: sanitize
	});

	let value = '';
</script>

<CartaEditor {carta} bind:value />
```

</Code>
