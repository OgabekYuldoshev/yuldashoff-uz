import type { PropsWithChildren } from "react";

import { ArticleLayout } from "@/layouts/article-layout";

export default function BlogPostLayout({ children }: PropsWithChildren) {
	return (
		<ArticleLayout backHref="/blog" backLabel="All posts">
			{children}
		</ArticleLayout>
	);
}
