---
title: Editing Styles
section: Overview
---

<script>
  import Code from '$lib/components/code/Code.svelte';
</script>

## Customizing editor styles

While the core styles are embedded in the Svelte components, the others can be set in a custom stylesheet. Here is what the final rendered HTML looks like.

<Code>

```html
<div class="carta-editor carta-theme__<theme>">
	<div class="carta-toolbar">
		<div class="carta-toolbar-left">
			<!-- ... -->
		</div>
		<div class="carta-toolbar-right">
			<button class="carta-icon"><!-- ... --></button>
			<!-- Other icons -->
		</div>
	</div>

	<div class="carta-wrapper">
		<div class="carta-container mode-<split|tabs>">
			<div class="carta-input-wrapper">
				<pre class="carta-font-code"><!-- ... --></pre>
				<textarea class="carta-font-code" id="md" />
			</div>
			<div class="carta-renderer">
				<!-- Rendered Markdown -->
			</div>
		</div>
	</div>
</div>
```

</Code>

### Using multiple themes

By using the `theme` property in `<MarkdownEditor>` you can differentiate the themes of multiple editors.

## Dark mode

When using dark mode, there are two different themes that have to be changed: the editor theme and the one used for syntax highlighting:

<Code>

```css
/* Editor dark mode */
/* Only if you are using the default theme */
html.dark .carta-theme__default {
	--border-color: var(--border-color-dark);
	--selection-color: var(--selection-color-dark);
	--focus-outline: var(--focus-outline-dark);
	--hover-color: var(--hover-color-dark);
	--caret-color: var(--caret-color-dark);
	--text-color: var(--text-color-dark);
}

/* Code dark mode */
/* Only if you didn't specify a custom code theme */
html.dark .shiki,
html.dark .shiki span {
	color: var(--shiki-dark) !important;
}
```

</Code>

## Changing Markdown input color theme

Carta uses [Shiki](https://shiki.matsu.io/) for syntax highlighting. Two default themes are included in the core package, which are set as a [dual theme](https://shiki.matsu.io/guide/dual-themes) to support light and dark mode. If you plan to use a custom one with light/dark modes, make sure to use a dual theme as well.

You can change theme in the options:

<Code>

```ts
const carta = new Carta({
	// ...
	theme: 'github-dark'
});
```

</Code>

If you use a [custom theme](https://shiki.matsu.io/guide/load-theme)(or a custom language), you need to provide it inside the options, so that it gets loaded into the highlighter:

<Code>

```ts
const carta = new Carta({
	// ...
	shikiOptions: {
		langs: // ...
		themes: // ...
	}
})
```

</Code>

## Markdown stylesheets

Markdown is converted into standard HTML, so you can edit the final styles by using standard CSS rules. If you do not wish to create one from the ground up, you can use some already complete stylesheets, like [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) or [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin).
