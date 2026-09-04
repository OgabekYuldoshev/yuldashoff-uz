import type { OstDocument } from "outstatic";

/** A blog entry as stored in the `posts` Outstatic collection. */
export type Post = OstDocument & {
	description: string;
};
