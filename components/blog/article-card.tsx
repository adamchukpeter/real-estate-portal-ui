import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArticleByline } from '@/components/blog/article-byline'
import type { ArticleSummaryV2 } from '@/lib/blog/types'

/** Heading level (or plain paragraph) used for the card title; chosen by the surrounding page. */
export type ArticleCardTitleTag = 'h2' | 'h3' | 'h4' | 'p'

interface ArticleCardProps {
  article: ArticleSummaryV2
  titleAs?: ArticleCardTitleTag
  variant?: 'default' | 'featured'
  priority?: boolean
}

export function ArticleCard({
  article,
  titleAs = 'h2',
  variant = 'default',
  priority = false,
}: ArticleCardProps) {
  const Title = titleAs
  const featured = variant === 'featured'
  const { cover } = article

  return (
    <article
      className={cn(
        'group relative flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        featured && 'lg:flex-row',
      )}
    >
      {cover && (
        <div
          className={cn(
            'relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-muted',
            featured && 'lg:w-3/5',
          )}
        >
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            priority={priority}
            sizes={
              featured
                ? '(min-width: 1280px) 720px, (min-width: 1024px) 60vw, 100vw'
                : '(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw'
            }
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col p-5',
          featured && 'lg:justify-center lg:p-8',
        )}
      >
        <div>
          <Link
            href={article.category.pathAlias}
            className="relative z-10 inline-flex max-w-full rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-brand/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="truncate">{article.category.name}</span>
          </Link>
        </div>

        <Title
          className={cn(
            'mt-3 font-heading font-bold leading-snug tracking-tight text-foreground text-pretty break-words',
            featured ? 'text-xl sm:text-2xl lg:text-3xl' : cover ? 'text-lg' : 'text-xl',
          )}
        >
          <Link
            href={article.pathAlias}
            className="rounded-sm transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-brand focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-ring"
          >
            {article.title}
          </Link>
        </Title>

        <p
          className={cn(
            'mt-2 text-sm leading-relaxed text-muted-foreground',
            cover ? 'line-clamp-3' : 'line-clamp-5',
            featured && 'lg:line-clamp-4 lg:text-base',
          )}
        >
          {article.excerpt}
        </p>

        <ArticleByline
          author={article.author}
          publishedAt={article.publishedAt}
          className="mt-auto border-t border-border pt-4 [&:not(:first-child)]:mt-5"
        />
      </div>
    </article>
  )
}
