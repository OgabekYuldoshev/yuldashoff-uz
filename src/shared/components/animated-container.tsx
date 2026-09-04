"use client";

import { motion } from "motion/react";
import type { PropsWithChildren } from "react";

const CONTAINER_VARIANTS = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const SECTION_VARIANTS = {
	hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
	visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const SECTION_TRANSITION = {
	duration: 0.3,
};

type AnimatedContainerProps = PropsWithChildren<{
	className?: string;
}>;

/** Page-level wrapper that staggers the reveal of every `AnimatedSection` inside it. */
export function AnimatedContainer({
	children,
	className,
}: AnimatedContainerProps) {
	return (
		<motion.main
			className={className}
			variants={CONTAINER_VARIANTS}
			initial="hidden"
			animate="visible"
		>
			{children}
		</motion.main>
	);
}

type AnimatedSectionProps = PropsWithChildren<{
	className?: string;
}>;

/** Section that fades and slides into view as part of its parent container's stagger. */
export function AnimatedSection({ children, className }: AnimatedSectionProps) {
	return (
		<motion.section
			className={className}
			variants={SECTION_VARIANTS}
			transition={SECTION_TRANSITION}
		>
			{children}
		</motion.section>
	);
}
