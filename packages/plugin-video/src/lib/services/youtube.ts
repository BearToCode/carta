import type { VideoExtensionOptions } from '$lib/types';
import { getGenericIframeHtml, getSearchParams } from '$lib/utils';

/**
 * Get the YouTube video ID from a YouTube video URL or ID.
 * @param videoIdOrUrl  YouTube video URL or ID
 * @returns  YouTube video ID
 */
function getVideoId(videoIdOrUrl: string): string {
	const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	const match = videoIdOrUrl.match(regex);
	return match && match[7].length === 11 ? match[7] : videoIdOrUrl;
}

/**
 * Render a YouTube video in an iframe.
 * @param videoIdOrUrl YouTube video URL or ID
 * @param options YouTube options
 * @returns HTML string
 */
export function render(videoIdOrUrl: string, options: VideoExtensionOptions): string {
	const videoId = getVideoId(videoIdOrUrl);
	const parameters = getSearchParams(videoIdOrUrl);

	// Start time parameter can have the format t=0m10s or t=<time_in_seconds> in share URLs,
	// but in embed URLs the parameter must be called 'start' and time must be in seconds
	const t = parameters.get('t');
	if (t !== undefined) {
		// In case of t=0m10s
		let match = t.match(/^(?:(\d+)m)?(\d+)s$/);
		if (match) {
			const minutes = match[1] ? parseInt(match[1]) : 0;
			const seconds = parseInt(match[2]);
			const time = minutes * 60 + seconds;
			parameters.set('start', time.toString());
		}

		// In case of t=<time_in_seconds>
		match = t.match(/^(\d+)$/);
		if (match) {
			const time = parseInt(match[1]);
			parameters.set('start', time.toString());
		}
	}

	parameters.delete('t');
	parameters.delete('v');
	parameters.delete('feature');
	parameters.delete('origin');

	const params = new URLSearchParams(Object.fromEntries(parameters));

	const host = options.noCookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';
	const url = `${host}/embed/${videoId}?${params.toString()}`;

	return getGenericIframeHtml(url, options);
}
