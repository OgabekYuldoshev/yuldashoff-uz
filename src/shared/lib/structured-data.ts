import { SITE_CONFIG } from "@/config/site-config";
import { SOCIAL_LINKS } from "@/config/social-links";
import { WORK_EXPERIENCE } from "@/config/work-experience";

const PERSON_ID = `${SITE_CONFIG.url}/#person`;
const WEBSITE_ID = `${SITE_CONFIG.url}/#website`;

/** The site owner, referenced by every other node. */
export function buildPersonSchema(): Record<string, unknown> {
	const currentJob = WORK_EXPERIENCE.find((job) => job.end === "Present");

	return {
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": PERSON_ID,
		name: SITE_CONFIG.name,
		url: SITE_CONFIG.url,
		image: SITE_CONFIG.avatar,
		email: `mailto:${SITE_CONFIG.email}`,
		jobTitle: SITE_CONFIG.role,
		description: SITE_CONFIG.description,
		knowsAbout: SITE_CONFIG.focusAreas,
		sameAs: SOCIAL_LINKS.map((link) => link.href),
		...(currentJob
			? { worksFor: { "@type": "Organization", name: currentJob.company } }
			: {}),
	};
}

export function buildWebSiteSchema(): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": WEBSITE_ID,
		url: SITE_CONFIG.url,
		name: SITE_CONFIG.name,
		description: SITE_CONFIG.description,
		inLanguage: "en",
		publisher: { "@id": PERSON_ID },
	};
}

type ArticleSchemaOptions = {
	title: string;
	description: string;
	slug: string;
	publishedAt: string;
};

export function buildBlogPostingSchema({
	title,
	description,
	slug,
	publishedAt,
}: ArticleSchemaOptions): Record<string, unknown> {
	const url = `${SITE_CONFIG.url}/blog/${slug}`;

	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"@id": `${url}#article`,
		headline: title,
		description,
		url,
		mainEntityOfPage: url,
		datePublished: publishedAt,
		dateModified: publishedAt,
		image: `${url}/opengraph-image`,
		inLanguage: "uz",
		author: { "@id": PERSON_ID },
		publisher: { "@id": PERSON_ID },
		isPartOf: { "@id": WEBSITE_ID },
	};
}

type ProjectSchemaOptions = {
	title: string;
	description: string;
	slug: string;
	publishedAt: string;
	href?: string;
	image?: string;
};

export function buildProjectSchema({
	title,
	description,
	slug,
	publishedAt,
	href,
	image,
}: ProjectSchemaOptions): Record<string, unknown> {
	const url = `${SITE_CONFIG.url}/projects/${slug}`;

	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		"@id": `${url}#project`,
		name: title,
		description,
		url,
		dateCreated: publishedAt,
		creator: { "@id": PERSON_ID },
		isPartOf: { "@id": WEBSITE_ID },
		...(href ? { sameAs: href } : {}),
		...(image ? { image: `${SITE_CONFIG.url}${image}` } : {}),
	};
}

type BreadcrumbItem = {
	name: string;
	path: string;
};

export function buildBreadcrumbSchema(
	items: BreadcrumbItem[],
): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${SITE_CONFIG.url}${item.path}`,
		})),
	};
}
