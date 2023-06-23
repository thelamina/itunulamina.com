"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error Occurred",
};

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error({ error });
  }, [error]);

  if (error.message === "NEXT_NOT_FOUND") {
    return <NotFound />;
  }

  return (
    <div>
      <p className="pb-4">Uh oh 😢, something went wrong... maybe refresh?</p>
      <button
        className="group relative border px-4 py-2 text-sm"
        onClick={() => reset()}
      >
        <div className="absolute left-0 top-0 h-full w-0 bg-gradient-to-tr from-slate-200/30 via-slate-300/10 to-slate-700/10 transition-all  group-hover:w-full" />
        Try again
      </button>
    </div>
  );
}

const NotFound = () => {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center transition-colors">
      <p className="pb-4">Uh oh 😢, This content does not exist!</p>
      <Link
        href="/"
        className="group relative border px-4 py-2 text-sm font-medium"
      >
        <div className="absolute left-0 top-0 h-full w-0 bg-gradient-to-tr from-slate-200/30 via-slate-300/10 to-slate-700/10 transition-all  group-hover:w-full" />
        Return home
      </Link>
    </div>
  );
};
