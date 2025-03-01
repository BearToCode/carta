import { highlightCodeBlocks, type RegisteredCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	installation: {
		lang: 'bash',
		code: `npm install carta-md`
	},
	installingPlugins: {
		lang: 'bash',
		code: `npm install @cartamd/plugin-name`
	},
	basicEditor: {
		lang: 'svelte',
		code: deindent`
      <script lang="ts">
        import { Carta, MarkdownEditor } from 'carta-md';
        import 'carta-md/default.css'; /* Default theme */

        const carta = new Carta({
          // Remember to use a sanitizer to prevent XSS attacks!
          // More on that below
          // sanitizer: ...
        });

        let value = $state('');
      </script>

      <MarkdownEditor {carta} bind:value />

      <style>
        /* Set your monospace font  */
        /* Required to have the editor working correctly! */
        :global(.carta-font-code) {
          font-family: '...', monospace;
          font-size: 1.1rem;
          line-height: 1.1rem;
          letter-spacing: normal;
        }
      </style>`
	},
	contentOnly: {
		lang: 'svelte',
		code: deindent`
    <script lang="ts">
      import { Carta, Markdown } from 'carta-md';

      const carta = new Carta({
        /* ... */
      });

      let value = '...';
    </script>

    <Markdown {carta} {value} />`
	},
	reactive: {
		lang: 'svelte',
		code: deindent`
      {#key value}
        <Markdown {carta} {value} />
      {/key}`
	},
	purify: {
		lang: 'svelte',
		code: deindent`
    <script>
      // Your other stuff...
      import DOMPurify from 'isomorphic-dompurify';

      const carta = new Carta({
        sanitizer: DOMPurify.sanitize
      });

      let value = '';
    </script>

    <MarkdownEditor {carta} bind:value />`
	},
	preRenderingServer: {
		lang: 'ts',
		code: deindent`
    // +page.server.ts

    // Path to a server-side static Carta instance
    import { carta } from '$lib/path/to/carta';

    export const load: PageServerLoad = async () => {
      const markdown = /* ... */;

      const html = await carta.render(markdown);

      return {
        html
      }
    }`
	},
	preRenderingClient: {
		lang: 'svelte',
		code: deindent`
    <!-- +page.svelte -->
    <script lang="ts">
      import PreRendered from 'carta-md';

      let data = $props();
    </script>

    <PreRendered html={data.html} />`
	}
} as const satisfies RegisteredCodeBlocks;

export const load = async () => {
	return {
		codeBlocks: await highlightCodeBlocks(codeBlocks)
	};
};
