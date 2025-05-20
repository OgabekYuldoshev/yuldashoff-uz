import { uid } from "radash";


type WorkExperience = {
	company: string;
	title: string;
	start: string;
	end: string;
	link: string;
	id: string;
};


type SocialLink = {
	label: string;
	link: string;
};


export const WORK_EXPERIENCE: WorkExperience[] = [
	{
		company: "Ministry of Justice of the Republic of Uzbekistan",
		title: "FullStack developer",
		start: "2022",
		end: "Present",
		link: "http://adliya.uz/",
		id: uid(8),
	},
	{
		company: "Upwork",
		title: "Freelance",
		start: "2021",
		end: "2023",
		link: "https://www.upwork.com/freelancers/~0191779093824e4768",
		id: uid(8),
	},
	{
		company: "Zetsoft LLC",
		title: "Front-end Developer",
		start: "2020",
		end: "2021",
		link: "#",
		id: uid(8),
	},
];



export const SOCIAL_LINKS: SocialLink[] = [
	{
		label: "Github",
		link: "https://github.com/OgabekYuldoshev",
	},
	{
		label: "Telegram",
		link: "https://t.me/ogabek_yuldashoff",
	},
	{
		label: "LinkedIn",
		link: "https://www.linkedin.com/in/ogabekyuldoshev",
	},
	{
		label: "Instagram",
		link: "https://www.instagram.com/ogabek_yuldashoff",
	},
];

export const EMAIL = "yuldashoff1@gmail.com";
