import { ProjectCard } from "./project-card";

import type { Project } from "../types/project";

type ProjectListProps = {
	projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
	return (
		<div className="grid grid-cols-1 gap-6">
			{projects.map((project) => (
				<ProjectCard key={project.slug} project={project} />
			))}
		</div>
	);
}
