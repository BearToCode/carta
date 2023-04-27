<script lang="ts">
	import type { Carta } from "./";

  export let carta: Carta;
  export let value: string;
</script>

<div>
  {@html carta.render(value)}
</div>