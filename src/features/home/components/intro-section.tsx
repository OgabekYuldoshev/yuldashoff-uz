import { SITE_CONFIG } from "@/config/site-config";
import { Badge } from "@/shared/ui/badge";

export function IntroSection() {
	return (
		<div>
			<h1 className="text-3xl font-semibold tracking-tight text-balance">
				{SITE_CONFIG.description}
			</h1>
			<div className="mt-4 flex flex-wrap gap-2">
				{SITE_CONFIG.focusAreas.map((area) => (
					<Badge key={area} variant="secondary">
						{area}
					</Badge>
				))}
			</div>
			<p className="mt-5 text-muted-foreground">
				I&apos;m a passionate full-stack developer specializing in building
				AI-powered web applications. With a focus on clean code and intuitive
				user experiences, I create solutions that are both technically robust
				and user-friendly. I enjoy tackling complex problems and turning them
				into elegant digital solutions.
			</p>
		</div>
	);
}
