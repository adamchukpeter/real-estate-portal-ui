import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { BlogListingView } from '@/components/blog/blog-listing-view'
import { getMockListing, getMockTag, getMockTermDescription } from '@/lib/blog/mock-data'
import { buildListingHref, createPageHref, parseLandingPage } from '@/lib/blog/url'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const tag = getMockTag((await params).slug)
  if (!tag) return {}
  return {
    title: `${tag.name} — tag | Blog BudujPL`,
    description: getMockTermDescription(tag.slug) ?? `Artykuły oznaczone tagiem „${tag.name}” na blogu BudujPL.`,
    alternates: { canonical: tag.pathAlias },
  }
}

export default async function BlogTagPage({ params, searchParams }: Props) {
  const tag = getMockTag((await params).slug)
  if (!tag) notFound()

  const { page, pageStatus } = parseLandingPage(await searchParams)
  if (pageStatus === 'invalid') notFound()
  if (pageStatus === 'one') redirect(tag.pathAlias)

  const result = getMockListing({
    q: '',
    category: null,
    tags: [tag.slug],
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
        { label: tag.name },
      ]}
      eyebrow="Tag"
      title={tag.name}
      description={getMockTermDescription(tag.slug)}
      result={result}
      retryHref={buildListingHref(tag.pathAlias, {}, page)}
      hrefForPage={createPageHref(tag.pathAlias)}
      empty={{
        title: 'Brak artykułów z tym tagiem',
        description: 'Nie ma jeszcze opublikowanych artykułów oznaczonych tym tagiem.',
        action: { label: 'Wszystkie artykuły', href: '/blog' },
      }}
    />
  )
}
