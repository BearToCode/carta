<script lang="ts">
	import {
		Code,
		CodesandboxLogo,
		Cube,
		Dashboard,
		Download,
		Face,
		FontFamily,
		Slash,
		File,
		FontStyle
	} from 'radix-icons-svelte';
	import SidebarLink from './SidebarLink.svelte';

	export { className as class };

	let className = '';
</script>

<div class="h-full {className}">
	<h3 class="mb-3 ml-4 mt-6 text-sm font-medium first:mt-0 last:mb-0">Overview</h3>

	<!-- Introduction -->
	<SidebarLink href="/introduction">
		<Dashboard class="h-5 w-5" />
		<span class="text-[0.95rem]">Introduction</span>
	</SidebarLink>

	<!-- Examples -->
	<SidebarLink href="/examples">
		<CodesandboxLogo class="h-5 w-5" />
		<span class="text-[0.95rem]">Examples</span>
	</SidebarLink>

	<!-- Getting Started -->
	<SidebarLink href="/getting-started">
		<Download class="h-5 w-5" />
		<span class="text-[0.95rem]">Getting Started</span>
	</SidebarLink>

	<!-- Editing Styles -->
	<SidebarLink href="/editing-styles">
		<FontStyle class="h-5 w-5" />
		<span class="text-[0.95rem]">Editing Styles</span>
	</SidebarLink>

	<h3 class="mb-3 ml-4 mt-6 text-sm font-medium first:mt-0 last:mb-0">Plugins</h3>

	<!-- Math -->
	<SidebarLink href="/plugins/math">
		<FontFamily class="h-5 w-5" />
		<span class="text-[0.95rem]">Math</span>
	</SidebarLink>

	<!-- Code -->
	<SidebarLink href="/plugins/code">
		<Code class="h-5 w-5" />
		<span class="text-[0.95rem]">Code</span>
	</SidebarLink>

	<!-- Emoji -->
	<SidebarLink href="/plugins/emoji">
		<Face class="h-5 w-5" />
		<span class="text-[0.95rem]">Emoji</span>
	</SidebarLink>

	<!-- Slash -->
	<SidebarLink href="/plugins/slash">
		<Slash class="h-5 w-5" />
		<span class="text-[0.95rem]">Slash</span>
	</SidebarLink>

	<!-- TikZ -->
	<SidebarLink href="/plugins/tikz">
		<Cube class="h-5 w-5" />
		<span class="text-[0.95rem]">TikZ</span>
	</SidebarLink>

	<!-- Attachment -->
	<SidebarLink href="/plugins/attachment">
		<File class="h-5 w-5" />
		<span class="text-[0.95rem]">Attachment</span>
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
