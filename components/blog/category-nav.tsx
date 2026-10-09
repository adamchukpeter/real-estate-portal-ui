import Link from 'next/link'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/blog/styles'
import type { ArticleTaxonomyTerm } from '@/lib/blog/types'

interface CategoryNavProps {
  categories: ArticleTaxonomyTerm[]
  /** Active category id. When omitted, "Wszystkie artykuły" is the active entry. */
  activeId?: string
  className?: string
}

export function CategoryNav({ categories, activeId, className }: CategoryNavProps) {
  const linkClass = (active: boolean) =>
    cn(
      'inline-flex min-h-10 max-w-full items-center rounded-full border px-4 py-2 text-sm transition-colors',
      focusRing,
      active
        ? 'border-brand bg-brand/10 font-semibold text-foreground'
        : 'border-border bg-card font-medium text-muted-foreground hover:border-brand hover:bg-brand/5 hover:text-foreground',
    )

  return (
    <nav aria-label="Kategorie bloga" className={className}>
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/blog"
            aria-current={activeId ? undefined : 'page'}
            className={linkClass(!activeId)}
          >
            Wszystkie artykuły
          </Link>
        </li>
        {categories.map((category) => {
          const active = category.id === activeId
          return (
            <li key={category.id} className="max-w-full">
              <Link
                href={category.pathAlias}
                aria-current={active ? 'page' : undefined}
                className={linkClass(active)}
              >
                <span className="truncate">{category.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
