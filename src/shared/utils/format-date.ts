const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
	// Fixed to UTC so the string is identical on the server and in the browser.
	timeZone: "UTC",
});

/** Format an ISO timestamp as e.g. "Jul 1, 2025". */
export function formatDate(isoDate: string): string {
	return DATE_FORMATTER.format(new Date(isoDate));
}

/** Year of an ISO timestamp, e.g. "2025". */
export function formatYear(isoDate: string): string {
	return String(new Date(isoDate).getUTCFullYear());
}
