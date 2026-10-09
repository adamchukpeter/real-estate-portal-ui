import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { BlogListingView } from '@/components/blog/blog-listing-view'
import { CategoryNav } from '@/components/blog/category-nav'
import { getMockCategory, getMockListing, getMockTermDescription, MOCK_CATEGORIES } from '@/lib/blog/mock-data'
import { buildListingHref, createPageHref, parseLandingPage } from '@/lib/blog/url'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const category = getMockCategory((await params).slug)
  if (!category) return {}
  return {
    title: `${category.name} — Blog | BudujPL`,
    description:
      getMockTermDescription(category.slug) ?? `Artykuły z kategorii „${category.name}” na blogu BudujPL.`,
    alternates: { canonical: category.pathAlias },
  }
}

export default async function BlogCategoryPage({ params, searchParams }: Props) {
  const category = getMockCategory((await params).slug)
  if (!category) notFound()

  const { page, pageStatus } = parseLandingPage(await searchParams)
  if (pageStatus === 'invalid') notFound()
  if (pageStatus === 'one') redirect(category.pathAlias)

  const result = getMockListing({
    q: '',
    category: category.slug,
    tags: [],
    period: 'all',
    sort: 'newest',
    page,
  })
  if (page > result.totalPages || (page > 1 && result.total === 0)) notFound()

  return (
    <BlogListingView
      breadcrumbs={[
        { label: 'Strona główna', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: category.name },
      ]}
      eyebrow="Kategoria"
      title={category.name}
      description={getMockTermDescription(category.slug)}
      result={result}
      retryHref={buildListingHref(category.pathAlias, {}, page)}
      hrefForPage={createPageHref(category.pathAlias)}
      categoryNav={<CategoryNav categories={MOCK_CATEGORIES} activeId={category.id} />}
      empty={{
        title: 'Brak artykułów w tej kategorii',
        description: 'Wkrótce pojawią się tu nowe poradniki. Zajrzyj do pozostałych kategorii.',
        action: { label: 'Wszystkie artykuły', href: '/blog' },
      }}
    />
  )
}
