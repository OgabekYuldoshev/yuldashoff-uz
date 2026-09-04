import type { PropsWithChildren } from "react";

export function SectionHeading({ children }: PropsWithChildren) {
	return <h3 className="mb-5 text-lg font-medium">{children}</h3>;
}
