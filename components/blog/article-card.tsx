import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/blog/styles'
import { ArticleByline } from '@/components/blog/article-byline'
import type { ArticleSummaryV2 } from '@/lib/blog/types'

/** Heading level (or plain paragraph) used for the card title; chosen by the surrounding page. */
export type ArticleCardTitleTag = 'h2' | 'h3' | 'h4' | 'p'

interface ArticleCardProps {
  article: ArticleSummaryV2
  titleAs?: ArticleCardTitleTag
  priority?: boolean
}

export function ArticleCard({ article, titleAs = 'h2', priority = false }: ArticleCardProps) {
  const Title = titleAs
  const { cover } = article

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
      {cover ? (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 384px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div aria-hidden="true" className="h-1.5 w-full shrink-0 bg-brand/70" />
      )}

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div>
          <Link
            href={article.category.pathAlias}
            className={cn(
              'relative z-10 inline-flex max-w-full rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand-strong transition-colors hover:bg-brand/20',
              focusRing,
            )}
          >
            <span className="truncate">{article.category.name}</span>
          </Link>
        </div>

        <Title
          className={cn(
            'mt-3 font-heading font-bold leading-snug tracking-tight text-foreground text-pretty break-words',
            cover ? 'text-lg' : 'text-xl',
          )}
        >
          <Link
            href={article.pathAlias}
            className="rounded-sm transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-brand-strong focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-ring"
          >
            {article.title}
          </Link>
        </Title>

        <p
          className={cn(
            'mt-2 text-sm leading-relaxed text-muted-foreground',
            cover ? 'line-clamp-3' : 'line-clamp-6',
          )}
        >
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3 [&:not(:first-child)]:mt-4">
          <ArticleByline author={article.author} publishedAt={article.publishedAt} className="min-w-0" />
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand-strong"
          />
        </div>
      </div>
    </article>
  )
}
