<script lang="ts">
	import HeaderTracker from '$lib/components/header-tracker/HeaderTracker.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import '../app.postcss';
</script>

<Navbar />

<div class="filter-blur-xl min-h-screen w-full py-24">
	<div
		class="fixed bottom-0 left-0 right-0 top-0 z-[-1] backdrop-blur-2xl backdrop-filter"
		style="background: url(background.png) no-repeat center center; background-size: cover;"
	></div>
	<div class="container relative mx-auto flex">
		<Sidebar class="sticky top-24 flex-grow" />
		<main class="container w-screen max-w-7xl">
			<slot />
			<Footer />
		</main>
		<HeaderTracker class="sticky top-24 w-[20rem]" />
	</div>
</div>
