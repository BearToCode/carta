import { marked } from "marked";

export interface CartaOptions {
  /**
   * Markdown parsing options, more on that [here](https://marked.js.org/using_advanced)
   */
  markedOptions?: marked.MarkedOptions;
  /**
   * Renderer debouncing timeout, in ms.
   * @defaults 300ms
   */
  rendererDebounce?: number;
}

export class Carta {
  public constructor(
    public readonly options?: CartaOptions
  ) {}
  
  /**
   * Render markdown to html.
   * @param markdown Markdown input.
   * @returns Rendered html.
   */
  public render(markdown: string): string {
    return marked.parse(
      markdown,
      this.options?.markedOptions
    );
  }
}