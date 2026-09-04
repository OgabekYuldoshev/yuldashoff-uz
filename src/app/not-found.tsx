import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
			<h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-50">
				Page not found
			</h1>
			<p className="text-zinc-600 dark:text-zinc-400">
				The page you are looking for does not exist or has been moved.
			</p>
			<Link
				href="/"
				className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
			>
				Back to home
			</Link>
		</main>
	);
}
