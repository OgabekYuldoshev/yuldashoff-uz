import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

type ViewAllLinkProps = {
	href: string;
	label: string;
};

export function ViewAllLink({ href, label }: ViewAllLinkProps) {
	return (
		<Button
			asChild
			variant="ghost"
			size="sm"
			className="-mr-2 shrink-0 text-muted-foreground"
		>
			<Link href={href}>
				{label}
				<ArrowRight aria-hidden />
			</Link>
		</Button>
	);
}
