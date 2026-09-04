import type { Metadata } from "next";

import { ProjectList, getProjects } from "@/features/projects";
import { Reveal } from "@/shared/components/reveal";

const PROJECTS_DESCRIPTION =
	"Government platforms, AI tools and open-source libraries I have built.";

export const metadata: Metadata = {
	title: "Projects",
	description: PROJECTS_DESCRIPTION,
	alternates: { canonical: "/projects" },
	openGraph: {
		type: "website",
		url: "/projects",
		title: "Projects",
		description: PROJECTS_DESCRIPTION,
	},
};

export default async function ProjectsPage() {
	const projects = await getProjects();

	return (
		<main>
			<Reveal>
				<h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
				<p className="mt-3 text-muted-foreground">{PROJECTS_DESCRIPTION}</p>
				<div className="mt-8">
					<ProjectList projects={projects} />
				</div>
			</Reveal>
		</main>
	);
}
