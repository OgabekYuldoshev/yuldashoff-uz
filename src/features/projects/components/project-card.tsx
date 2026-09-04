import Image from "next/image";
import Link from "next/link";

import type { Project } from "../types/project";

const PREVIEW_WIDTH = 150;
const PREVIEW_HEIGHT = 80;

type ProjectCardProps = {
	project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
	const href = `/projects/${project.slug}`;

	return (
		<div className="grid gap-2 space-y-2 sm:flex">
			<Link
				href={href}
				className="relative h-fit shrink-0 rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50"
			>
				<Image
					src={project.image}
					alt={project.title}
					width={PREVIEW_WIDTH}
					height={PREVIEW_HEIGHT}
					className="aspect-video w-full rounded-xl"
				/>
			</Link>
			<div className="px-1">
				<Link
					href={href}
					className="font-base group relative mb-1 inline-block font-[450] text-zinc-900 dark:text-zinc-50"
				>
					{project.title}
					<span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full" />
				</Link>
				<p className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
					{project.content}
				</p>
			</div>
		</div>
	);
}
