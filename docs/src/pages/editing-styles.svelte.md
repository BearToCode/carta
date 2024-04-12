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

By using the `theme` property in the editor you can differentiate the themes of multiple editors.

## Changing Markdown color theme

Carta uses [Shiki](https://shiki.matsu.io/) for syntax highlighting. Two default themes are included in the core package, which are as a [dual theme](https://shiki.matsu.io/guide/dual-themes) used for light and dark mode.

You can change theme in the options:

<Code>

```ts
const carta = new Carta({
	// ...
	theme: 'github-dark'
});
```

</Code>

If you use a [custom theme](https://shiki.matsu.io/guide/load-theme)(or also a custom language), you need to specify it, so that it gets loaded into the highlighter:

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
