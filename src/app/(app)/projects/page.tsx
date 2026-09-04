import type { Metadata } from "next";

import { ProjectList, getProjects } from "@/features/projects";
import { Reveal } from "@/shared/components/reveal";

export const metadata: Metadata = {
	title: "Projects",
	description:
		"Government platforms, AI tools and open-source libraries I have built.",
};

export default async function ProjectsPage() {
	const projects = await getProjects();

	return (
		<main>
			<Reveal>
				<h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
				<p className="mt-3 text-muted-foreground">
					Government platforms, AI tools and open-source libraries I have built.
				</p>
				<div className="mt-8">
					<ProjectList projects={projects} />
				</div>
			</Reveal>
		</main>
	);
}
