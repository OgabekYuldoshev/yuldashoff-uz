import { SITE_CONFIG } from "@/config/site-config";

export function IntroSection() {
	return (
		<div className="flex-1">
			<h1 className="mb-4 text-2xl font-medium text-zinc-900 dark:text-zinc-50">
				{SITE_CONFIG.description}
			</h1>
			<p className="text-zinc-600 dark:text-zinc-400">
				I&apos;m a passionate full-stack developer specializing in building
				AI-powered web applications. With a focus on clean code and intuitive
				user experiences, I create solutions that are both technically robust
				and user-friendly. I enjoy tackling complex problems and turning them
				into elegant digital solutions.
			</p>
		</div>
	);
}
