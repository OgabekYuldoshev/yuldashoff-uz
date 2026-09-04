import { getDocumentSlugs, load } from "outstatic/server";

import type { Project } from "../types/project";

const PROJECTS_COLLECTION = "projects";

const PROJECT_SUMMARY_FIELDS = [
	"title",
	"content",
	"slug",
	"publishedAt",
	"image",
	"href",
];

const PROJECT_DETAIL_FIELDS = [
	"title",
	"publishedAt",
	"slug",
	"content",
	"image",
	"href",
];

/** Every published project, newest first. */
export async function getProjects(): Promise<Project[]> {
	const db = await load();

	return db
		.find<Project>({ collection: PROJECTS_COLLECTION })
		.project(PROJECT_SUMMARY_FIELDS)
		.sort({ publishedAt: -1 })
		.toArray();
}

/** A single project including its MDX content, or `null` when the slug is unknown. */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
	const db = await load();

	const project = await db
		.find<Project>({ collection: PROJECTS_COLLECTION, slug })
		.project(PROJECT_DETAIL_FIELDS)
		.first();

	return project ?? null;
}

/** Slugs of every project, used to pre-render the project routes. */
export function getProjectSlugs(): string[] {
	return getDocumentSlugs(PROJECTS_COLLECTION);
}
