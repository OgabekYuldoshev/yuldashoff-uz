import Markdown, { type Components } from "react-markdown";

import { cn } from "@/shared/utils/cn";

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
					"rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.875em] text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
				)}
			>
				{children}
			</code>
		);
	},
};

type MarkdownContentProps = {
	content: string;
};

/** Renders CMS markdown with the site's typography. */
export function MarkdownContent({ content }: MarkdownContentProps) {
	return <Markdown components={MARKDOWN_COMPONENTS}>{content}</Markdown>;
}
