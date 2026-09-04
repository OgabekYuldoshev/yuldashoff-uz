import type { Metadata } from "next";

import { SITE_CONFIG } from "@/config/site-config";
import { PostList, getPosts } from "@/features/blog";
import { Reveal } from "@/shared/components/reveal";

const BLOG_DESCRIPTION =
	"Notes on TypeScript, React internals and developer tooling.";

export const metadata: Metadata = {
	title: "Blog",
	description: BLOG_DESCRIPTION,
	alternates: {
		canonical: "/blog",
		types: { "application/rss+xml": `${SITE_CONFIG.url}/blog/rss.xml` },
	},
	openGraph: {
		type: "website",
		url: "/blog",
		title: "Blog",
		description: BLOG_DESCRIPTION,
	},
};

export default async function BlogPage() {
	const posts = await getPosts();

	return (
		<main>
			<Reveal>
				<h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
				<p className="mt-3 text-muted-foreground">{BLOG_DESCRIPTION}</p>
				<div className="mt-8">
					<PostList posts={posts} />
				</div>
			</Reveal>
		</main>
	);
}
