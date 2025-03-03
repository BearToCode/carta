<!--
  @component
  A basic component to render pre-rendered HTML content with a specific theme.
-->

<script lang="ts">
	interface Props {
		html: string;
		theme?: string;
	}

	let { html, theme = 'default' }: Props = $props();
</script>

<div class="carta-viewer carta-theme__{theme} markdown-body">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html html}
</div>
