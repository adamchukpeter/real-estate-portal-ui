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
  /** Search/filter form, rendered between the header and the results. */
  filters?: React.ReactNode
  /** Contextual category navigation, rendered between the header and the results. */
  categoryNav?: React.ReactNode
  /** Highlight the first card. Only meaningful on an unfiltered first page. */
  featuredFirst?: boolean
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
  filters,
  categoryNav,
  featuredFirst = false,
  empty,
}: BlogListingViewProps) {
  return (
    <BlogShell>
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <Breadcrumbs items={breadcrumbs} className="pt-5" />
        <BlogListingHeader eyebrow={eyebrow} title={title} description={description} />

        {categoryNav && <div className="mb-8">{categoryNav}</div>}
        {filters}

        {hasError || !result ? (
          <ErrorState retryHref={retryHref} />
        ) : result.items.length === 0 ? (
          <EmptyState {...empty} />
        ) : (
          <>
            <p role="status" className="mb-4 text-sm text-muted-foreground">
              {pluralizeArticles(result.total)}
              {result.totalPages > 1 && ` · strona ${result.page} z ${result.totalPages}`}
            </p>
            <ArticleGrid
              articles={result.items}
              titleAs="h2"
              featuredFirst={featuredFirst}
              priorityFirst
            />
            <BlogPagination
              page={result.page}
              totalPages={result.totalPages}
              hrefForPage={hrefForPage}
              className="mt-10"
            />
          </>
        )}
      </div>
    </BlogShell>
  )
}
