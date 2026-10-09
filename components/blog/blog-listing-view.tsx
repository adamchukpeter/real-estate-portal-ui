import { ArticleGrid } from '@/components/blog/article-grid'
import { BlogListingHeader } from '@/components/blog/blog-listing-header'
import { BlogPagination } from '@/components/blog/blog-pagination'
import { BlogShell } from '@/components/blog/blog-shell'
import { EmptyState } from '@/components/blog/empty-state'
import { ErrorState } from '@/components/blog/error-state'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { pluralizeArticles } from '@/lib/blog/format'
import type { BlogListingResult, BreadcrumbItem } from '@/lib/blog/types'

interface BlogListingViewProps {
  breadcrumbs: BreadcrumbItem[]
  eyebrow: string
  title: string
  description?: string | null
  /** `null` together with `hasError` renders the error state instead of results. */
  result: BlogListingResult | null
  hasError?: boolean
  retryHref: string
  hrefForPage: (page: number) => string
  /** Contextual category navigation, rendered inside the intro band. */
  categoryNav?: React.ReactNode
  empty: { title: string; description: string; action?: { label: string; href: string } }
}

export function BlogListingView({
  breadcrumbs,
  eyebrow,
  title,
  description,
  result,
  hasError = false,
  retryHref,
  hrefForPage,
  categoryNav,
  empty,
}: BlogListingViewProps) {
  return (
    <BlogShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-4 sm:px-6 md:pb-8">
          <Breadcrumbs items={breadcrumbs} />
          <BlogListingHeader eyebrow={eyebrow} title={title} description={description} />
          {categoryNav}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 md:pt-10">
        {hasError || !result ? (
          <ErrorState retryHref={retryHref} />
        ) : result.items.length === 0 ? (
          <EmptyState {...empty} />
        ) : (
          <>
            <p className="mb-5 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{pluralizeArticles(result.total)}</span>
              {result.totalPages > 1 && ` · strona ${result.page} z ${result.totalPages}`}
            </p>
            <ArticleGrid articles={result.items} titleAs="h2" priorityFirst />
            <BlogPagination
              page={result.page}
              totalPages={result.totalPages}
              hrefForPage={hrefForPage}
              className="mt-10"
            />
          </>
        )}
      </section>
    </BlogShell>
  )
}
