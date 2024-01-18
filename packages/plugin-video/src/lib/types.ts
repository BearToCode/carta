export type VideoService = 'youtube' | 'vimeo';

export interface VideoExtensionOptions {
	/**
	 * Width of the video (in pixels or percentage string), defaults to 640.
	 */
	width?: number | string;
	/**
	 * Height of the video (in pixel or percentage string), defaults to 360.
	 */
	height?: number | string;
	/**
	 * Horizontal alignment of the video, defaults to 'center'.
	 */
	align?: 'left' | 'center' | 'right';
	/**
	 * Allow fullscreen, defaults to true.
	 */
	allowFullscreen?: boolean;
	/**
	 * Use youtube-nocookie.com domain, defaults to false.
	 */
	noCookie?: boolean;
}
