import { highlightCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	installation: {
		lang: 'bash',
		code: 'npm i @cartamd/plugin-component'
	},
	sampleComponent: {
		lang: 'svelte',
		code: deindent`
      <!-- Image.svelte -->
      <script>
        export let src;
        export let alt;
      </script>

      <!-- Your custom component... -->
      <img {src} {alt} />`
	},
	extension: {
		lang: 'ts',
		code: deindent`
			import { Carta } from 'carta-md';
			import { component } from '@cartamd/plugin-component';
			import { svelte, initializeComponents } from '@cartamd/plugin-component/svelte';
			import Image from './Image.svelte';

			const mapped = [svelte('img', Image) /* other components ... */];

			const carta = new Carta({
				extensions: [component(mapped, initializeComponents)]
				// ...
			});`
	},
	customLogic: {
		lang: 'ts',
		code: deindent`
			import { svelteCustom } from '@cartamd/plugin-component/svelte';
			import MyComponent from '...';

			const mapped = [
				svelteCustom(
					'my-component-id',
					(node) => {
						// Do something with the node to determine whether to replace it
					},
					MyComponent
				) /* other components ... */
			];`
	},
	slot: {
		lang: 'svelte',
		code: deindent`
			<!-- Heading.svelte -->
			<script>
				import { Slot } from '@cartamd/plugin-component/svelte';
			</script>

			<h1>
				<Slot />
			</h1>`
	},
	preRendered: {
		lang: 'svelte',
		code: deindent`
			<script>
				import { initializeComponents } from '@cartamd/plugin-component/svelte';
				import { onMount } from 'svelte';
				// ...

				export let data;

				let container;

				// Needs access to the mapped components
				const mapped = [
					/* ... */
				];

				onMount(() => {
					initializeComponents(mapped, container);
				});
			</script>

			<div bind:this={container}>
				<PreRendered html={data.html} />
			</div>`
	}
} as const;

export const load = async () => {
	return {
		codeBlocks: await highlightCodeBlocks(codeBlocks)
	};
};
