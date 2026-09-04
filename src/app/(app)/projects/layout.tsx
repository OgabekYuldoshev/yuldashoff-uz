import type { PropsWithChildren } from "react";

import { ArticleLayout } from "@/layouts/article-layout";

export default function ProjectsLayout({ children }: PropsWithChildren) {
	return <ArticleLayout>{children}</ArticleLayout>;
}
