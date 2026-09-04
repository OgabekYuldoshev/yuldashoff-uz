import { SITE_CONFIG } from "@/config/site-config";
import { Separator } from "@/shared/ui/separator";
import { TextLoop } from "@/shared/ui/text-loop";

export function SiteFooter() {
	return (
		<footer className="mt-24 pb-8">
			<Separator className="mb-4" />
			<a
				href={SITE_CONFIG.repository}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block text-xs text-muted-foreground transition-colors hover:text-foreground"
			>
				<TextLoop>
					<span>
						© {new Date().getFullYear()} {SITE_CONFIG.name}.
					</span>
					<span>{SITE_CONFIG.description}</span>
				</TextLoop>
			</a>
		</footer>
	);
}
