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
			<header className="not-prose mb-10">
				<time
					dateTime={post.publishedAt}
					className="text-sm text-muted-foreground"
				>
					{formatDate(post.publishedAt)}
				</time>
				<h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance">
					{post.title}
				</h1>
				<p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
			</header>
			<MarkdownContent content={post.content} />
		</article>
	);
}
