"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";

const THEME_STORAGE_KEY = "theme";

export function ThemeProvider({ children }: PropsWithChildren) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="light"
			// The site offers a light/dark toggle only, so the OS preference is not
			// followed: a first visit always starts in light mode.
			enableSystem={false}
			storageKey={THEME_STORAGE_KEY}
		>
			{children}
		</NextThemesProvider>
	);
}
