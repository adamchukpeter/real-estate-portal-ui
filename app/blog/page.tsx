import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { BlogFilters } from '@/components/blog/blog-filters'
import { BlogListingView } from '@/components/blog/blog-listing-view'
import { getMockListing, MOCK_CATEGORIES, MOCK_TAGS } from '@/lib/blog/mock-data'
import { buildListingHref, createPageHref, isFilteredQuery, parseListingQuery } from '@/lib/blog/url'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { query } = parseListingQuery(await searchParams)
  return {
    title: 'Blog — poradniki dla budujących | BudujPL',
    description:
      'Poradniki, formalności i praktyczne wskazówki dla osób budujących i remontujących dom w Polsce.',
    alternates: { canonical: '/blog' },
    // Filtered/searched combinations are not curated landing pages.
    robots: isFilteredQuery(query) ? { index: false, follow: true } : undefined,
  }
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { query, pageStatus } = parseListingQuery(await searchParams)

  if (pageStatus === 'invalid') notFound()
  if (pageStatus === 'one') redirect(buildListingHref('/blog', query, 1))

  const result = getMockListing(query)
  if (query.page > result.totalPages || (query.page > 1 && result.total === 0)) notFound()

  const filtered = isFilteredQuery(query)

  return (
    <BlogListingView
      breadcrumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Blog' }]}
      eyebrow="Blog"
      title="Poradniki i wiedza dla budujących"
      description="Formalności, koszty, materiały i instalacje — sprawdzone informacje przed każdą decyzją na budowie."
      result={result}
      retryHref={buildListingHref('/blog', query, query.page)}
      hrefForPage={createPageHref('/blog', query)}
      featuredFirst={!filtered && query.page === 1}
      filters={
        <BlogFilters action="/blog" categories={MOCK_CATEGORIES} tags={MOCK_TAGS} initial={query} />
      }
      empty={{
        title: 'Brak artykułów spełniających kryteria',
        description: 'Zmień frazę wyszukiwania lub usuń część filtrów, aby zobaczyć więcej wyników.',
        action: { label: 'Wyczyść filtry', href: '/blog' },
      }}
    />
  )
}
