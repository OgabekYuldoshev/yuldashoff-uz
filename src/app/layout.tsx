import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { PropsWithChildren } from "react";

import { SITE_CONFIG } from "@/config/site-config";

// Families named by the design theme, self-hosted through next/font.
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f5f6f5" },
		{ media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_CONFIG.url),
	title: {
		default: SITE_CONFIG.title,
		template: `%s | ${SITE_CONFIG.name}`,
	},
	description: SITE_CONFIG.description,
	openGraph: {
		type: "website",
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
				className={`${inter.variable} ${jetBrainsMono.variable} bg-background text-foreground font-sans antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
