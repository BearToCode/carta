<script lang="ts">
	import type { Carta } from "../carta";
	import { debounce } from "../utils";

  export let carta: Carta;
  export let value: string;

  let renderedHtml = "";

  $: {
    // On value updates
    value = value;
    debounce(() => {
      renderedHtml = carta.render(value);
    }, carta.options?.rendererDebounce ?? 300)();
  }
</script>

<div>
  {@html renderedHtml}
</div>

<style>
  div {
    width: 50%;
  }
</style>