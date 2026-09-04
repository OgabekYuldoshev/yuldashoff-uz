"use client";

import Link from "next/link";

import { AnimatedBackground } from "@/shared/ui/animated-background";

import type { Post } from "../types/post";

type PostListProps = {
	posts: Post[];
};

export function PostList({ posts }: PostListProps) {
	return (
		<div className="flex flex-col space-y-0">
			<AnimatedBackground
				enableHover
				className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
				transition={{
					type: "spring",
					bounce: 0,
					duration: 0.2,
				}}
			>
				{posts.map((post) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						data-id={post.slug}
						className="-mx-3 rounded-xl px-3 py-3"
					>
						<div className="flex flex-col space-y-1">
							<h3 className="font-normal dark:text-zinc-100">{post.title}</h3>
							<p className="line-clamp-4 text-sm text-zinc-500 dark:text-zinc-400">
								{post.description}
							</p>
						</div>
					</Link>
				))}
			</AnimatedBackground>
		</div>
	);
}
