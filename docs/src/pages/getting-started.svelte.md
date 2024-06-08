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
	import { Carta, MarkdownEditor } from 'carta-md';
	import 'carta-md/default.css'; /* Default theme */

	const carta = new Carta({
		// Remember to use a sanitizer to prevent XSS attacks!
		// More on that below
		// sanitizer: ...
	});

	let value = '';
</script>

<MarkdownEditor {carta} bind:value />

<style>
	/* Set your custom monospace font */
	:global(.carta-font-code) {
		font-family: '...', monospace;
		font-size: 1.1rem;
	}
</style>
```

</Code>

Or, if you just want to render content:

<Code>

```svelte
<script>
	import { Carta, Markdown } from 'carta-md';

	const carta = new Carta({
		/* ... */
	});

	let value = '...';
</script>

<Markdown {carta} {value} />
```

</Code>

## Sanitization

By default Carta does **not** sanitize user input, which can include malicious code that could lead to [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting). For this reason it is _strongly recommended_ to install a package that handles that for you.

Since Carta operates both on the server and the client, you'd need a sanitizer able to work in both environments, for example [isomorphic-dompurify](https://www.npmjs.com/package/isomorphic-dompurify) or [sanitize-html](https://www.npmjs.com/package/sanitize-html). Here is an example using the former, which requires minimum configuration.

<Code>

```svelte
<script>
	// Your other stuff...
	import DOMPurify from 'isomorphic-dompurify';

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});

	let value = '';
</script>

<MarkdownEditor {carta} bind:value />
```

</Code>

## Pre-rendering

While the `<Markdown>` component is SSR compatible and allows you to pre-render some content on the server, it has some limitations and drawbacks:

1. It cannot render content requiring asynchronous code execution(for example `plugin-code`);
2. For the previous reason, it also needs to render the same markdown on the client. This requires the client to import this library and then render the new HTML, which can slow down the page, especially if you are using different plugins.

This can be avoided by pre-rendering the whole content on the server, which can also be improved further by storing/caching the rendered HTML(this implementation is up to you).

For example, in SvelteKit:

<Code>

```ts
// +page.server.ts

// Path to an server-side static Carta instance
import { carta } from '$lib/path/to/carta';

export const load: PageServerLoad = async () => {
	const markdown = /* ... */;

	const html = await carta.render(markdown);

	return {
		html
	}
}
```

</Code>

<Code>

```svelte
<!-- +page.svelte -->
<script>
	import PreRendered from 'carta-md';

	export let data;
</script>

<PreRendered html={data.html} />
```

</Code>
