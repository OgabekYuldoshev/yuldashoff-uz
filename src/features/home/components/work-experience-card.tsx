import type { WorkExperience } from "@/config/work-experience";
import { Spotlight } from "@/shared/ui/spotlight";

const SPOTLIGHT_SIZE = 64;

const CARD_CLASS_NAME =
	"relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30";

type WorkExperienceCardProps = {
	job: WorkExperience;
};

export function WorkExperienceCard({ job }: WorkExperienceCardProps) {
	const content = (
		<>
			<Spotlight
				className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
				size={SPOTLIGHT_SIZE}
			/>
			<div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
				<div className="relative flex w-full flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
					<div>
						<h3 className="font-normal dark:text-zinc-100">{job.title}</h3>
						<p className="text-zinc-500 dark:text-zinc-400">{job.company}</p>
					</div>
					<p className="shrink-0 text-sm whitespace-nowrap text-zinc-600 dark:text-zinc-400">
						{job.start} - {job.end}
					</p>
				</div>
			</div>
		</>
	);

	// An entry without a company site must not look or behave like a link.
	if (!job.href) {
		return <div className={CARD_CLASS_NAME}>{content}</div>;
	}

	return (
		<a
			href={job.href}
			target="_blank"
			rel="noopener noreferrer"
			className={CARD_CLASS_NAME}
		>
			{content}
		</a>
	);
}
