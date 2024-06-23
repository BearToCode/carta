import {
	type Listener,
	type ExtensionComponent,
	type UnifiedTransformer,
	type Plugin,
	cartaEventsKeys,
	type Carta
} from '$lib/core/carta';
import rehypeStringify from 'rehype-stringify';
import remarkGfm, { type Options as GfmOptions } from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { type Processor, unified } from 'unified';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listeners = Listener<any>[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtensionComponents = Array<ExtensionComponent<any>>;

/**
 * Carta editor options.
 */
export interface BaseOptions {
	/**
	 * GitHub Flavored Markdown options.
	 */
	gfmOptions?: GfmOptions;
	/**
	 * Editor/viewer extensions.
	 */
	extensions?: Plugin[];
	/**
	 * HTML sanitizer.
	 */
	sanitizer: ((html: string) => string) | false;
}

/**
 * Base class for Carta editor.
 */
export class CartaBase {
	public readonly bundle = () => 'base';

	public readonly sanitizer?: (html: string) => string;
	public readonly cartaListeners: Listeners;
	public readonly components: ExtensionComponents;
	public readonly syncProcessor: Processor;
	public readonly asyncProcessor: Promise<Processor>;
	public readonly dispatcher = new EventTarget();

	private mExtensions: Plugin[] = [];
	private mSyncTransformers: UnifiedTransformer<'sync'>[] = [];
	private mAsyncTransformers: UnifiedTransformer<'async'>[] = [];

	public constructor(options: BaseOptions) {
		this.sanitizer = options.sanitizer || undefined;

		// Load plugins
		this.cartaListeners = [];
		this.components = [];

		const listeners = [];
		for (const ext of options?.extensions ?? []) {
			this.components.push(...(ext.components ?? []));
			listeners.push(...(ext.listeners ?? []));
		}

		this.cartaListeners = listeners.filter((it) => cartaEventsKeys.includes(it[0]));

		// Setup carta listeners
		this.cartaListeners.forEach((it) => {
			this.dispatcher.addEventListener(...it);
		});

		// Load unified extensions
		this.mSyncTransformers = [];
		this.mAsyncTransformers = [];

		for (const ext of options?.extensions ?? []) {
			for (const transformer of ext.transformers ?? []) {
				if (transformer.execution === 'sync') {
					this.mSyncTransformers.push(transformer);
				} else {
					this.mAsyncTransformers.push(transformer);
				}
			}
		}

		this.syncProcessor = this.setupSynchronousProcessor({ gfmOptions: options?.gfmOptions });
		this.asyncProcessor = this.setupAsynchronousProcessor({ gfmOptions: options?.gfmOptions });

		this.mExtensions = options?.extensions ?? [];
	}

	/**
	 * Initialize extensions.
	 */
	protected initExtensions() {
		for (const ext of this.mExtensions) {
			if (ext.onLoad) {
				ext.onLoad({
					carta: this
				});
			}
		}
	}

	private setupSynchronousProcessor({ gfmOptions }: { gfmOptions?: GfmOptions }) {
		const syncProcessor = unified();

		const remarkPlugins = this.mSyncTransformers.filter((it) => it.type === 'remark');
		const rehypePlugins = this.mSyncTransformers.filter((it) => it.type === 'rehype');

		syncProcessor.use(remarkParse);
		syncProcessor.use(remarkGfm, gfmOptions);

		for (const plugin of remarkPlugins) {
			plugin.transform({ processor: syncProcessor, carta: this });
		}

		syncProcessor.use(remarkRehype);

		for (const plugin of rehypePlugins) {
			plugin.transform({ processor: syncProcessor, carta: this });
		}

		syncProcessor.use(rehypeStringify);

		return syncProcessor;
	}

	private async setupAsynchronousProcessor({ gfmOptions }: { gfmOptions?: GfmOptions }) {
		const asyncProcessor = unified();

		const remarkPlugins = [...this.mSyncTransformers, ...this.mAsyncTransformers].filter(
			(it) => it.type === 'remark'
		);
		const rehypePlugins = [...this.mSyncTransformers, ...this.mAsyncTransformers].filter(
			(it) => it.type === 'rehype'
		);

		asyncProcessor.use(remarkParse);
		asyncProcessor.use(remarkGfm, gfmOptions);

		for (const plugin of remarkPlugins) {
			await plugin.transform({ processor: asyncProcessor, carta: this });
		}

		asyncProcessor.use(remarkRehype);

		for (const plugin of rehypePlugins) {
			await plugin.transform({ processor: asyncProcessor, carta: this });
		}

		asyncProcessor.use(rehypeStringify);

		return asyncProcessor;
	}

	/**
	 * Render markdown to html asynchronously.
	 * @param markdown Markdown input.
	 * @returns Rendered html.
	 */
	public async render(markdown: string): Promise<string> {
		const processor = await this.asyncProcessor;
		const dirty = String(await processor.process(markdown));
		if (!dirty) return '';
		this.dispatcher.dispatchEvent(
			new CustomEvent<{ carta: Carta }>('carta-render', { detail: { carta: this } })
		);
		return (this.sanitizer && this.sanitizer(dirty)) ?? dirty;
	}

	/**
	 * Render markdown, excluding syntax highlighting (SSR).
	 * @param markdown Markdown input.
	 * @returns Rendered html.
	 */
	public renderSSR(markdown: string): string {
		const dirty = String(this.syncProcessor.processSync(markdown));
		if (typeof dirty != 'string') return '';
		this.dispatcher.dispatchEvent(
			new CustomEvent<{ carta: Carta }>('carta-render-ssr', { detail: { carta: this } })
		);
		if (this.sanitizer) return this.sanitizer(dirty);
		return dirty;
	}
}
