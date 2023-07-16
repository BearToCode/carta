import type { CartaEvent, CartaExtension } from 'carta-md';
import { marked } from 'marked';

export interface TikzExtensionOptions {
	/**
	 * Enables Tikzjax console output.
	 */
	debug?: boolean;
}

export const tikz = (options?: TikzExtensionOptions): CartaExtension => {
	return {
		markedExtensions: [
			{
				extensions: [tikzTokenizer(options)]
			}
		],
		listeners: [['carta-render', generateTikzImages]]
	};
};

const tikzTokenizer = (options?: TikzExtensionOptions): marked.TokenizerAndRendererExtension => {
	return {
		name: 'tikz',
		level: 'block',
		start: (src) => src.indexOf('\n%%'),
		tokenizer: (src) => {
			const match = src.match(/^```tikz+\n([^`]+?)\n```+\n/);
			if (match) {
				return {
					type: 'tikz',
					raw: match[0],
					text: match[1].trim()
				};
			}
		},
		renderer: (token) => `
			<div align="center" class="tikz-generated">
				<script 
					data-show-console="${options?.debug ? 'true' : 'false'}" 
					type="text/tikz"
				>
					${tidyTikzSource(token.raw.slice(8, token.raw.length - 4))}
				</script>
			</div>
			`
	};
};

declare global {
	interface Window {
		tikzjax: boolean | undefined;
	}
}

function generateTikzImages(e: CartaEvent) {
	const carta = e.detail.carta;
	const container = carta.renderer?.container;
	if (!container) {
		console.error(`Failed to process tikz code: cannot find renderer container element.`);
		return;
	}

	removePreviousImages(container);
	loadTikz();
}

function removePreviousImages(container: HTMLDivElement) {
	container.querySelectorAll('.tikz-generated').forEach((elem) => elem.remove());
}

async function loadTikz() {
	if (window.tikzjax != null) return;

	// eslint-disable-next-line
	// @ts-ignore
	const tikzjax = (await import('./assets/tikzjax.js')).default;
	console.log(tikzjax);

	const script = `<script type="text/javascript" id="tikzjax">${tikzjax}</script>`;

	// Simply appending the element does not work as the script is not executed
	// By doing the following we ensure that it is run.
	const range = document.createRange();
	range.selectNode(document.getElementsByTagName('body')[0]);
	const documentFragment = range.createContextualFragment(script);
	document.body.appendChild(documentFragment);

	document.addEventListener('tikzjax-load-finished', postProcessSvg);
}

function tidyTikzSource(tikzSource: string) {
	// Remove non-breaking space characters, otherwise we get errors
	const remove = '&nbsp;';
	tikzSource = tikzSource.replaceAll(remove, '');

	let lines = tikzSource.split('\n');

	// Trim whitespace that is inserted when pasting in code, otherwise TikZJax complains
	lines = lines.map((line) => line.trim());

	// Remove empty lines
	lines = lines.filter((line) => line);

	return lines.join('\n');
}

function postProcessSvg(e: Event) {
	// Todo
	// const svgElem = e.target as HTMLElement;
	// console.log(svgElem);
}
