import { MarkdownContent } from "@/shared/components/markdown-content";
import { formatDate } from "@/shared/utils/format-date";

import type { Post } from "../types/post";

type PostArticleProps = {
	post: Post;
};

export function PostArticle({ post }: PostArticleProps) {
	return (
		<article className="flex w-full flex-col">
			{/* `not-prose` keeps the typography plugin off the page header so its
			    sizes and spacing are set here rather than by prose defaults. */}
			<header className="not-prose mb-8">
				<h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
					{post.title}
				</h1>
				<time
					dateTime={post.publishedAt}
					className="mt-2 block text-sm text-zinc-500 dark:text-zinc-400"
				>
					{formatDate(post.publishedAt)}
				</time>
				<p className="mt-4 text-zinc-600 dark:text-zinc-400">
					{post.description}
				</p>
			</header>
			<MarkdownContent content={post.content} />
		</article>
	);
}
