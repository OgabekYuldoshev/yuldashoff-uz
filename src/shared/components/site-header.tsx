"use client";

import Link from "next/link";

import { SITE_CONFIG } from "@/config/site-config";
import { TextEffect } from "@/shared/ui/text-effect";

const TAGLINE_DELAY_SECONDS = 0.5;

export function SiteHeader() {
	return (
		<header className="mb-8 flex items-center justify-between">
			<div>
				<Link href="/" className="font-medium text-black dark:text-white">
					{SITE_CONFIG.name}
				</Link>
				<TextEffect
					as="p"
					preset="fade"
					per="char"
					className="text-zinc-600 dark:text-zinc-500"
					delay={TAGLINE_DELAY_SECONDS}
				>
					{SITE_CONFIG.tagline}
				</TextEffect>
			</div>
		</header>
	);
}
