import type { VideoExtensionOptions } from './types';

function isUrl(url: string): boolean {
	return /^(http|https):\/\/[^ "]+$/.test(url);
}

export function getSearchParams(url: string): Map<string, string> {
	if (!isUrl(url)) {
		return new Map();
	}

	const parsed = new URL(url);
	const params: Map<string, string> = new Map();

	for (const [key, value] of parsed.searchParams) {
		params.set(key, value);
	}

	return params;
}

/**
 * Common HTML for all video services, if one service need a different HTML, it should be implemented in the service.
 * @param url Embed URL
 * @param options Video options
 * @returns HTML string
 */
export function getGenericIframeHtml(url: string, options: VideoExtensionOptions): string {
	return `
	<div class="video-container ${options.align}">
		<iframe 
				width="${options.width}" 
				height="${options.height}" 
				src="${url}" 
				frameborder="0" 
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
				${options.allowFullscreen ? 'allowfullscreen' : ''}>
		</iframe>
	</div>
	`;
}
