import { PostList } from "@/features/blog";
import type { Post } from "@/features/blog";

import { SectionHeading } from "./section-heading";

type PostsSectionProps = {
	posts: Post[];
};

export function PostsSection({ posts }: PostsSectionProps) {
	return (
		<>
			<SectionHeading>Blog</SectionHeading>
			<PostList posts={posts} />
		</>
	);
}
