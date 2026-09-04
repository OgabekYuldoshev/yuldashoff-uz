import type { Metadata } from "next";

import { PostList, getPosts } from "@/features/blog";
import { Reveal } from "@/shared/components/reveal";

export const metadata: Metadata = {
	title: "Blog",
	description: "Notes on TypeScript, React internals and developer tooling.",
};

export default async function BlogPage() {
	const posts = await getPosts();

	return (
		<main>
			<Reveal>
				<h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
				<p className="mt-3 text-muted-foreground">
					Notes on TypeScript, React internals and developer tooling.
				</p>
				<div className="mt-8">
					<PostList posts={posts} />
				</div>
			</Reveal>
		</main>
	);
}
