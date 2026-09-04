import { cn } from "cn";
import type { ComponentProps } from "react";
import Markdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";

/**
 * Element styling comes from `@tailwindcss/typography` (the `prose` classes on
 * the article shell), which already covers headings, lists, tables and dark
 * mode. Only the two things prose does not handle are overridden here.
 */
const MARKDOWN_COMPONENTS: Components = {
	a: ({ children, ...props }) => (
		<a {...props} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	),
	code: ({ children, className, ...props }) => {
		// react-markdown renders both inline code and fenced blocks as `code`.
		// A block carries a `language-*` class, or — when the fence has no
		// language — spans more than one line.
		const isBlock =
			/\blanguage-/.test(className ?? "") || String(children).includes("\n");

		if (isBlock) {
			// Highlight token classes live on this element and its descendants;
			// the colours are defined in `globals.css`.
			return (
				<code {...props} className={className}>
					{children}
				</code>
			);
		}

		return (
			<code
				{...props}
				className={cn(
					className,
					"rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground",
				)}
			>
				{children}
			</code>
		);
	},
};

// `detect: false` keeps highlighting to fences that declare a language, so a
// plain ``` block is left as unstyled monospace instead of being guessed at.
const REHYPE_PLUGINS: ComponentProps<typeof Markdown>["rehypePlugins"] = [
	[rehypeHighlight, { detect: false }],
];

type MarkdownContentProps = {
	content: string;
};

/** Renders CMS markdown with the site's typography. */
export function MarkdownContent({ content }: MarkdownContentProps) {
	return (
		<Markdown components={MARKDOWN_COMPONENTS} rehypePlugins={REHYPE_PLUGINS}>
			{content}
		</Markdown>
	);
}
