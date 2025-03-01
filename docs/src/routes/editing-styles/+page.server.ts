import { highlightCodeBlocks, type RegisteredCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	structure: {
		lang: 'html',
		code: deindent`
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
    </div>`
	},
	darkMode: {
		lang: 'css',
		code: deindent`
      /* Editor dark mode */
      /* Only if you are using the default theme */
      html.dark .carta-theme__default {
        --border-color: var(--border-color-dark);
        --selection-color: var(--selection-color-dark);
        --focus-outline: var(--focus-outline-dark);
        --hover-color: var(--hover-color-dark);
        --caret-color: var(--caret-color-dark);
        --text-color: var(--text-color-dark);
      }

      /* Code dark mode */
      /* Only if you didn't specify a custom code theme */
      html.dark .shiki,
      html.dark .shiki span {
        color: var(--shiki-dark) !important;
      }
    `
	},
	highlightTheme: {
		lang: 'ts',
		code: deindent`
      const carta = new Carta({
        // ...
        theme: 'github-dark'
      });`
	},
	shikiOptions: {
		lang: 'ts',
		code: deindent`
    const carta = new Carta({
      // ...
      shikiOptions: {
        langs: // ...
        themes: // ...
      }
    });`
	}
} as const as RegisteredCodeBlocks;

export const load = async () => {
	return {
		codeBlocks: await highlightCodeBlocks(codeBlocks)
	};
};
