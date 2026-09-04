import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
	ProjectArticle,
	getProjectBySlug,
	getProjectSlugs,
} from "@/features/projects";

type ProjectPageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: ProjectPageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) {
		return {};
	}

	return {
		title: project.title,
		description: project.description,
		openGraph: {
			title: project.title,
			description: project.description,
			images: project.image ? [project.image] : undefined,
		},
	};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	return <ProjectArticle project={project} />;
}
