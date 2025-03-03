import { highlightCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	installation: {
		lang: 'bash',
		code: 'npm i @cartamd/plugin-math'
	},
	katexInstall: {
		lang: 'bash',
		code: 'npm i katex'
	},
	katexImport: {
		lang: 'js',
		code: "import 'katex/dist/katex.css';"
	},
	katexLink: {
		lang: 'html',
		code: deindent`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css"
        integrity="sha384-3UiQGuEI4TTMaFmGIZumfRPtfKQ3trwQE2JgosJxCnGmQpL/lJdjpcHkaaFwHlcI"
        crossorigin="anonymous"
      />`
	},
	extension: {
		lang: 'svelte',
		code: deindent`
      <script lang="ts">
        import { Carta, MarkdownEditor } from 'carta-md';
        import { math } from '@cartamd/plugin-math';

        const carta = new Carta({
          extensions: [math()]
        });
      </script>

      <MarkdownEditor {carta} />`
	},
	usageInline: {
		lang: 'cartamd',
		code: 'Pythagorean theorem: $a^2+b^2=c^2$'
	},
	usageBlock: {
		lang: 'cartamd',
		code: deindent`
      **Laplace** transform:
      $$
        \\mathcal{L}\\{f\\}(s) = \\int_0^{\\infty} {f(t)e^{-st}dt}
      $$`
	},
	options: {
		lang: 'ts',
		code: deindent`
      interface MathExtensionOptions {
        /**
         * Options for inline katex, eg: $a^2+b^2=c^2$
         */
        inline?: {
          /**
           * @default control+m
           */
          shortcut?: Set<string>;
        };
        /**
         * Option for block katex, eg:
         * $$
         * a^2+b^2=c^2
         * $$
         */
        block?: {
          /**
           * @default ctrl+shift+m
           */
          shortcut?: Set<string>;
        };
        /**
         * Options for remark-math
         */
        remarkMath?: RemarkMathOptions;
        /**
         * Options for rehype-katex
         */
        rehypeKatex?: RehypeKatexOptions;
        /**
         * Disable tab outs.
         */
        disableTabOuts?: boolean;
        /**
         * Disable the katex icon.
         */
        disableIcon?: boolean;
      }`
	}
} as const;

export const load = async () => {
	return {
		codeBlocks: await highlightCodeBlocks(codeBlocks)
	};
};
