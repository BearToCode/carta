<script lang="ts">
	interface Props {
		alt: string;
		src: string;
	}

	let { alt, src }: Props = $props();
</script>

<img {src} {alt} />
