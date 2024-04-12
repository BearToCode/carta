<script lang="ts">
	import HeaderTracker from '$lib/components/header-tracker/HeaderTracker.svelte';
	import MobileSidebar from '$lib/components/mobile-sidebar/MobileSidebar.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import { base } from '$app/paths';
	import '../app.postcss';
</script>

<Navbar />

<div class="filter-blur-xl min-h-screen w-full py-16 xl:py-24">
	<div
		class="fixed bottom-0 left-0 right-0 top-0 z-[-1] backdrop-blur-2xl backdrop-filter"
		style="background: url({base}/background.png) no-repeat center center; background-size: cover;"
	></div>
	<MobileSidebar class="xl:hidden" />
	<div class="container relative mx-auto flex px-4 sm:px-6">
		<Sidebar class="sticky top-24 hidden xl:block" />
		<main
			class="container max-w-4xl flex-shrink-0 flex-grow px-0 xl:max-w-3xl xl:px-4 2xl:max-w-4xl"
		>
			<slot />
			<Footer />
		</main>
		<HeaderTracker class="sticky top-24 hidden w-[30rem] xl:block" />
	</div>
</div>
