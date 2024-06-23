export { default as MarkdownEditor } from '$lib/MarkdownEditor.svelte';
export { default as Markdown } from '$lib/Markdown.svelte';
export { default as PreRendered } from '$lib/PreRendered.svelte';

export * from '$lib/core/input';
export * from '$lib/core/icons';
export * from '$lib/core/shortcuts';
export * from '$lib/core/prefixes';
export * from '$lib/core/carta';
export * from '$lib/core/textarea-props';
export * from '$lib/core/labels';

// Only export types from the highlight module
export type * from '$lib/core/highlight';

// Default bundle is the browser one
export { CartaBrowser as Carta } from '$lib/bundle/browser';

// Legacy
export { default as CartaEditor } from '$lib/MarkdownEditor.svelte';
export { default as CartaViewer } from '$lib/Markdown.svelte';
