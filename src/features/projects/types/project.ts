import type { OstDocument } from "outstatic";

/** A portfolio entry as stored in the `projects` Outstatic collection. */
export type Project = OstDocument & {
	image: string;
	href: string;
};
