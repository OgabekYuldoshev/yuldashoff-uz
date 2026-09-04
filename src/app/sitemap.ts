import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/site-config";
import { getPosts } from "@/features/blog";
import { getProjects } from "@/features/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

	return [
		{
			url: SITE_CONFIG.url,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		...posts.map((post) => ({
			url: `${SITE_CONFIG.url}/blog/${post.slug}`,
			lastModified: new Date(post.publishedAt),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
		...projects.map((project) => ({
			url: `${SITE_CONFIG.url}/projects/${project.slug}`,
			lastModified: new Date(project.publishedAt),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
	];
}
