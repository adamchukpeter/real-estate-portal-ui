import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { BlogListingView } from '@/components/blog/blog-listing-view'
import { CategoryNav } from '@/components/blog/category-nav'
import { getMockListing, MOCK_CATEGORIES } from '@/lib/blog/mock-data'
import { buildListingHref, createPageHref, parseLandingPage } from '@/lib/blog/url'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { page } = parseLandingPage(await searchParams)
  return {
    title: 'Blog — poradniki dla budujących | BudujPL',
    description:
      'Poradniki, formalności i praktyczne wskazówki dla osób budujących i remontujących dom w Polsce.',
    alternates: { canonical: buildListingHref('/blog', {}, page) },
  }
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { page, pageStatus } = parseLandingPage(await searchParams)

  if (pageStatus === 'invalid') notFound()
  if (pageStatus === 'one') redirect('/blog')

  const result = getMockListing({ q: '', category: null, tags: [], period: 'all', sort: 'newest', page })
  if (page > result.totalPages || (page > 1 && result.total === 0)) notFound()

  return (
    <BlogListingView
      breadcrumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Blog' }]}
      eyebrow="Blog"
      title="Poradniki i wiedza dla budujących"
      description="Formalności, koszty, materiały i instalacje — sprawdzone informacje przed każdą decyzją na budowie."
      result={result}
      retryHref={buildListingHref('/blog', {}, page)}
      hrefForPage={createPageHref('/blog')}
      categoryNav={<CategoryNav categories={MOCK_CATEGORIES} />}
      empty={{
        title: 'Brak opublikowanych artykułów',
        description: 'Wkrótce pojawią się tu nowe poradniki.',
        action: { label: 'Strona główna', href: '/' },
      }}
    />
  )
}
