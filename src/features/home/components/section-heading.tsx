import type { PropsWithChildren, ReactNode } from "react";

type SectionHeadingProps = PropsWithChildren<{
	/** Optional control shown opposite the title, e.g. a "View all" link. */
	action?: ReactNode;
}>;

export function SectionHeading({ children, action }: SectionHeadingProps) {
	return (
		<div className="mb-5 flex items-center justify-between gap-4">
			<h2 className="flex items-center gap-2.5 text-lg font-medium tracking-tight">
				<span className="h-4 w-1 rounded-full bg-primary" aria-hidden />
				{children}
			</h2>
			{action}
		</div>
	);
}
