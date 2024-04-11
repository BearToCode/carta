---
title: Migration Guide
section: Overview
---

# Major Changes

## Removal of Marked

Marked has been replaced with a combination of Unified, Remark and Rehype. If you previously used a custom plugin with it, you'll have to update it manually. Otherwise, all builtin plugins have already been updated. Make sure to **update** them!

## Syntax highlighter update

SpeedHighlight has been replaced with [Shiki](https://shiki.matsu.io/). It now offers support for more languages, themes, and extensibility.

Make sure to remove previous themes imports, as Shiki uses JS based ones.

```ts
import 'carta-md/light.css'; // 👈 To be removed!
```

And also update the default theme. SHJ based selectors should be removed:

```css
[class*='shj-lang-'] {
	/* 👈 To be removed! */
	/* ... */
}
```

## Removed verbose prefixes

Many exports have been renamed to make them less verbose, here are them:

- `CartaEditor` -> `MarkdownEditor` (old one still supported);
- `CartaRenderer` -> `Markdown` (old one still supported);
- `CartaEvent` -> `Event`;
- `CartaEventType` -> `EventType`;
- `CartaExtension` -> `Extension`;
- `CartaExtensionComponent` -> `ExtensionComponent`;
- `CartaOptions` -> `Options`;
- `CartaHistory` -> `TextAreaHistory`;
- `CartaHistoryOptions` -> `TextAreaHistoryOptions`;
- `CartaIcon` -> `Icon`;
- `CartaListener` -> `Listener`;
- `CartaInput` -> `InputEnhancer`;
- `CartaRenderer` -> `Renderer`;
- `CartaLabels` -> `Labels`;

## Minor Changes

- Removed deprecated option `cartaRef` and `shjRef` for extensions;
- Removed deprecated options `postProcess` for `plugin-tikz`;
- `Carta.options` are no longer available.
