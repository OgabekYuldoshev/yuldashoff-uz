import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
	ProjectArticle,
	getProjectBySlug,
	getProjectSlugs,
} from "@/features/projects";
import { JsonLd } from "@/shared/components/json-ld";
import {
	buildBreadcrumbSchema,
	buildProjectSchema,
} from "@/shared/lib/structured-data";

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
		alternates: { canonical: `/projects/${slug}` },
		// `openGraph.images` is left unset so Next uses the generated
		// `opengraph-image` for this route.
		openGraph: {
			type: "article",
			url: `/projects/${slug}`,
			title: project.title,
			description: project.description,
		},
		twitter: {
			card: "summary_large_image",
			title: project.title,
			description: project.description,
		},
	};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	return (
		<>
			<ProjectArticle project={project} />
			<JsonLd
				data={buildProjectSchema({
					title: project.title,
					description: project.description,
					slug,
					publishedAt: project.publishedAt,
					href: project.href,
					image: project.image,
				})}
			/>
			<JsonLd
				data={buildBreadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Projects", path: "/projects" },
					{ name: project.title, path: `/projects/${slug}` },
				])}
			/>
		</>
	);
}
