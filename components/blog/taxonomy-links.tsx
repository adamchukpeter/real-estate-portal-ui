import Link from 'next/link'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/blog/styles'
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
                'inline-flex min-h-9 max-w-full items-center rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors',
                'hover:border-brand hover:bg-brand/10 hover:text-foreground',
                focusRing,
              )}
            >
              <span className="min-w-0 break-words">{term.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
