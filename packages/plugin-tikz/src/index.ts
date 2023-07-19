import { Carta, type CartaEvent, type CartaExtension } from 'carta-md';
import { marked } from 'marked';

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
	import('./tikz').then((module) => Carta.loadCustomLanguage('tikz', module));

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
		renderer: (token) => {
			const center = options?.center ?? true;
			return `
			<div
				${center ? 'align="center"' : ''}
				class="tikz-generated ${options?.center ?? ''}"
			>
				<script 
					data-show-console="${options?.debug ? 'true' : 'false'}" 
					type="text/tikz"
				>
					${tidyTikzSource(token.raw.slice(8, token.raw.length - 4))}
				</script>
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

function postProcessSvg(e: Event) {
	// Todo
	// const svgElem = e.target as HTMLElement;
	// console.log(svgElem);
}
