type JsonLdProps = {
	/** A schema.org node, serialised into the page for search engines. */
	data: Record<string, unknown>;
};

/**
 * Structured data is a `<script type="application/ld+json">` tag, which React
 * can only render through `dangerouslySetInnerHTML`. The payload is built by
 * this codebase from CMS fields, never from user input.
 */
export function JsonLd({ data }: JsonLdProps) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: the only way to emit a JSON-LD script tag.
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data).replace(/</g, "\\u003c"),
			}}
		/>
	);
}
