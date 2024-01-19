// Process @[youtube](youtubeVideoID)
// Process @[vimeo](vimeoVideoID)

import type { CartaExtension } from 'carta-md';
import { merge } from 'lodash';
import type { TokenizerAndRendererExtension } from 'marked';
import VideoIcon from './components/icons/VideoIcon.svelte';
import type { VideoExtensionOptions, VideoService } from './types';
import { renderVideo } from './video-parser';

export * from './default.css?inline';
export * from './types';

const defaultOptions: VideoExtensionOptions = {
	noCookie: false,
	width: 640,
	height: 360,
	align: 'center',
	allowFullscreen: true
};

/**
 * Carta video plugin. Adds support to render embedded video.
 */
export const video = (options?: VideoExtensionOptions): CartaExtension => {
	const finalOptions = merge({}, defaultOptions, options);

	return {
		markedExtensions: [
			{
				extensions: [videoTokenizerAndRenderer(finalOptions)]
			}
		],
		icons: [
			{
				id: 'video',
				action: (input) => {
					const selection = input.getSelection();
					const videoTag = '\n@[youtube](youtubeVideoIdOrUrl)\n';
					input.insertAt(selection.start, videoTag);
					input.textarea.setSelectionRange(
						selection.start + 1,
						selection.start + videoTag.length - 1
					);
				},
				component: VideoIcon
			}
		]
	};
};

function videoTokenizerAndRenderer(options: VideoExtensionOptions): TokenizerAndRendererExtension {
	return {
		name: 'video',
		level: 'block',
		start(src) {
			// Find the first instance of @[serviceName](videoIdOrUrl)
			return src.match(/@\[([a-zA-Z]+)\]\([\s]*(.*?)[\s]*\)/i)?.index;
		},
		tokenizer(src) {
			const match = src.match(/^@\[([a-zA-Z]+)\]\([\s]*(.*?)[\s]*\)/i);

			if (!match) {
				return undefined;
			}

			const service = match[1].toLowerCase() as VideoService;
			const videoIdOrUrl = match[2];

			return {
				type: 'video',
				raw: match[0],
				service,
				videoIdOrUrl
			};
		},
		renderer(token) {
			return renderVideo(token.service, token.videoIdOrUrl, options);
		}
	};
}
