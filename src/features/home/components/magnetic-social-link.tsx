"use client";

import { ArrowUpRight } from "lucide-react";
import type { PropsWithChildren } from "react";

import { Magnetic } from "@/shared/ui/magnetic";

const MAGNETIC_INTENSITY = 0.3;

type MagneticSocialLinkProps = PropsWithChildren<{
	href: string;
}>;

export function MagneticSocialLink({
	children,
	href,
}: MagneticSocialLinkProps) {
	return (
		<Magnetic springOptions={{ bounce: 0 }} intensity={MAGNETIC_INTENSITY}>
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
			>
				{children}
				<ArrowUpRight className="h-3 w-3" aria-hidden />
			</a>
		</Magnetic>
	);
}
