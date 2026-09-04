import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/site-config";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_CONFIG.name,
		short_name: SITE_CONFIG.name.split(" ")[0],
		description: SITE_CONFIG.description,
		start_url: "/",
		display: "standalone",
		background_color: "#f4f6f4",
		theme_color: "#4a634e",
		icons: [
			{
				src: "/icon-192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/icon-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
		],
	};
}
