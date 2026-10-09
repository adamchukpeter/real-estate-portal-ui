import { Building2, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPolishDate, wasUpdatedAfterPublication } from '@/lib/blog/format'
import type { ArticleAuthor } from '@/lib/blog/types'

interface ArticleBylineProps {
  author: ArticleAuthor
  publishedAt: string
  updatedAt?: string
  size?: 'sm' | 'md'
  className?: string
}

export function ArticleByline({
  author,
  publishedAt,
  updatedAt,
  size = 'sm',
  className,
}: ArticleBylineProps) {
  const AuthorIcon = author.type === 'business' ? Building2 : User
  const showUpdated = updatedAt ? wasUpdatedAfterPublication(publishedAt, updatedAt) : false

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground',
        size === 'sm' ? 'text-xs' : 'text-sm',
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-1.5">
        <AuthorIcon aria-hidden="true" className={cn('shrink-0', size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4')} />
        <span className="sr-only">Autor: </span>
        <span className="font-medium text-foreground">{author.name}</span>
      </span>
      <span>
        <span className="sr-only">Opublikowano: </span>
        <time dateTime={publishedAt}>{formatPolishDate(publishedAt)}</time>
      </span>
      {showUpdated && updatedAt && (
        <span>
          Zaktualizowano: <time dateTime={updatedAt}>{formatPolishDate(updatedAt)}</time>
        </span>
      )}
    </div>
  )
}
