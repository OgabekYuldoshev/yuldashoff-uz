import {
	ConnectSection,
	IntroSection,
	PostsSection,
	ProjectsSection,
	WorkExperienceSection,
} from "@/features/home";

import { getPosts } from "@/features/blog";
import { getProjects } from "@/features/projects";
import { Reveal } from "@/shared/components/reveal";

// The home page shows a shortlist; the full sets live on /projects and /blog.
const HOME_PROJECT_LIMIT = 3;
const HOME_POST_LIMIT = 3;

export default async function HomePage() {
	const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

	let revealIndex = 0;

	return (
		<main className="space-y-20">
			<Reveal index={revealIndex++}>
				<IntroSection />
			</Reveal>

			{projects.length > 0 && (
				<Reveal id="projects" index={revealIndex++}>
					<ProjectsSection projects={projects.slice(0, HOME_PROJECT_LIMIT)} />
				</Reveal>
			)}

			<Reveal id="experience" index={revealIndex++}>
				<WorkExperienceSection />
			</Reveal>

			{posts.length > 0 && (
				<Reveal id="blog" index={revealIndex++}>
					<PostsSection posts={posts.slice(0, HOME_POST_LIMIT)} />
				</Reveal>
			)}

			<Reveal id="connect" index={revealIndex++}>
				<ConnectSection />
			</Reveal>
		</main>
	);
}
