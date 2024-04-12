<script lang="ts">
	import { onMount } from 'svelte';

	export { className as class };

	let className = '';
	let loading = true;
	let stars: number;
	onMount(async () => {
		const res = await fetch('https://api.github.com/repos/BearToCode/carta');
		const json = await res.json();
		stars = json.stargazers_count;
		loading = false;
	});
</script>

<a
	href="https://github.com/BearToCode/carta"
	class="flex h-12 items-center space-x-2 p-2 {className}"
>
	<iconify-icon icon="mdi:github" class="text-2xl"></iconify-icon>
	<div class="hidden h-min flex-col justify-center space-y-1 md:flex">
		<p class="text-[0.9rem] font-semibold leading-3">BearToCode/carta</p>
		{#if loading}
			<div class="pulse my-1.5 h-3 w-[80px] rounded-full bg-neutral-800" />
		{:else}
			<div class="inline-flex items-center space-x-1">
				<iconify-icon icon="ic:round-star" class="h-3 w-3"></iconify-icon>
				<span class="mt-1 text-[0.8rem] leading-3">{stars}</span>
			</div>
		{/if}
	</div>
</a>
