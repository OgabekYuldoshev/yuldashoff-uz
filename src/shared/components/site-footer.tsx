import { SITE_CONFIG } from "@/config/site-config";
import { TextLoop } from "@/shared/ui/text-loop";

export function SiteFooter() {
	return (
		<footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
			<a
				href={SITE_CONFIG.repository}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block"
			>
				<TextLoop className="text-xs text-zinc-500 dark:text-zinc-400">
					<span>
						© {new Date().getFullYear()} {SITE_CONFIG.name}.
					</span>
					<span>{SITE_CONFIG.description}</span>
				</TextLoop>
			</a>
		</footer>
	);
}
