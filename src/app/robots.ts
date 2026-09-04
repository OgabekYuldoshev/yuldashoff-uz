import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/site-config";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/", "/outstatic/"],
		},
		sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
	};
}
