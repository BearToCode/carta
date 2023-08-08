import type { Carta, CartaEvent, CartaExtension } from 'carta-md';
import { TokenizerAndRendererExtension } from 'marked';
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
	 * Post processing function for html.
	 * This also runs on stored html, differently
	 * from `postProcess`, which only runs when
	 * the element is first created.
	 */
	postProcessing?: (html: string) => string;
	/**
	 * Post processing function for rendered SVGs Elem.
	 * @deprecated Use `postProcessing` instead.
	 */
	postProcess?: (elem: SVGElement) => void;
}

let carta: Carta;

/**
 * TikzJax extension for Carta.
 * @param options Tikz options.
 */
export const tikz = (options?: TikzExtensionOptions): CartaExtension => {
	return {
		cartaRef: (c) => (carta = c),
		shjRef: (shj) => {
			import('./tikz')
				.then((module) => shj.loadCustomLanguage('tikz', module))
				.then(() => carta.input?.update());
		},
		markedExtensions: [
			{
				async: true,
				extensions: [tikzTokenizer(options)]
			}
		],
		listeners: [['carta-render', (e) => generateTikzImages(e, options)]]
	};
};

// Keeps track of tikz generation to remove previous items
let currentGeneration = 0;

const tikzTokenizer = (options?: TikzExtensionOptions): TokenizerAndRendererExtension => {
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
			if (typeof document === 'undefined') {
				// Cannot run outside the browser
				return ``;
			}

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
			if (savedSvg) {
				html = savedSvg;
				if (options?.postProcessing) html = options.postProcessing(html);
			} else {
				html = template.outerHTML;
			}

			const sanitizer = carta.options?.sanitizer;
			if (sanitizer) html = sanitizer(html);

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
		const elem = e.target as SVGElement;
		// Support old version
		options?.postProcess && options.postProcess(elem);

		if (options?.postProcessing) elem.outerHTML = options.postProcessing(elem.outerHTML);
	});
}

function tidyTikzSource(tikzSource: string) {
	// From: Obsidian-TikZ plugin, credit to them
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
