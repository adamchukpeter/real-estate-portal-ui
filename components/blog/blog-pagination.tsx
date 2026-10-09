import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogPaginationProps {
  page: number
  totalPages: number
  /** Page 1 must resolve to the base URL without a `page` parameter. */
  hrefForPage: (page: number) => string
  className?: string
}

type PageItem = number | 'gap-start' | 'gap-end'

function visiblePages(page: number, totalPages: number): PageItem[] {
  const wanted = new Set([1, totalPages, page - 1, page, page + 1])
  const sorted = [...wanted].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
  const items: PageItem[] = []
  sorted.forEach((p, i) => {
    const prev = sorted[i - 1]
    if (prev !== undefined && p - prev > 1) items.push(i < sorted.length / 2 ? 'gap-start' : 'gap-end')
    items.push(p)
  })
  return items
}

const itemBase =
  'inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

export function BlogPagination({ page, totalPages, hrefForPage, className }: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const hasPrev = page > 1
  const hasNext = page < totalPages

  return (
    <nav aria-label="Paginacja artykułów" className={className}>
      <ul className="flex items-center justify-center gap-1.5">
        <li>
          {hasPrev ? (
            <Link
              href={hrefForPage(page - 1)}
              rel="prev"
              className={cn(itemBase, 'gap-1 border-border bg-card text-foreground hover:border-graphite')}
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              <span className="hidden sm:inline">Poprzednia</span>
              <span className="sr-only sm:hidden">Poprzednia strona</span>
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(itemBase, 'cursor-not-allowed gap-1 border-border bg-card text-muted-foreground/50')}
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              <span className="hidden sm:inline">Poprzednia</span>
              <span className="sr-only sm:hidden">Poprzednia strona (niedostępna)</span>
            </span>
          )}
        </li>

        <li className="px-3 text-sm text-muted-foreground sm:hidden" aria-hidden="true">
          {page} / {totalPages}
        </li>

        {visiblePages(page, totalPages).map((item) =>
          typeof item === 'string' ? (
            <li key={item} aria-hidden="true" className="hidden px-1 text-muted-foreground sm:block">
              …
            </li>
          ) : (
            <li key={item} className="hidden sm:block">
              {item === page ? (
                <span
                  aria-current="page"
                  aria-label={`Strona ${item}, bieżąca`}
                  className={cn(itemBase, 'border-graphite bg-graphite text-graphite-foreground')}
                >
                  {item}
                </span>
              ) : (
                <Link
                  href={hrefForPage(item)}
                  aria-label={`Strona ${item}`}
                  className={cn(itemBase, 'border-border bg-card text-foreground hover:border-graphite')}
                >
                  {item}
                </Link>
              )}
            </li>
          ),
        )}

        <li>
          {hasNext ? (
            <Link
              href={hrefForPage(page + 1)}
              rel="next"
              className={cn(itemBase, 'gap-1 border-border bg-card text-foreground hover:border-graphite')}
            >
              <span className="hidden sm:inline">Następna</span>
              <span className="sr-only sm:hidden">Następna strona</span>
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(itemBase, 'cursor-not-allowed gap-1 border-border bg-card text-muted-foreground/50')}
            >
              <span className="hidden sm:inline">Następna</span>
              <span className="sr-only sm:hidden">Następna strona (niedostępna)</span>
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}
