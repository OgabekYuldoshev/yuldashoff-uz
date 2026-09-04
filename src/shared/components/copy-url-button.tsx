"use client";

import { useEffect, useState } from "react";

import { TextMorph } from "@/shared/ui/text-morph";

const COPY_FEEDBACK_DURATION_MS = 2000;

/** Copies the current page URL to the clipboard and confirms it for a short moment. */
export function CopyUrlButton() {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (!isCopied) {
			return;
		}

		const timeout = setTimeout(() => {
			setIsCopied(false);
		}, COPY_FEEDBACK_DURATION_MS);

		return () => clearTimeout(timeout);
	}, [isCopied]);

	async function handleCopy() {
		await navigator.clipboard.writeText(window.location.href);
		setIsCopied(true);
	}

	return (
		<button
			type="button"
			onClick={handleCopy}
			className="font-base flex items-center gap-1 text-center text-sm text-zinc-500 transition-colors dark:text-zinc-400"
		>
			<TextMorph>{isCopied ? "Copied" : "Copy"}</TextMorph>
			<span>URL</span>
		</button>
	);
}
