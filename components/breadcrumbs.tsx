import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/blog/styles'
import type { BreadcrumbItem } from '@/lib/blog/types'

interface BreadcrumbsProps {
  /** Explicit trail supplied by the page; never inferred from the pathname. */
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Ścieżka nawigacji" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1 || !item.href
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1">
              {index > 0 && (
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
              )}
              {isCurrent || !item.href ? (
                <span
                  aria-current="page"
                  className="block max-w-[11rem] truncate font-medium text-foreground sm:max-w-sm lg:max-w-xl"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'rounded-md px-1.5 py-1.5 transition-colors hover:bg-brand/10 hover:text-brand-strong',
                    focusRing,
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
