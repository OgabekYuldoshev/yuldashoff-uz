"use client";

import { ArrowUpRight } from "lucide-react";
import type { PropsWithChildren } from "react";

import { Button } from "@/shared/ui/button";
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
			<Button asChild variant="outline" size="sm" className="rounded-full">
				<a href={href} target="_blank" rel="noopener noreferrer">
					{children}
					<ArrowUpRight aria-hidden />
				</a>
			</Button>
		</Magnetic>
	);
}
