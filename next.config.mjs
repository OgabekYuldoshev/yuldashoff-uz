/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		// shadcn/ui imports its primitives from the `radix-ui` umbrella package,
		// which does not tree-shake on its own; this rewrites those barrel imports
		// to the individual modules that are actually used.
		optimizePackageImports: ["radix-ui"],
	},
	// Outstatic reads its markdown content from the filesystem, so the content
	// directory has to be traced into the standalone build of every route that
	// queries it.
	outputFileTracingIncludes: {
		"/": ["./outstatic/**/*"],
		"/blog/[slug]": ["./outstatic/**/*"],
		"/projects/[slug]": ["./outstatic/**/*"],
		"/sitemap.xml": ["./outstatic/**/*"],
	},
};

export default nextConfig;
