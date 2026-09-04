import type { PropsWithChildren } from "react";

import { ArticleLayout } from "@/layouts/article-layout";

export default function BlogLayout({ children }: PropsWithChildren) {
	return <ArticleLayout>{children}</ArticleLayout>;
}
