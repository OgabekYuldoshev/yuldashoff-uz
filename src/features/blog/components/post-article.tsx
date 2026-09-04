import { MarkdownContent } from "@/shared/components/markdown-content";
import { formatDate } from "@/shared/utils/format-date";

import type { Post } from "../types/post";

type PostArticleProps = {
	post: Post;
};

export function PostArticle({ post }: PostArticleProps) {
	return (
		<article className="flex w-full flex-col">
			<h1 className="mb-2 text-xl font-bold">{post.title}</h1>
			<time
				dateTime={post.publishedAt}
				className="mb-4 text-sm text-zinc-500 dark:text-zinc-400"
			>
				{formatDate(post.publishedAt)}
			</time>
			<p className="mb-6 text-zinc-600 italic dark:text-zinc-400">
				{post.description}
			</p>
			<MarkdownContent content={post.content} />
		</article>
	);
}
