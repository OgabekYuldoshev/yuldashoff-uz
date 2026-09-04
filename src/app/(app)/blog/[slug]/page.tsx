import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SITE_CONFIG } from "@/config/site-config";
import { PostArticle, getPostBySlug, getPostSlugs } from "@/features/blog";
import { JsonLd } from "@/shared/components/json-ld";
import {
	buildBlogPostingSchema,
	buildBreadcrumbSchema,
} from "@/shared/lib/structured-data";

type BlogPostPageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		return {};
	}

	return {
		title: post.title,
		description: post.description,
		alternates: { canonical: `/blog/${slug}` },
		// `openGraph.images` is left unset so Next uses the generated
		// `opengraph-image` for this route.
		openGraph: {
			type: "article",
			url: `/blog/${slug}`,
			title: post.title,
			description: post.description,
			publishedTime: post.publishedAt,
			authors: [SITE_CONFIG.name],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
		},
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	return (
		<>
			<PostArticle post={post} />
			<JsonLd
				data={buildBlogPostingSchema({
					title: post.title,
					description: post.description,
					slug,
					publishedAt: post.publishedAt,
				})}
			/>
			<JsonLd
				data={buildBreadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Blog", path: "/blog" },
					{ name: post.title, path: `/blog/${slug}` },
				])}
			/>
		</>
	);
}
