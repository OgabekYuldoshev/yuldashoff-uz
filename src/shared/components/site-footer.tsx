"use client";

import { SITE_CONFIG } from "@/config/site-config";
import { ThemeSwitch } from "@/shared/components/theme-switch";
import { TextLoop } from "@/shared/ui/text-loop";

export function SiteFooter() {
	return (
		<footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
			<div className="flex items-center justify-between">
				<a
					href={SITE_CONFIG.repository}
					target="_blank"
					rel="noopener noreferrer"
				>
					<TextLoop className="text-xs text-zinc-500">
						<span>
							© {new Date().getFullYear()} {SITE_CONFIG.name}.
						</span>
						<span>{SITE_CONFIG.description}</span>
					</TextLoop>
				</a>
				<div className="text-xs text-zinc-400">
					<ThemeSwitch />
				</div>
			</div>
		</footer>
	);
}
