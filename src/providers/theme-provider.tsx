"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";

const THEME_STORAGE_KEY = "theme";

export function ThemeProvider({ children }: PropsWithChildren) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			storageKey={THEME_STORAGE_KEY}
		>
			{children}
		</NextThemesProvider>
	);
}
