"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Human error boundary (global-ui-reformat + ux-writing): users never see a
 * raw error or stack trace — they get what happened, reassurance, and one
 * clear next action. The technical detail goes to the console only.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <p className="label-mono">
        Error <span className="px-1 text-accent">·</span> Something interrupted this page
      </p>
      <h1 className="h-display mt-6 text-ink">That page didn&apos;t load.</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-mute">
        Something went wrong on this side, not yours. Try again — if it keeps
        happening, the front page and the project index are unaffected.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-outline">
          Back to the front page
        </Link>
      </div>
      {error.digest && (
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
          Reference: {error.digest}
        </p>
      )}
    </main>
  );
}
