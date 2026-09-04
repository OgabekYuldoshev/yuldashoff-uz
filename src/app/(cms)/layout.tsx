import type { PropsWithChildren } from "react";

export default function CmsLayout({ children }: PropsWithChildren) {
	return <div id="outstatic">{children}</div>;
}
