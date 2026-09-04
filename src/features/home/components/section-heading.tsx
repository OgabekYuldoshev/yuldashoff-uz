import type { PropsWithChildren } from "react";

export function SectionHeading({ children }: PropsWithChildren) {
	return (
		<h2 className="mb-5 flex items-center gap-2.5 text-lg font-medium tracking-tight">
			<span className="h-4 w-1 rounded-full bg-primary" aria-hidden />
			{children}
		</h2>
	);
}
