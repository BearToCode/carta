<script lang="ts">
	let className = '';
	let theme: 'light' | 'dark' = 'light';

	export { className as class };
</script>

<button
	class="{className} {theme}"
	on:click={() => {
		if (theme === 'light') {
			document.documentElement.classList.add('dark');
			theme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			theme = 'light';
		}
	}}
>
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
		<path
			fill="currentColor"
			d="M235.54 150.21a104.84 104.84 0 0 1-37 52.91A104 104 0 0 1 32 120a103.09 103.09 0 0 1 20.88-62.52a104.84 104.84 0 0 1 52.91-37a8 8 0 0 1 10 10a88.08 88.08 0 0 0 109.8 109.8a8 8 0 0 1 10 10Z"
		/>
	</svg>
</button>

<style>
	button {
		aspect-ratio: 1;
		display: flex;
		justify-content: center;
		align-items: center;

		background: none;
		border: 1px solid #b9b9b9;
		border-radius: 4px;

		font-size: 1.5rem;

		cursor: pointer;
	}

	button.dark {
		color: #fff;
		border-color: #4d4d4c;
	}

	:global(html.dark) {
		background: #1b1b1f;
	}

	:global(html.dark .markdown-body) {
		color: #fff;
	}

	/* Editor dark mode */

	:global(html.dark .carta-theme__default) {
		--border-color: var(--border-color-dark);
		--selection-color: var(--selection-color-dark);
		--focus-outline: var(--focus-outline-dark);
		--hover-color: var(--hover-color-dark);
		--caret-color: var(--caret-color-dark);
		--text-color: var(--text-color-dark);
	}

	/* Code dark mode */

	:global(html.dark .shiki),
	:global(html.dark .shiki span) {
		color: var(--shiki-dark) !important;
	}
</style>
