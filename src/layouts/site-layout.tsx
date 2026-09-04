import type { PropsWithChildren } from "react";

import { ThemeProvider } from "@/providers/theme-provider";
import { SiteFooter } from "@/shared/components/site-footer";
import { SiteHeader } from "@/shared/components/site-header";

/** Shell for every public page: theme context, centered column, header and footer. */
export function SiteLayout({ children }: PropsWithChildren) {
	return (
		<ThemeProvider>
			<div className="flex min-h-screen w-full flex-col">
				<div className="relative mx-auto w-full max-w-(--breakpoint-sm) flex-1 px-4 pt-20">
					<SiteHeader />
					{children}
					<SiteFooter />
				</div>
			</div>
		</ThemeProvider>
	);
}
