import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";

import { CopyUrlButton } from "@/shared/components/copy-url-button";
import { Button } from "@/shared/ui/button";
import { ScrollProgress } from "@/shared/ui/scroll-progress";

/** Reading shell shared by blog posts and project write-ups. */
export function ArticleLayout({ children }: PropsWithChildren) {
	return (
		<>
			<div className="pointer-events-none fixed top-0 left-0 z-10 h-12 w-full bg-background backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />
			<ScrollProgress
				className="fixed top-0 z-20 h-0.5 bg-primary"
				springOptions={{ bounce: 0 }}
			/>

			<div className="flex items-center justify-between">
				<Button asChild variant="ghost" size="sm" className="-ml-2">
					<Link href="/">
						<ArrowLeft aria-hidden />
						Back
					</Link>
				</Button>
				<CopyUrlButton />
			</div>

			<main className="prose prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium prose-code:before:content-none prose-code:after:content-none mt-8 max-w-none">
				{children}
			</main>
		</>
	);
}
