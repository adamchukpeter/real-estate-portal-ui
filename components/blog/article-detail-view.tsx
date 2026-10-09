import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ArticleByline } from '@/components/blog/article-byline'
import { ArticleContent } from '@/components/blog/article-content'
import { ArticleGrid } from '@/components/blog/article-grid'
import { BlogShell } from '@/components/blog/blog-shell'
import { TaxonomyLinks } from '@/components/blog/taxonomy-links'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { eyebrow, focusRing, outlineButton } from '@/lib/blog/styles'
import { cn } from '@/lib/utils'
import type { ArticleDetailV2, ArticleSummaryV2, BreadcrumbItem } from '@/lib/blog/types'

interface ArticleDetailViewProps {
  article: ArticleDetailV2
  related: ArticleSummaryV2[]
  breadcrumbs: BreadcrumbItem[]
  /** Voting control, rendered in the article meta row. */
  vote?: React.ReactNode
  /** Comments section, rendered after the article footer. */
  comments?: React.ReactNode
  /** Reserved for a future gallery; rendered between the body and the taxonomy footer. */
  gallery?: React.ReactNode
}

export function ArticleDetailView({
  article,
  related,
  breadcrumbs,
  vote,
  comments,
  gallery,
}: ArticleDetailViewProps) {
  const { cover } = article

  return (
    <BlogShell>
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <article className="mx-auto max-w-7xl px-4 pb-14 pt-5 sm:px-6 md:pt-8">
        <header className="mx-auto max-w-3xl">
          <Link
            href={article.category.pathAlias}
            className={cn(
              'inline-flex max-w-full rounded-full bg-brand/10 px-3 py-1.5 text-sm font-semibold text-brand-strong transition-colors hover:bg-brand/20',
              focusRing,
            )}
          >
            <span className="truncate">{article.category.name}</span>
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-foreground text-balance break-words sm:text-4xl lg:text-[2.5rem]">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{article.excerpt}</p>

          <div className="mt-6 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
            <ArticleByline
              size="md"
              author={article.author}
              publishedAt={article.publishedAt}
              updatedAt={article.updatedAt}
              className="min-w-0"
            />
            {vote}
          </div>
        </header>

        {cover && (
          <figure className="mx-auto mt-8 max-w-4xl md:mt-10">
            {cover.width && cover.height ? (
              <Image
                src={cover.url}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
                priority
                sizes="(min-width: 1024px) 896px, 100vw"
                className="h-auto w-full rounded-xl border border-border shadow-sm"
              />
            ) : (
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
                <Image
                  src={cover.url}
                  alt={cover.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </figure>
        )}

        <ArticleContent html={article.bodyHtml} className="mx-auto mt-8 max-w-3xl md:mt-10" />

        {gallery && <div className="mx-auto mt-10 max-w-4xl">{gallery}</div>}

        <footer className="mx-auto mt-12 max-w-3xl border-t border-border pt-6">
          {article.tags.length > 0 && (
            <div className="mb-6">
              <p className={cn(eyebrow, 'mb-3')}>Tagi</p>
              <TaxonomyLinks terms={article.tags} label="Tagi artykułu" />
            </div>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/blog" className={outlineButton}>
              <ArrowLeft aria-hidden="true" className="h-4 w-4 shrink-0" />
              Wszystkie artykuły
            </Link>
            <Link href={article.category.pathAlias} className={cn(outlineButton, 'min-w-0')}>
              <span className="truncate">Więcej w kategorii: {article.category.name}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </footer>

        {comments && <div className="mx-auto mt-12 max-w-3xl border-t border-border pt-10">{comments}</div>}
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-border bg-secondary/40 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className={eyebrow}>Dalsza lektura</p>
            <h2 id="related-heading" className="mb-6 mt-1 font-heading text-2xl font-bold text-foreground">
              Czytaj także
            </h2>
            <ArticleGrid articles={related} titleAs="h3" />
          </div>
        </section>
      )}
    </BlogShell>
  )
}
