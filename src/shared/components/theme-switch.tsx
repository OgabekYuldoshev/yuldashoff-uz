"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

const THEME_OPTIONS = [
	{ id: "light", label: "Light", icon: <SunIcon /> },
	{ id: "dark", label: "Dark", icon: <MoonIcon /> },
	{ id: "system", label: "System", icon: <MonitorIcon /> },
];

/** Light / dark / system theme picker. Renders after hydration to avoid a theme flash. */
export function ThemeSwitch() {
	const [isMounted, setIsMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		// Reserve the control's footprint so the header does not shift on hydration.
		return <div className="h-9 w-28 shrink-0" aria-hidden />;
	}

	return (
		<ToggleGroup
			type="single"
			variant="outline"
			value={theme}
			// Radix clears the value when the active item is pressed again; the site
			// always needs one of the three modes selected.
			onValueChange={(value) => {
				if (value) {
					setTheme(value);
				}
			}}
			className="shrink-0"
		>
			{THEME_OPTIONS.map((option) => (
				<ToggleGroupItem
					key={option.id}
					value={option.id}
					aria-label={`Switch to ${option.label} theme`}
					// The theme's `accent` is nearly identical to `background` in light
					// mode, so the selected mode is marked with `primary` instead.
					className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
				>
					{option.icon}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
