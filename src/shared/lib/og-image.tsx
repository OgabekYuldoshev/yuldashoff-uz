import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE_CONFIG } from "@/config/site-config";

/** Facebook/LinkedIn/X all crop to this ratio. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

// Theme tokens resolved to sRGB: the OG renderer has no access to CSS variables.
const BACKGROUND = "#f4f6f4";
const FOREGROUND = "#1a1c1a";
const MUTED_FOREGROUND = "#5c625c";
const PRIMARY = "#4a634e";
const BORDER = "#d1d5d1";

const FONT_FAMILY = "Golos Text";
const FONT_DIRECTORY = join(process.cwd(), "src/assets/fonts");

// Satori cannot read the `next/font` output, so the same family is loaded from
// disk here. Read once per server process rather than per card.
const fontsPromise = Promise.all([
	readFile(join(FONT_DIRECTORY, "GolosText-Regular.ttf")),
	readFile(join(FONT_DIRECTORY, "GolosText-SemiBold.ttf")),
]).then(([regular, semiBold]) => [
	{
		name: FONT_FAMILY,
		data: regular,
		weight: 400 as const,
		style: "normal" as const,
	},
	{
		name: FONT_FAMILY,
		data: semiBold,
		weight: 600 as const,
		style: "normal" as const,
	},
]);

type OgImageOptions = {
	/** Small label above the title, e.g. "Blog" or "Project". */
	eyebrow: string;
	title: string;
	description?: string;
};

/** Shared social card: one layout for the site, posts and projects. */
export async function renderOgImage({
	eyebrow,
	title,
	description,
}: OgImageOptions) {
	const fonts = await fontsPromise;

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				backgroundColor: BACKGROUND,
				fontFamily: FONT_FAMILY,
			}}
		>
			<div style={{ width: 20, height: "100%", backgroundColor: PRIMARY }} />
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "72px 80px",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							fontSize: 26,
							fontWeight: 600,
							letterSpacing: 4,
							textTransform: "uppercase",
							color: PRIMARY,
						}}
					>
						{eyebrow}
					</div>
					<div
						style={{
							marginTop: 28,
							fontSize: title.length > 60 ? 62 : 76,
							fontWeight: 600,
							lineHeight: 1.15,
							letterSpacing: -2,
							color: FOREGROUND,
						}}
					>
						{title}
					</div>
					{description ? (
						<div
							style={{
								marginTop: 24,
								fontSize: 30,
								lineHeight: 1.4,
								color: MUTED_FOREGROUND,
							}}
						>
							{description}
						</div>
					) : null}
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 20,
						paddingTop: 32,
						borderTop: `2px solid ${BORDER}`,
					}}
				>
					<div
						style={{
							width: 44,
							height: 44,
							borderRadius: 10,
							backgroundColor: PRIMARY,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div
							style={{
								width: 22,
								height: 22,
								borderRadius: 11,
								border: `6px solid ${BACKGROUND}`,
							}}
						/>
					</div>
					<div style={{ fontSize: 28, fontWeight: 600, color: FOREGROUND }}>
						{SITE_CONFIG.name}
					</div>
					<div style={{ fontSize: 28, color: MUTED_FOREGROUND }}>
						{SITE_CONFIG.url.replace("https://", "")}
					</div>
				</div>
			</div>
		</div>,
		{ ...OG_IMAGE_SIZE, fonts },
	);
}
