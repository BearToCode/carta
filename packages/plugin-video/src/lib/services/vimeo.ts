import type { VideoExtensionOptions } from '$lib/types';
import { getGenericIframeHtml } from '$lib/utils';

/**
 * Get the Vimeo video ID from a Vimeo video URL or ID.
 * @param videoIdOrUrl  Vimeo video URL or ID
 * @returns  Vimeo video ID
 */
function getVideoId(videoIdOrUrl: string): string {
	const vimeoRegex =
		/(?:http:|https:)?\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/;
	const match = videoIdOrUrl.match(vimeoRegex);
	return match && typeof match[3] === 'string' ? match[3] : videoIdOrUrl;
}

/**
 * Render a Vimeo video in an iframe.
 * @param videoIdOrUrl  Vimeo video URL or ID
 * @param options  Vimeo options
 * @returns  HTML string
 */
export function render(videoIdOrUrl: string, options: VideoExtensionOptions): string {
	const videoId = getVideoId(videoIdOrUrl);
	const url = `https://player.vimeo.com/video/${videoId}`;

	return getGenericIframeHtml(url, options);
}
