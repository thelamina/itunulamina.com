import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="font-serif text-6xl font-bold mb-4">404</h1>
      <h2 className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
        Page not found
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Go back home
      </Link>
    </section>
  );
}

