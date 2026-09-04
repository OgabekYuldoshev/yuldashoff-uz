import Link from "next/link";

import { SITE_CONFIG } from "@/config/site-config";

export function SiteHeader() {
	return (
		<header className="reveal mb-8 flex items-center justify-between">
			<div>
				<Link href="/" className="font-medium text-black dark:text-white">
					{SITE_CONFIG.name}
				</Link>
				<p className="text-zinc-500 dark:text-zinc-400">
					{SITE_CONFIG.tagline}
				</p>
			</div>
		</header>
	);
}
