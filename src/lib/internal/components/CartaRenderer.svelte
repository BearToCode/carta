<script lang="ts">
	import type { Carta } from "../carta";
	import { debounce } from "../utils";

  export let carta: Carta;
  export let value: string;
  export let theme: string;

  let renderedHtml = "";

  $: {
    // On value updates
    value = value;
    debounce(() => {
      renderedHtml = carta.render(value);
    }, carta.options?.rendererDebounce ?? 300)();
  }
</script>

<div class="carta-renderer__{theme}">
  {@html renderedHtml}
</div>

<style>
  div {
    width: 50%;
  }
</style>