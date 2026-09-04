import { notFound } from "next/navigation";

import { getProjectBySlug, getProjectSlugs } from "@/features/projects";
import {
	OG_IMAGE_CONTENT_TYPE,
	OG_IMAGE_SIZE,
	renderOgImage,
} from "@/shared/lib/og-image";

export const alt = "Project";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export function generateStaticParams() {
	return getProjectSlugs().map((slug) => ({ slug }));
}

type OpengraphImageProps = {
	params: Promise<{ slug: string }>;
};

export default async function OpengraphImage({ params }: OpengraphImageProps) {
	const project = await getProjectBySlug((await params).slug);

	if (!project) {
		notFound();
	}

	return renderOgImage({
		eyebrow: "Project",
		title: project.title,
		description: project.description,
	});
}
