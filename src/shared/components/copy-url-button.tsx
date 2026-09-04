"use client";

import { CheckIcon, LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/shared/ui/button";
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
		<Button
			type="button"
			variant="ghost"
			size="sm"
			onClick={handleCopy}
			className="-mr-2 text-muted-foreground"
		>
			{isCopied ? <CheckIcon aria-hidden /> : <LinkIcon aria-hidden />}
			<TextMorph>{isCopied ? "Copied" : "Copy URL"}</TextMorph>
		</Button>
	);
}
