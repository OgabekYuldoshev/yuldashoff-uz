import { getDocumentSlugs, load } from "outstatic/server";

import type { Post } from "../types/post";

const POSTS_COLLECTION = "posts";

const POST_SUMMARY_FIELDS = ["title", "description", "slug", "publishedAt"];

const POST_DETAIL_FIELDS = [
	"title",
	"description",
	"publishedAt",
	"slug",
	"content",
	"coverImage",
];

/** Every published post, newest first. */
export async function getPosts(): Promise<Post[]> {
	const db = await load();

	return db
		.find<Post>({ collection: POSTS_COLLECTION })
		.project(POST_SUMMARY_FIELDS)
		.sort({ publishedAt: -1 })
		.toArray();
}

/** A single post including its MDX content, or `null` when the slug is unknown. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
	const db = await load();

	const post = await db
		.find<Post>({ collection: POSTS_COLLECTION, slug })
		.project(POST_DETAIL_FIELDS)
		.first();

	return post ?? null;
}

/** Slugs of every post, used to pre-render the post routes. */
export function getPostSlugs(): string[] {
	return getDocumentSlugs(POSTS_COLLECTION);
}
