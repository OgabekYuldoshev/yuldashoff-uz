import { notFound } from "next/navigation";

import { getPostBySlug, getPostSlugs } from "@/features/blog";
import {
	OG_IMAGE_CONTENT_TYPE,
	OG_IMAGE_SIZE,
	renderOgImage,
} from "@/shared/lib/og-image";

export const alt = "Blog post";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export function generateStaticParams() {
	return getPostSlugs().map((slug) => ({ slug }));
}

type OpengraphImageProps = {
	params: Promise<{ slug: string }>;
};

export default async function OpengraphImage({ params }: OpengraphImageProps) {
	const post = await getPostBySlug((await params).slug);

	if (!post) {
		notFound();
	}

	return renderOgImage({
		eyebrow: "Blog",
		title: post.title,
		description: post.description,
	});
}
