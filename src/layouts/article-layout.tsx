import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";

import { CopyUrlButton } from "@/shared/components/copy-url-button";
import { Magnetic } from "@/shared/ui/magnetic";
import { ScrollProgress } from "@/shared/ui/scroll-progress";

const BACK_ICON_SIZE = 16;

/** Reading shell shared by blog posts and project write-ups. */
export function ArticleLayout({ children }: PropsWithChildren) {
	return (
		<>
			<div className="pointer-events-none fixed top-0 left-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
			<ScrollProgress
				className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600"
				springOptions={{ bounce: 0 }}
			/>

			<div className="flex items-center justify-between">
				<Magnetic>
					<Link href="/" aria-label="Back to home">
						<ArrowLeft size={BACK_ICON_SIZE} />
					</Link>
				</Magnetic>
				<CopyUrlButton />
			</div>

			<main className="prose prose-gray prose-h4:prose-base dark:prose-invert prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium mt-8">
				{children}
			</main>
		</>
	);
}
