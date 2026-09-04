import { WORK_EXPERIENCE } from "@/config/work-experience";

import { SectionHeading } from "./section-heading";
import { WorkExperienceCard } from "./work-experience-card";

export function WorkExperienceSection() {
	return (
		<>
			<SectionHeading>Work Experience</SectionHeading>
			<div className="flex flex-col space-y-2">
				{WORK_EXPERIENCE.map((job) => (
					<WorkExperienceCard key={job.id} job={job} />
				))}
			</div>
		</>
	);
}
