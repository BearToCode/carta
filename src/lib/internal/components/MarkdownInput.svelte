<script lang="ts">
	import type { Carta } from "../carta";

  export let carta: Carta;
  export let value = "";
  export let theme: string;
</script>

<textarea
  name="md"
  id="md"
  bind:value
  class="carta-input__{theme}"
/>

<style>
  textarea {
    width: 50%;
    min-height: 600px;
    resize: none;
  }
</style>