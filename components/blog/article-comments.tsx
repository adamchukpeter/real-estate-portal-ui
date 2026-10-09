import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { CommentForm } from '@/components/blog/comment-form'
import { ErrorState } from '@/components/blog/error-state'
import { brandButton, eyebrow, outlineButton } from '@/lib/blog/styles'
import { formatPolishDateTime } from '@/lib/blog/format'
import { countComments, type ArticleComment } from '@/lib/blog/mock-engagement'
import { cn } from '@/lib/utils'

interface ArticleCommentsProps {
  comments: ArticleComment[]
  status?: 'ready' | 'loading' | 'error'
  viewer?: 'authenticated' | 'guest'
  formStatus?: 'idle' | 'submitting' | 'error'
  retryHref?: string
  className?: string
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function CommentItem({ comment, nested = false }: { comment: ArticleComment; nested?: boolean }) {
  return (
    <li>
      <article className="flex gap-3">
        <span
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full bg-secondary font-heading font-bold text-foreground',
            nested ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm',
          )}
        >
          {initials(comment.authorName)}
        </span>
        <div className="min-w-0 flex-1">
          <header className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <p className="text-sm font-semibold text-foreground">{comment.authorName}</p>
            <time dateTime={comment.createdAt} className="text-xs text-muted-foreground">
              {formatPolishDateTime(comment.createdAt)}
            </time>
          </header>
          <p className="mt-1.5 whitespace-pre-line break-words text-sm leading-relaxed text-foreground/90">
            {comment.body}
          </p>
          {comment.replies && comment.replies.length > 0 && (
            <ol role="list" className="mt-4 flex flex-col gap-4 border-l-2 border-border pl-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} nested />
              ))}
            </ol>
          )}
        </div>
      </article>
    </li>
  )
}

function CommentsSkeleton() {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Ładowanie komentarzy…</span>
      <ul aria-hidden="true" className="flex animate-pulse flex-col gap-6">
        {[0, 1, 2].map((i) => (
          <li key={i} className="flex gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-muted" />
            <div className="flex-1 space-y-2.5">
              <div className="h-3.5 w-40 rounded bg-muted" />
              <div className="h-3.5 w-full rounded bg-muted" />
              <div className="h-3.5 w-2/3 rounded bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ArticleComments({
  comments,
  status = 'ready',
  viewer = 'guest',
  formStatus = 'idle',
  retryHref = '#komentarze',
  className,
}: ArticleCommentsProps) {
  const total = countComments(comments)

  return (
    <section id="komentarze" aria-labelledby="komentarze-heading" className={cn('scroll-mt-24', className)}>
      <p className={eyebrow}>Dyskusja</p>
      <h2
        id="komentarze-heading"
        className="mt-1 flex items-center gap-3 font-heading text-2xl font-bold text-foreground"
      >
        Komentarze
        {status === 'ready' && (
          <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-secondary px-2 py-0.5 text-sm font-semibold text-foreground">
            <span className="sr-only">Liczba komentarzy: </span>
            {total}
          </span>
        )}
      </h2>

      <div className="mt-5">
        {viewer === 'authenticated' ? (
          <CommentForm status={formStatus} />
        ) : (
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-secondary/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <p className="text-sm leading-relaxed text-foreground">
              Zaloguj się lub zarejestruj, aby dodać komentarz.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
              <Link href="/login" className={brandButton}>
                Zaloguj się
              </Link>
              <Link href="/register" className={outlineButton}>
                Zarejestruj się
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        {status === 'loading' ? (
          <CommentsSkeleton />
        ) : status === 'error' ? (
          <ErrorState
            title="Nie udało się załadować komentarzy"
            description="Spróbuj odświeżyć listę za chwilę."
            retryHref={retryHref}
          />
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border px-6 py-10 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand-strong">
              <MessageSquare aria-hidden="true" className="h-5 w-5" />
            </span>
            <p className="mt-3 font-heading text-base font-bold text-foreground">Brak komentarzy</p>
            <p className="mt-1 text-sm text-muted-foreground">Bądź pierwszą osobą, która skomentuje ten artykuł.</p>
          </div>
        ) : (
          <ol role="list" className="flex flex-col gap-6 divide-y divide-border [&>li:not(:first-child)]:pt-6">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
