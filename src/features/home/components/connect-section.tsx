import { SITE_CONFIG } from "@/config/site-config";
import { SOCIAL_LINKS } from "@/config/social-links";

import { MagneticSocialLink } from "./magnetic-social-link";
import { SectionHeading } from "./section-heading";

export function ConnectSection() {
	return (
		<>
			<SectionHeading>Connect</SectionHeading>
			<p className="mb-5 text-zinc-600 dark:text-zinc-400">
				Feel free to contact me at{" "}
				<a
					className="underline dark:text-zinc-300"
					href={`mailto:${SITE_CONFIG.email}`}
				>
					{SITE_CONFIG.email}
				</a>
			</p>
			<div className="flex flex-wrap items-center justify-start gap-3">
				{SOCIAL_LINKS.map((social) => (
					<MagneticSocialLink key={social.label} href={social.href}>
						{social.label}
					</MagneticSocialLink>
				))}
			</div>
		</>
	);
}
