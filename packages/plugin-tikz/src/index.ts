import type { CartaEvent, CartaExtension } from 'carta-md';
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
	/**
	 * Post processing function for rendered SVGs.
	 */
	postProcess?: (elem: SVGElement) => void;
}

let sanitizer: ((html: string) => string) | undefined;

/**
 * TikzJax extension for Carta.
 * @param options Tikz options.
 */
export const tikz = (options?: TikzExtensionOptions): CartaExtension => {
	return {
		cartaRef: (carta) => (sanitizer = carta.options?.sanitizer),
		shjRef: (shj) => {
			import('./tikz').then((module) => shj.loadCustomLanguage('tikz', module));
		},
		markedExtensions: [
			{
				extensions: [tikzTokenizer(options)]
			}
		],
		listeners: [['carta-render', (e) => generateTikzImages(e, options)]]
	};
};

// Keeps track of tikz generation to remove previous items
let currentGeneration = 0;

const tikzTokenizer = (options?: TikzExtensionOptions): marked.TokenizerAndRendererExtension => {
	return {
		name: 'tikz',
		level: 'block',
		start: (src) => src.indexOf('\n```tikz'),
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
			const template = document.createElement('div');

			const center = options?.center ?? true;
			template.setAttribute('type', 'tikzjax');
			if (options?.debug) template.setAttribute('data-show-console', 'true');

			const text = document.createTextNode(
				tidyTikzSource(token.raw.slice(8, token.raw.length - 4))
			);
			template.appendChild(text);

			// Try accessing cached HTML
			const hash = md5(JSON.stringify(template.dataset) + template.childNodes[0].nodeValue);
			const savedSvg = window.localStorage.getItem(hash);

			let html: string;
			if (savedSvg) html = savedSvg;
			else html = template.outerHTML;

			return `
			<div
				${center ? 'align="center"' : ''}
				class="tikz-generated ${options?.class ?? ''}"
				tikz-generation="${currentGeneration}"
			>
				${sanitizer ? sanitizer(html) : html}
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

function generateTikzImages(e: CartaEvent, options?: TikzExtensionOptions) {
	const carta = e.detail.carta;
	const container = carta.renderer?.container;
	if (!container) {
		console.error(`Failed to process tikz code: cannot find renderer container element.`);
		return;
	}

	currentGeneration++;
	removePreviousImages(container);
	loadTikz(options);
}

function removePreviousImages(container: HTMLDivElement) {
	Array.from(container.querySelectorAll('.tikz-generated[tikz-generation]'))
		.filter((elem) => Number(elem.getAttribute('tikz-generation') ?? -1) < currentGeneration)
		.forEach((elem) => elem.remove());
}

async function loadTikz(options?: TikzExtensionOptions) {
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

	document.addEventListener('tikzjax-load-finished', (e) => {
		options?.postProcess && options.postProcess(e.target as SVGElement);
	});
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
