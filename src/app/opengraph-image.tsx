import { SITE_CONFIG } from "@/config/site-config";
import {
	OG_IMAGE_CONTENT_TYPE,
	OG_IMAGE_SIZE,
	renderOgImage,
} from "@/shared/lib/og-image";

export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function OpengraphImage() {
	return renderOgImage({
		eyebrow: SITE_CONFIG.role,
		title: SITE_CONFIG.description,
		description: SITE_CONFIG.focusAreas.join(" · "),
	});
}
