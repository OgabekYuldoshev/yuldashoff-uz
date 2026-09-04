import Link from "next/link";

import { formatDate } from "@/shared/utils/format-date";

import type { Post } from "../types/post";

type PostListProps = {
	posts: Post[];
};

export function PostList({ posts }: PostListProps) {
	return (
		<div className="-mx-3 flex flex-col">
			{posts.map((post) => (
				<Link
					key={post.slug}
					href={`/blog/${post.slug}`}
					className="group rounded-lg px-3 py-3 transition-colors hover:bg-accent/40"
				>
					<time
						dateTime={post.publishedAt}
						className="text-xs text-muted-foreground"
					>
						{formatDate(post.publishedAt)}
					</time>
					<h3 className="mt-1 font-medium transition-colors group-hover:text-primary">
						{post.title}
					</h3>
					<p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
						{post.description}
					</p>
				</Link>
			))}
		</div>
	);
}
