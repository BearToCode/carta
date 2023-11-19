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

Carta uses [Speed Highlight JS](https://github.com/speed-highlight/core) for syntax highlighting. Two default themes are included in the core package, `light.css` and `dark.css`, and others can be found on the Speed Highlight [GitHub](https://github.com/speed-highlight/core/tree/main/src/themes), but you can also easily create your own.

## Markdown stylesheets

Markdown is converted into standard HTML, so you can edit the final styles by using standard CSS rules. If you do not wish to create one from the ground up, you can use some already complete stylesheets, like [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) or [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin).
