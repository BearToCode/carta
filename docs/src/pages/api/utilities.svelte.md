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

## `Carta.highlighter`

Get the Shiki highlighter.

```ts
const highlighter = await carta.highlighter();
const userTheme = carta.theme;
```

Here are some other highlight related utilities:

### `isBundleLanguage`

Checks if a language is a bundled language.

```ts
export const isBundleLanguage = (lang: string): lang is BundledLanguage;
```

### `isBundleTheme`

Checks if a theme is a bundled theme.

```ts
export const isBundleTheme = (theme: string): theme is BundledTheme;
```

### `isDualTheme`

Checks if a theme is a dual theme.

```ts
export const isDualTheme = (theme: Theme | DualTheme): theme is DualTheme;
```

### `isSingleTheme`

```ts
export const isSingleTheme = (theme: Theme | DualTheme): theme is Theme;
```

### `isThemeRegistration`

Checks if a theme is a theme registration.

```ts
export const isThemeRegistration = (theme: Theme): theme is ThemeRegistration;
```
