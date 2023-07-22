import { loadCustomLanguage, type CartaEvent, type CartaExtension } from 'carta-md';
import { marked } from 'marked';
import md5 from 'md5';

interface TikzExtensionOptions {
	/**
	 * Enables Tikzjax console output.
	 */
	debug?: boolean;
	/**
	 * Class for generated svg div container.
	 */
	class?: string;
	/**
	 * Whether to center the generated expression.
	 * @default true
	 */
	center?: boolean;
}

/**
 * TikzJax extension for Carta.
 * @param options Tikz options.
 */
export const tikz = (options?: TikzExtensionOptions): CartaExtension => {
	import('./tikz').then((module) => loadCustomLanguage('tikz', module));

	return {
		markedExtensions: [
			{
				extensions: [tikzTokenizer(options)]
			}
		],
		listeners: [['carta-render', generateTikzImages]]
	};
};

// Keeps track of tikz generation to remove previous items
let currentGeneration = 0;

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
		renderer: (token) => {
			const script = document.createElement('script');

			const center = options?.center ?? true;
			script.setAttribute('type', 'text/tikz');
			if (options?.debug) script.setAttribute('data-show-console', 'true');
			script.innerHTML = tidyTikzSource(token.raw.slice(8, token.raw.length - 4));

			// Try accessing cached HTML
			const hash = md5(JSON.stringify(script.dataset) + script.childNodes[0].nodeValue);
			const savedSvg = window.localStorage.getItem(hash);

			let html: string;
			if (savedSvg) html = savedSvg;
			else html = script.outerHTML;

			return `
			<div
				${center ? 'align="center"' : ''}
				class="tikz-generated ${options?.class ?? ''}"
				tikz-generation="${currentGeneration}"
			>
				${html}
			</div>
			`;
		}
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

	currentGeneration++;
	removePreviousImages(container);
	loadTikz();
}

function removePreviousImages(container: HTMLDivElement) {
	Array.from(container.querySelectorAll('.tikz-generated[tikz-generation]'))
		.filter((elem) => Number(elem.getAttribute('tikz-generation') ?? -1) < currentGeneration)
		.forEach((elem) => elem.remove());
}

async function loadTikz() {
	if (window.tikzjax != null) return;

	// eslint-disable-next-line
	// @ts-ignore
	const tikzjax = (await import('./assets/tikzjax.js')).default;

	const script = `<script type="text/javascript" id="tikzjax">${tikzjax}</script>`;

	// Simply appending the element does not work as the script is not executed
	// By doing the following we ensure that it is run.
	const range = document.createRange();
	range.selectNode(document.getElementsByTagName('body')[0]);
	const documentFragment = range.createContextualFragment(script);
	document.body.appendChild(documentFragment);

	// document.addEventListener('tikzjax-load-finished', postProcessSvg);
}

function tidyTikzSource(tikzSource: string) {
	// FROM: OBSIDIAN-TIKZ, CREDIT TO THEM
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

// function postProcessSvg(e: Event) {
// Todo
// const svgElem = e.target as HTMLElement;
// console.log(svgElem);
// }
