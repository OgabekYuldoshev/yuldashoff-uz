import type { OstDocument } from "outstatic";

export interface Project extends OstDocument {
	description: string;
	coverImage: string;
	techStack: Array<{ label: string; value: string }>;
}

export interface Post extends OstDocument {
	excerpt: string;
	coverImage: string;
}
