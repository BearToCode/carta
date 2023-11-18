---
section: API
title: Utilities
---

## `Carta.render`

Allows you to render Markdown asynchronously.

```ts
const carta = new Carta({
	/* ... */
});
const markdown = '# Some Markdown';
const html = await carta.render(markdown);
```

## `Carta.renderSSR`

Allows you to render Markdown synchronously, suitable for Server Side Rendering. Note that particular extensions that add content asynchronously will not work in this configuration.

```ts
const carta = new Carta({
	/* ... */
});
const markdown = '# Some Markdown';
const html = carta.renderSSR(markdown);
```

## `Carta.bindToCaret`

Svelte action that allows you to bind a specific element to the caret position. Used, for example, in `plugin-emoji` and `plugin-slash`.

```svelte
<script>
	export let carta;
</script>

<div use:carta.bindToCaret>
	<!-- ... -->
</div>
```
