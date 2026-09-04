import type { CSSProperties, PropsWithChildren } from "react";

import { cn } from "@/shared/utils/cn";

type RevealProps = PropsWithChildren<{
	/** Position in the stagger sequence; each step delays the reveal by 150ms. */
	index?: number;
	className?: string;
}>;

/**
 * Section that fades and slides into view on load. The animation is pure CSS, so
 * the section is rendered by the browser whether or not the page's JS has run.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
	return (
		<section
			className={cn("reveal", className)}
			style={{ "--reveal-index": index } as CSSProperties}
		>
			{children}
		</section>
	);
}
