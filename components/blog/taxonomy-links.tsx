import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ArticleTaxonomyTerm } from '@/lib/blog/types'

interface TaxonomyLinksProps {
  terms: ArticleTaxonomyTerm[]
  /** Accessible name of the navigation landmark, e.g. "Tagi artykułu". */
  label: string
  className?: string
}

export function TaxonomyLinks({ terms, label, className }: TaxonomyLinksProps) {
  if (terms.length === 0) return null

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-wrap gap-2">
        {terms.map((term) => (
          <li key={term.id} className="max-w-full">
            <Link
              href={term.pathAlias}
              className={cn(
                'inline-flex max-w-full items-center rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors',
                'hover:border-graphite hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
            >
              <span className="truncate">{term.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
