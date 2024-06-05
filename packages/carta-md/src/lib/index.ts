export { default as MarkdownEditor } from '$lib/MarkdownEditor.svelte';
export { default as Markdown } from '$lib/Markdown.svelte';
export { default as PreRendered } from '$lib/PreRendered.svelte';
export type { InputEnhancer, TextSelection } from '$lib/internal/input';
export type { Icon } from '$lib/internal/icons';
export type { KeyboardShortcut } from '$lib/internal/shortcuts';
export type { Prefix } from '$lib/internal/prefixes';
export * from '$lib/internal/carta';
export * from '$lib/internal/highlight';
export * from '$lib/internal/textarea-props';
export * from '$lib/internal/labels';
export * from './default.css?inline';

// Legacy
export { default as CartaEditor } from '$lib/MarkdownEditor.svelte';
export { default as CartaViewer } from '$lib/Markdown.svelte';
