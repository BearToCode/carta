import { highlightCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	installation: {
		lang: 'bash',
		code: 'npm i @cartamd/plugin-code'
	},
	styles: {
		lang: 'js',
		code: "import '@cartamd/plugin-code/default.css';"
	},
	defaultHighlighter: {
		lang: 'ts',
		code: deindent`
      const carta = new Carta({
        // ...
        extensions: [
          code({
            theme: 'ayu-light'
          })
        ]
      });`
	},
	extension: {
		lang: 'svelte',
		code: deindent`
      <script>
        import { Carta, MarkdownEditor } from 'carta-md';
        import { code } from '@cartamd/plugin-code';

        const carta = new Carta({
          extensions: [code()]
        });
      </script>

      <MarkdownEditor {carta} />`
	}
} as const;

export const load = async () => {
	return {
		codeBlocks: await highlightCodeBlocks(codeBlocks)
	};
};
