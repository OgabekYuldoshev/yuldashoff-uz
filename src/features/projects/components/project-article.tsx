import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { MarkdownContent } from "@/shared/components/markdown-content";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
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
				<Badge variant="secondary">
					<time dateTime={project.publishedAt}>
						{formatYear(project.publishedAt)}
					</time>
				</Badge>
				<h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
					{project.title}
				</h1>
				{project.href ? (
					<Button asChild className="mt-5 rounded-full">
						<a href={project.href} target="_blank" rel="noopener noreferrer">
							Visit site
							<ArrowUpRight aria-hidden />
						</a>
					</Button>
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
					className="not-prose mb-10 aspect-video w-full rounded-xl border object-cover"
				/>
			) : null}
			<MarkdownContent content={project.content} />
		</article>
	);
}
