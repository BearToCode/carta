import type { Plugin, UnifiedTransformer } from 'carta-md';
import type { Plugin as UnifiedPlugin, Processor } from 'unified';
import type { Root } from 'mdast'
import { newlineToBreak } from 'mdast-util-newline-to-break';

/**
 * Carta newline break plugin.
 */

const unifiedPlugin: UnifiedPlugin<[], Root> = () => newlineToBreak;

const unifiedTransformer: UnifiedTransformer<'sync'> = {
	execution: 'sync',
	type: 'remark',
	transform({ processor }: { processor: Processor }) {
		processor.use(unifiedPlugin);
	}
};

const plugin = (): Plugin => ({
	transformers: [unifiedTransformer]
});

export {
	plugin as default,
	plugin as newline_break
};
