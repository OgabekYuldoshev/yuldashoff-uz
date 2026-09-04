import Image from "next/image";
import Link from "next/link";

import { Card, CardDescription, CardTitle } from "@/shared/ui/card";

import type { Project } from "../types/project";

// The preview is 128px wide on phones and 224px from the `sm` breakpoint up;
// `sizes` lets next/image pick a source dense enough for both, while
// width/height only fix the 16:9 box the browser reserves before load.
const PREVIEW_WIDTH = 448;
const PREVIEW_HEIGHT = 252;
const PREVIEW_SIZES = "(min-width: 640px) 224px, 128px";

type ProjectCardProps = {
	project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
	return (
		<Link href={`/projects/${project.slug}`} className="group block">
			<Card className="flex-row gap-4 p-3 shadow-xs transition-colors hover:bg-accent/40">
				<Image
					src={project.image}
					alt={project.title}
					width={PREVIEW_WIDTH}
					height={PREVIEW_HEIGHT}
					sizes={PREVIEW_SIZES}
					className="aspect-video w-32 shrink-0 rounded-md border object-cover sm:w-56"
				/>
				<div className="flex min-w-0 flex-col gap-1.5">
					<CardTitle className="transition-colors group-hover:text-primary">
						{project.title}
					</CardTitle>
					<CardDescription className="line-clamp-3">
						{project.description}
					</CardDescription>
				</div>
			</Card>
		</Link>
	);
}
