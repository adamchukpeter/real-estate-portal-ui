import { ArticleCard, type ArticleCardTitleTag } from '@/components/blog/article-card'
import { cn } from '@/lib/utils'
import type { ArticleSummaryV2 } from '@/lib/blog/types'

interface ArticleGridProps {
  articles: ArticleSummaryV2[]
  titleAs?: ArticleCardTitleTag
  /** Render the first article as a wide card. Order and counts are unchanged. */
  featuredFirst?: boolean
  /** Give the first card's image loading priority (above the fold). */
  priorityFirst?: boolean
}

export function ArticleGrid({
  articles,
  titleAs = 'h2',
  featuredFirst = false,
  priorityFirst = false,
}: ArticleGridProps) {
  return (
    <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => {
        const featured = featuredFirst && index === 0
        return (
          <li
            key={article.id}
            className={cn('flex min-w-0', featured && 'sm:col-span-2 lg:col-span-3')}
          >
            <ArticleCard
              article={article}
              titleAs={titleAs}
              variant={featured ? 'featured' : 'default'}
              priority={priorityFirst && index < 3}
            />
          </li>
        )
      })}
    </ul>
  )
}
