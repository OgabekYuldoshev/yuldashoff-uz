import Link from "next/link";

import { SITE_CONFIG } from "@/config/site-config";
import { SiteNav } from "@/shared/components/site-nav";
import { ThemeSwitch } from "@/shared/components/theme-switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

const INITIALS = SITE_CONFIG.name
	.split(" ")
	.map((part) => part[0])
	.join("");

export function SiteHeader() {
	return (
		<header className="reveal mb-10">
			<div className="flex items-center justify-between gap-4">
				<div className="flex min-w-0 items-center gap-3">
					<Avatar className="size-11 ring-2 ring-primary/20">
						<AvatarImage src={SITE_CONFIG.avatar} alt={SITE_CONFIG.name} />
						<AvatarFallback>{INITIALS}</AvatarFallback>
					</Avatar>
					<div className="min-w-0">
						<Link
							href="/"
							className="font-semibold tracking-tight transition-colors hover:text-primary"
						>
							{SITE_CONFIG.name}
						</Link>
						<p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
							{SITE_CONFIG.role}
						</p>
					</div>
				</div>
				<ThemeSwitch />
			</div>
			<SiteNav />
		</header>
	);
}
