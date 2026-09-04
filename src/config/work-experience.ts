export type WorkExperience = {
	id: string;
	company: string;
	title: string;
	start: string;
	end: string;
	/** Company website. Omit when there is none — the entry then renders unlinked. */
	href?: string;
};

export const WORK_EXPERIENCE: WorkExperience[] = [
	{
		id: "ministry-of-justice",
		company: "Ministry of Justice of the Republic of Uzbekistan",
		title: "FullStack developer",
		start: "2022",
		end: "Present",
		href: "http://adliya.uz/",
	},
	{
		id: "upwork",
		company: "Upwork",
		title: "Freelance",
		start: "2021",
		end: "2023",
		href: "https://www.upwork.com/freelancers/~0191779093824e4768",
	},
	{
		id: "zetsoft",
		company: "Zetsoft LLC",
		title: "Front-end Developer",
		start: "2020",
		end: "2021",
	},
];
