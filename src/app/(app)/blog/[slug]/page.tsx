import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostArticle, getPostBySlug, getPostSlugs } from "@/features/blog";

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
		openGraph: {
			title: post.title,
			description: post.description,
			images: post.coverImage ? [post.coverImage] : undefined,
		},
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	return <PostArticle post={post} />;
}
