import {
	ConnectSection,
	IntroSection,
	PostsSection,
	ProjectsSection,
	WorkExperienceSection,
} from "@/features/home";

import { getPosts } from "@/features/blog";
import { getProjects } from "@/features/projects";
import {
	AnimatedContainer,
	AnimatedSection,
} from "@/shared/components/animated-container";

export default async function HomePage() {
	const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

	return (
		<AnimatedContainer className="space-y-24">
			<AnimatedSection>
				<IntroSection />
			</AnimatedSection>

			{projects.length > 0 && (
				<AnimatedSection>
					<ProjectsSection projects={projects} />
				</AnimatedSection>
			)}

			<AnimatedSection>
				<WorkExperienceSection />
			</AnimatedSection>

			{posts.length > 0 && (
				<AnimatedSection>
					<PostsSection posts={posts} />
				</AnimatedSection>
			)}

			<AnimatedSection>
				<ConnectSection />
			</AnimatedSection>
		</AnimatedContainer>
	);
}
