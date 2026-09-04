import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Golos_Text, JetBrains_Mono } from "next/font/google";
import type { PropsWithChildren } from "react";

import { SITE_CONFIG } from "@/config/site-config";
import { JsonLd } from "@/shared/components/json-ld";
import {
	buildPersonSchema,
	buildWebSiteSchema,
} from "@/shared/lib/structured-data";

// Families named by the design theme, self-hosted through next/font.
const golosText = Golos_Text({
	variable: "--font-golos-text",
	subsets: ["latin", "cyrillic"],
	display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	display: "swap",
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f4f6f4" },
		{ media: "(prefers-color-scheme: dark)", color: "#161616" },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_CONFIG.url),
	title: {
		default: SITE_CONFIG.title,
		template: `%s | ${SITE_CONFIG.name}`,
	},
	description: SITE_CONFIG.description,
	applicationName: SITE_CONFIG.name,
	authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
	creator: SITE_CONFIG.name,
	publisher: SITE_CONFIG.name,
	keywords: [
		SITE_CONFIG.name,
		"TypeScript developer",
		"JavaScript developer",
		"full-stack developer",
		"React",
		"Next.js",
		"Uzbekistan",
		...SITE_CONFIG.focusAreas,
	],
	alternates: {
		canonical: "/",
		types: { "application/rss+xml": `${SITE_CONFIG.url}/blog/rss.xml` },
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: SITE_CONFIG.url,
		siteName: SITE_CONFIG.name,
		title: SITE_CONFIG.title,
		description: SITE_CONFIG.description,
	},
	twitter: {
		card: "summary_large_image",
		title: SITE_CONFIG.title,
		description: SITE_CONFIG.description,
	},
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${golosText.variable} ${jetBrainsMono.variable} bg-background text-foreground font-sans antialiased`}
			>
				{children}
				<JsonLd data={buildPersonSchema()} />
				<JsonLd data={buildWebSiteSchema()} />
			</body>
		</html>
	);
}
