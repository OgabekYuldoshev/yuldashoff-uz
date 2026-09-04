import type { Post } from "@/features/blog";
import { PostList } from "@/features/blog";

import { SectionHeading } from "./section-heading";
import { ViewAllLink } from "./view-all-link";

type PostsSectionProps = {
	posts: Post[];
};

export function PostsSection({ posts }: PostsSectionProps) {
	return (
		<>
			<SectionHeading action={<ViewAllLink href="/blog" label="All posts" />}>
				Blog
			</SectionHeading>
			<PostList posts={posts} />
		</>
	);
}
