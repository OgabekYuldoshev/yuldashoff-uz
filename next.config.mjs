/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
