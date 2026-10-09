import { ArticleCard, type ArticleCardTitleTag } from '@/components/blog/article-card'
import type { ArticleSummaryV2 } from '@/lib/blog/types'

interface ArticleGridProps {
  articles: ArticleSummaryV2[]
  titleAs?: ArticleCardTitleTag
  /** Give the first row's images loading priority (above the fold). */
  priorityFirst?: boolean
}

export function ArticleGrid({ articles, titleAs = 'h2', priorityFirst = false }: ArticleGridProps) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <li key={article.id} className="flex min-w-0">
          <ArticleCard article={article} titleAs={titleAs} priority={priorityFirst && index < 3} />
        </li>
      ))}
    </ul>
  )
}
