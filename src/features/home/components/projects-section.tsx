import { ProjectList } from "@/features/projects";
import type { Project } from "@/features/projects";

import { SectionHeading } from "./section-heading";

type ProjectsSectionProps = {
	projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
	return (
		<>
			<SectionHeading>Selected Projects</SectionHeading>
			<ProjectList projects={projects} />
		</>
	);
}
