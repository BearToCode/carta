import { CartaBase, type BaseOptions } from './base';

export interface ServerOptions extends BaseOptions {}

/**
 * Server-side Carta class, for SSR rendering. Does not include any browser-specific features.
 */
export class CartaServer extends CartaBase {
	public override readonly bundle = () => 'server';

	public constructor(options: ServerOptions) {
		super(options);

		this.initExtensions();
	}
}
