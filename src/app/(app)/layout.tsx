import type { PropsWithChildren } from "react";

import { SiteLayout } from "@/layouts/site-layout";

export default function AppLayout({ children }: PropsWithChildren) {
	return <SiteLayout>{children}</SiteLayout>;
}
