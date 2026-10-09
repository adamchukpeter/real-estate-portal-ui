import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleComments } from '@/components/blog/article-comments'
import { ArticleDetailView } from '@/components/blog/article-detail-view'
import { ArticleVote } from '@/components/blog/article-vote'
import { MOCK_COMMENTS, MOCK_VOTE_SCORE } from '@/lib/blog/mock-engagement'
import { getMockArticleByAlias, getMockRelated } from '@/lib/blog/mock-data'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getMockArticleByAlias(`/blog/${(await params).slug}`)
  if (!article) return {}
  const { seo } = article
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonicalUrl },
    robots: seo.robots ?? undefined,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: seo.ogUrl,
      type: 'article',
      images: seo.ogImage ? [{ url: seo.ogImage.url, alt: seo.ogImage.alt }] : undefined,
    },
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const article = getMockArticleByAlias(`/blog/${(await params).slug}`)
  if (!article) notFound()

  return (
    <ArticleDetailView
      article={article}
      related={getMockRelated(article)}
      vote={<ArticleVote initialScore={MOCK_VOTE_SCORE} />}
      comments={<ArticleComments comments={MOCK_COMMENTS} viewer="guest" />}
      breadcrumbs={[
        { label: 'Strona główna', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: article.category.name, href: article.category.pathAlias },
        { label: article.title },
      ]}
    />
  )
}
