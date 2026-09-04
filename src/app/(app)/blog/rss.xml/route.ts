import { SITE_CONFIG } from "@/config/site-config";
import { getPosts } from "@/features/blog";

// Posts only change when the repo is rebuilt, so the feed is generated once.
export const dynamic = "force-static";

const CACHE_CONTROL =
	"public, max-age=0, s-maxage=3600, stale-while-revalidate";

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
	const posts = await getPosts();

	const items = posts
		.map((post) => {
			const url = `${SITE_CONFIG.url}/blog/${post.slug}`;

			return `		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<description>${escapeXml(post.description)}</description>
			<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
		</item>`;
		})
		.join("\n");

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(SITE_CONFIG.name)} — Blog</title>
		<link>${SITE_CONFIG.url}/blog</link>
		<description>${escapeXml(SITE_CONFIG.description)}</description>
		<language>uz</language>
		<atom:link href="${SITE_CONFIG.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>`;

	return new Response(feed, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": CACHE_CONTROL,
		},
	});
}
