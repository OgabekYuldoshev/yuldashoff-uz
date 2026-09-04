"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { AnimatedBackground } from "@/shared/ui/animated-background";

const THEME_OPTIONS = [
	{
		id: "light",
		label: "Light",
		icon: <SunIcon className="h-4 w-4" />,
	},
	{
		id: "dark",
		label: "Dark",
		icon: <MoonIcon className="h-4 w-4" />,
	},
	{
		id: "system",
		label: "System",
		icon: <MonitorIcon className="h-4 w-4" />,
	},
];

/** Light / dark / system theme picker. Renders only after hydration to avoid a theme flash. */
export function ThemeSwitch() {
	const [isMounted, setIsMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		// Reserve the control's footprint so the header does not shift on hydration.
		return <div className="h-9 w-27 shrink-0" aria-hidden />;
	}

	return (
		<div className="flex shrink-0 items-center">
			<AnimatedBackground
				className="pointer-events-none rounded-lg bg-zinc-100 dark:bg-zinc-800"
				defaultValue={theme}
				transition={{
					type: "spring",
					bounce: 0,
					duration: 0.2,
				}}
				enableHover={false}
				onValueChange={(id) => setTheme(id as string)}
			>
				{THEME_OPTIONS.map((option) => (
					<button
						key={option.id}
						type="button"
						className="inline-flex h-9 w-9 items-center justify-center text-zinc-500 transition-colors duration-100 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
						aria-label={`Switch to ${option.label} theme`}
						data-id={option.id}
					>
						{option.icon}
					</button>
				))}
			</AnimatedBackground>
		</div>
	);
}
