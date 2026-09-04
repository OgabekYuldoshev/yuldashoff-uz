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

export default async function HomePage() {
	const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

	let revealIndex = 0;

	return (
		<main className="space-y-24">
			<Reveal index={revealIndex++}>
				<IntroSection />
			</Reveal>

			{projects.length > 0 && (
				<Reveal id="projects" index={revealIndex++}>
					<ProjectsSection projects={projects} />
				</Reveal>
			)}

			<Reveal id="experience" index={revealIndex++}>
				<WorkExperienceSection />
			</Reveal>

			{posts.length > 0 && (
				<Reveal id="blog" index={revealIndex++}>
					<PostsSection posts={posts} />
				</Reveal>
			)}

			<Reveal id="connect" index={revealIndex++}>
				<ConnectSection />
			</Reveal>
		</main>
	);
}
