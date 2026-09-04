"use client";

import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/config/navigation";
import { Button } from "@/shared/ui/button";

/** A section is current when the URL is its page or any page nested under it. */
function isCurrent(pathname: string, href: string): boolean {
	if (href === "/") {
		return pathname === "/";
	}

	return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
	const pathname = usePathname();

	return (
		<nav aria-label="Main" className="-ml-2 mt-4 flex items-center gap-1">
			{NAV_ITEMS.map((item) => {
				const current = isCurrent(pathname, item.href);

				return (
					<Button
						key={item.href}
						asChild
						variant="ghost"
						size="sm"
						className={cn(
							"text-muted-foreground",
							current && "bg-accent text-accent-foreground",
						)}
					>
						<Link href={item.href} aria-current={current ? "page" : undefined}>
							{item.label}
						</Link>
					</Button>
				);
			})}
		</nav>
	);
}
