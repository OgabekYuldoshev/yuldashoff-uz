import Image from "next/image";

import { MarkdownContent } from "@/shared/components/markdown-content";
import { formatYear } from "@/shared/utils/format-date";

import type { Project } from "../types/project";

const HERO_WIDTH = 1280;
const HERO_HEIGHT = 720;
const HERO_SIZES = "(min-width: 640px) 640px, 100vw";

type ProjectArticleProps = {
	project: Project;
};

export function ProjectArticle({ project }: ProjectArticleProps) {
	return (
		<article className="flex w-full flex-col">
			<h1 className="mb-2 text-xl font-bold">{project.title}</h1>
			<time
				dateTime={project.publishedAt}
				className="mb-4 text-sm text-zinc-500 dark:text-zinc-400"
			>
				{formatYear(project.publishedAt)}
			</time>
			{project.image ? (
				<Image
					src={project.image}
					alt={project.title}
					width={HERO_WIDTH}
					height={HERO_HEIGHT}
					sizes={HERO_SIZES}
					priority
					className="mb-4 aspect-video w-full rounded-xl object-cover"
				/>
			) : null}
			{project.href ? (
				<a
					href={project.href}
					target="_blank"
					rel="noopener noreferrer"
					className="mb-2 flex w-fit items-center gap-2 text-sm"
				>
					{project.href}
				</a>
			) : null}
			<MarkdownContent content={project.content} />
		</article>
	);
}
