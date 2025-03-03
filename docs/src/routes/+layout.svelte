<script lang="ts">
	import HeaderTracker from '$lib/components/header-tracker/HeaderTracker.svelte';
	import MobileSidebar from '$lib/components/mobile-sidebar/MobileSidebar.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import { base } from '$app/paths';

	import '../app.postcss';
	import '$lib/styles/main.scss';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Navbar />

<div class="filter-blur-xl min-h-screen w-full py-16 xl:py-24">
	<div
		class="fixed bottom-0 left-0 right-0 top-0 z-[-1] backdrop-blur-2xl backdrop-filter"
		style="background: url({base}/background.jpg) no-repeat center center; background-size: cover;"
	></div>
	<MobileSidebar class="xl:hidden" />
	<div class="container relative mx-auto flex px-4 sm:px-6">
		<Sidebar class="sticky top-24 hidden xl:block" />
		<main
			class="container max-w-4xl flex-shrink-0 flex-grow px-0 xl:max-w-3xl xl:px-4 2xl:max-w-4xl"
		>
			<div class="main-container searchable-content box-content">
				{@render children?.()}
			</div>
			<Footer />
		</main>
		<HeaderTracker class="sticky top-24 hidden w-[15rem] flex-shrink-0 xl:block" />
	</div>
</div>
