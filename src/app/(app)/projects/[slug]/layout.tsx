import type { PropsWithChildren } from "react";

import { ArticleLayout } from "@/layouts/article-layout";

export default function ProjectLayout({ children }: PropsWithChildren) {
	return (
		<ArticleLayout backHref="/projects" backLabel="All projects">
			{children}
		</ArticleLayout>
	);
}
