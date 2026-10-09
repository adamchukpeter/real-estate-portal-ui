export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Ładowanie artykułów…</span>
      <ul aria-hidden="true" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, i) => (
          <li
            key={i}
            className="flex animate-pulse flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          >
            <div className="aspect-[16/10] bg-muted" />
            <div className="flex flex-col gap-3 p-4 sm:p-5">
              <div className="h-6 w-28 rounded-full bg-muted" />
              <div className="h-5 w-full rounded bg-muted" />
              <div className="h-5 w-2/3 rounded bg-muted" />
              <div className="mt-1 h-3.5 w-full rounded bg-muted" />
              <div className="h-3.5 w-5/6 rounded bg-muted" />
              <div className="mt-3 h-3.5 w-1/2 rounded bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
