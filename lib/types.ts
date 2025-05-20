import type { OstDocument } from "outstatic";

export interface Project extends OstDocument {
	image: string;
	href: string;
}

export interface Post extends OstDocument {
	description: string
}
