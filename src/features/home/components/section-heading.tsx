import type { PropsWithChildren } from "react";

export function SectionHeading({ children }: PropsWithChildren) {
	return <h2 className="mb-5 text-lg font-medium">{children}</h2>;
}
