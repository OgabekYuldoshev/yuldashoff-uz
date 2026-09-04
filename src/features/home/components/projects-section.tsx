import type { Project } from "@/features/projects";
import { ProjectList } from "@/features/projects";

import { SectionHeading } from "./section-heading";
import { ViewAllLink } from "./view-all-link";

type ProjectsSectionProps = {
	projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
	return (
		<>
			<SectionHeading
				action={<ViewAllLink href="/projects" label="All projects" />}
			>
				Selected Projects
			</SectionHeading>
			<ProjectList projects={projects} />
		</>
	);
}
