import Link from "next/link";

import { Button } from "@/shared/ui/button";

export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
			<h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
			<p className="text-muted-foreground">
				The page you are looking for does not exist or has been moved.
			</p>
			<Button asChild className="mt-2 rounded-full">
				<Link href="/">Back to home</Link>
			</Button>
		</main>
	);
}
