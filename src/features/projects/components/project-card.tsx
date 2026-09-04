import Image from "next/image";
import Link from "next/link";

import type { Project } from "../types/project";

// Layout size of the preview is 256px from the `sm` breakpoint up and full
// width below it; `sizes` lets next/image pick a source dense enough for both,
// while width/height only fix the 16:9 box the browser reserves before load.
const PREVIEW_WIDTH = 512;
const PREVIEW_HEIGHT = 288;
const PREVIEW_SIZES = "(min-width: 640px) 256px, 100vw";

type ProjectCardProps = {
	project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="group flex flex-col gap-3 sm:flex-row"
		>
			<div className="relative h-fit w-full shrink-0 rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset transition-colors group-hover:ring-zinc-300 sm:w-64 dark:bg-zinc-950/40 dark:ring-zinc-800/50 dark:group-hover:ring-zinc-700">
				<Image
					src={project.image}
					alt={project.title}
					width={PREVIEW_WIDTH}
					height={PREVIEW_HEIGHT}
					sizes={PREVIEW_SIZES}
					className="aspect-video w-full rounded-xl object-cover"
				/>
			</div>
			<div className="px-1">
				<span className="font-base relative mb-1 inline-block font-[450] text-zinc-900 dark:text-zinc-50">
					{project.title}
					<span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50" />
				</span>
				<p className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
					{project.content}
				</p>
			</div>
		</Link>
	);
}
