import { MarkdownContent } from "@/shared/components/markdown-content";

import type { Post } from "../types/post";

type PostArticleProps = {
	post: Post;
};

export function PostArticle({ post }: PostArticleProps) {
	return (
		<article className="flex w-full flex-col">
			<h1 className="text-xl font-bold">{post.title}</h1>
			<i className="mb-6">{post.description}</i>
			<MarkdownContent content={post.content} />
		</article>
	);
}
