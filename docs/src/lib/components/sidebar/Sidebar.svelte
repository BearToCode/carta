<script lang="ts">
	import SidebarLink from './SidebarLink.svelte';

	export { className as class };

	let className = '';
</script>

<div class="h-full {className}">
	<h3 class="mb-3 ml-4 mt-6 text-sm font-medium first:mt-0 last:mb-0">Overview</h3>

	<!-- Introduction -->
	<SidebarLink href="/introduction">
		<iconify-icon icon="radix-icons:dashboard" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Introduction</span>
	</SidebarLink>

	<!-- Examples -->
	<SidebarLink href="/examples">
		<iconify-icon icon="ph:codesandbox-logo" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Examples</span>
	</SidebarLink>

	<!-- Getting Started -->
	<SidebarLink href="/getting-started">
		<iconify-icon icon="ic:round-download" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Getting Started</span>
	</SidebarLink>

	<!-- Editing Styles -->
	<SidebarLink href="/editing-styles">
		<iconify-icon icon="lucide:palette" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Editing Styles</span>
	</SidebarLink>

	<!-- Migration -->
	<SidebarLink href="/migration">
		<iconify-icon icon="material-symbols:upgrade" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Migration</span>
	</SidebarLink>

	<!-- Community Plugins -->
	<SidebarLink href="/community-plugins">
		<iconify-icon icon="ph:stack-fill" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Community Plugins</span>
	</SidebarLink>

	<h3 class="mb-3 ml-4 mt-6 text-sm font-medium first:mt-0 last:mb-0">Plugins</h3>

	<!-- Math -->
	<SidebarLink href="/plugins/math">
		<iconify-icon icon="tabler:math" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Math</span>
	</SidebarLink>

	<!-- Code -->
	<SidebarLink href="/plugins/code">
		<iconify-icon icon="fluent:code-16-filled" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Code</span>
	</SidebarLink>

	<!-- Emoji -->
	<SidebarLink href="/plugins/emoji">
		<iconify-icon icon="mingcute:emoji-line" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Emoji</span>
	</SidebarLink>

	<!-- Slash -->
	<SidebarLink href="/plugins/slash">
		<iconify-icon icon="tabler:slash" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Slash</span>
	</SidebarLink>

	<!-- TikZ -->
	<SidebarLink href="/plugins/tikz">
		<iconify-icon icon="mdi:draw-pen" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">TikZ</span>
	</SidebarLink>

	<!-- Attachment -->
	<SidebarLink href="/plugins/attachment">
		<iconify-icon icon="tdesign:attach" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Attachment</span>
	</SidebarLink>

	<!-- Anchor -->
	<SidebarLink href="/plugins/anchor">
		<iconify-icon icon="mingcute:link-fill" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Anchor</span>
	</SidebarLink>

	<!-- Component -->
	<SidebarLink href="/plugins/component">
		<iconify-icon icon="ri:svelte-fill" class="text-xl"></iconify-icon>
		<span class="text-[0.95rem]">Component</span>
	</SidebarLink>

	<h3 class="mb-3 ml-4 mt-6 text-sm font-medium first:mt-0 last:mb-0">API</h3>

	<!-- Utilities -->
	<SidebarLink href="/api/utilities">
		<span class="text-[0.95rem]">Utilities</span>
	</SidebarLink>

	<!-- Core -->
	<SidebarLink href="/api/core">
		<span class="text-[0.95rem]">Core</span>
	</SidebarLink>

	<!-- Extension -->
	<SidebarLink href="/api/extension">
		<span class="text-[0.95rem]">Extension</span>
	</SidebarLink>
</div>
