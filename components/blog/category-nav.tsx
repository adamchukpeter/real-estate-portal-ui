import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ArticleTaxonomyTerm } from '@/lib/blog/types'

interface CategoryNavProps {
  categories: ArticleTaxonomyTerm[]
  activeId?: string
  className?: string
}

export function CategoryNav({ categories, activeId, className }: CategoryNavProps) {
  const linkClass = (active: boolean) =>
    cn(
      'inline-flex max-w-full items-center rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      active
        ? 'border-graphite bg-graphite text-graphite-foreground'
        : 'border-border bg-card text-muted-foreground hover:border-graphite hover:text-foreground',
    )

  return (
    <nav aria-label="Kategorie bloga" className={className}>
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link href="/blog" className={linkClass(false)}>
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
