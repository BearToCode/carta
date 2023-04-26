<script lang="ts">
	import CartaRenderer from "./CartaRenderer.svelte";
  import MarkdownInput from "./internal/components/MarkdownInput.svelte";
	import type { Carta } from "./internal/carta";

  export let carta: Carta;
  export let theme = "default";
  export let value = "";
</script>

<div class="carta-body carta-body__{theme}">
  <MarkdownInput {carta} bind:value {theme} />
  <CartaRenderer {carta} bind:value />
</div>

<style>
  .carta-body {
    display: flex;
    width: 100%;
  }
</style>