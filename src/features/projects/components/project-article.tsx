import Image from "next/image";

import { MarkdownContent } from "@/shared/components/markdown-content";

import type { Project } from "../types/project";

type ProjectArticleProps = {
	project: Project;
};

export function ProjectArticle({ project }: ProjectArticleProps) {
	return (
		<article className="flex w-full flex-col">
			<h1 className="text-xl font-bold">{project.title}</h1>
			{project.image ? (
				<div className="relative mb-2 h-[360px] w-full overflow-hidden">
					<Image
						fill
						src={project.image}
						alt={project.title}
						className="aspect-video w-full rounded-xl object-contain"
					/>
				</div>
			) : null}
			{project.href ? (
				<a
					href={project.href}
					target="_blank"
					rel="noopener noreferrer"
					className="flex w-fit cursor-pointer items-center gap-2 text-sm"
				>
					{project.href}
				</a>
			) : null}
			<MarkdownContent content={project.content} />
		</article>
	);
}
