/**
 * Layout-matched skeleton (global-ui-reformat): while a page streams in,
 * visitors see the shape of what's coming — label, headline, ruled rows —
 * instead of a blank screen or a lone spinner. Theme-aware via tokens.
 */
export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8" aria-busy="true">
      <p className="sr-only" role="status">
        Loading page…
      </p>
      <div aria-hidden="true">
        <div className="h-3 w-32 animate-pulse bg-skeleton" />
        <div className="mt-6 h-14 w-3/4 max-w-xl animate-pulse bg-skeleton" />
        <div className="mt-3 h-14 w-1/2 max-w-md animate-pulse bg-skeleton" />
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full max-w-2xl animate-pulse bg-skeleton" />
          <div className="h-4 w-5/6 max-w-xl animate-pulse bg-skeleton" />
        </div>
        <div className="mt-12 border-t border-line">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-4 border-b border-line py-6">
              <div className="h-8 w-10 shrink-0 animate-pulse bg-skeleton" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-2/5 animate-pulse bg-skeleton" />
                <div className="h-4 w-4/5 animate-pulse bg-skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
