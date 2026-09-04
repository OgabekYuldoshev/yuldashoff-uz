import type { PropsWithChildren } from "react";

import type { WorkExperience } from "@/config/work-experience";
import { Card } from "@/shared/ui/card";

type WorkExperienceCardProps = {
	job: WorkExperience;
};

export function WorkExperienceCard({ job }: WorkExperienceCardProps) {
	return (
		<CardShell href={job.href}>
			<div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
				<div>
					<h3 className="font-medium">{job.title}</h3>
					<p className="text-sm text-muted-foreground">{job.company}</p>
				</div>
				<p className="shrink-0 text-sm whitespace-nowrap text-muted-foreground">
					{job.start} - {job.end}
				</p>
			</div>
		</CardShell>
	);
}

type CardShellProps = PropsWithChildren<{
	href?: string;
}>;

/** An entry without a company site must not look or behave like a link. */
function CardShell({ children, href }: CardShellProps) {
	const className = "p-4 shadow-xs";

	if (!href) {
		return <Card className={className}>{children}</Card>;
	}

	return (
		<a href={href} target="_blank" rel="noopener noreferrer" className="block">
			<Card className={`${className} transition-colors hover:bg-accent/40`}>
				{children}
			</Card>
		</a>
	);
}
