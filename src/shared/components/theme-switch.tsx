"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/shared/ui/button";

/** Toggles between the light and dark themes. Renders after hydration to avoid a theme flash. */
export function ThemeSwitch() {
	const [isMounted, setIsMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		// Reserve the control's footprint so the header does not shift on hydration.
		return <div className="size-9 shrink-0" aria-hidden />;
	}

	const isDark = resolvedTheme === "dark";

	return (
		<Button
			type="button"
			variant="outline"
			size="icon"
			className="shrink-0"
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			onClick={() => setTheme(isDark ? "light" : "dark")}
		>
			{isDark ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
}
