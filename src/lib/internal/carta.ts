import { marked } from "marked";

export interface CartaOptions {
  /**
   * Editor/viewer extensions.
   */
  extensions?: CartaExtension[];
  /**
   * Renderer debouncing timeout, in ms.
   * @defaults 300ms
   */
  rendererDebounce?: number;
}

export interface CartaExtension {
  /**
   * Marked extensions, more on that [here](https://marked.js.org/using_advanced)
  */
  markedExtensions?: marked.MarkedExtension[];
}

export class Carta {
  public constructor(
    public readonly options?: CartaOptions
  ) {
    const markedExtensions = this.options
      ?.extensions
      ?.flatMap(ext => ext.markedExtensions)
      .filter(ext => ext != null) as marked.MarkedExtension[] | undefined;
    // Load marked extensions
    if (markedExtensions)
      marked.use(...markedExtensions);
  }
  
  /**
   * Render markdown to html.
   * @param markdown Markdown input.
   * @returns Rendered html.
   */
  public render(markdown: string): string {
    return marked.parse(
      markdown,
    );
  }
}