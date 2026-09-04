import { ArrowUpRight } from "lucide-react";
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
			{/* `not-prose` keeps the typography plugin off the page header so its
			    sizes and spacing are set here rather than by prose defaults. */}
			<header className="not-prose mb-8">
				<h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
					{project.title}
				</h1>
				<time
					dateTime={project.publishedAt}
					className="mt-2 block text-sm text-zinc-500 dark:text-zinc-400"
				>
					{formatYear(project.publishedAt)}
				</time>
				{project.href ? (
					<a
						href={project.href}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
					>
						Visit site
						<ArrowUpRight className="h-4 w-4" aria-hidden />
					</a>
				) : null}
			</header>
			{project.image ? (
				<Image
					src={project.image}
					alt={project.title}
					width={HERO_WIDTH}
					height={HERO_HEIGHT}
					sizes={HERO_SIZES}
					priority
					className="mb-8 aspect-video w-full rounded-xl object-cover"
				/>
			) : null}
			<MarkdownContent content={project.content} />
		</article>
	);
}
