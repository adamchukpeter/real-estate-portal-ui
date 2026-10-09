'use client'

import { useState } from 'react'
import { Loader2, Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/blog/styles'

type Vote = 'up' | 'down' | null

interface ArticleVoteProps {
  /** Score as returned by the backend for the current viewer. */
  initialScore: number
  /** Viewer's current vote, when known. */
  initialVote?: Vote
  /** Shows a spinner on the pending button and blocks input. */
  loading?: boolean
  disabled?: boolean
  className?: string
}

const contribution = (vote: Vote) => (vote === 'up' ? 1 : vote === 'down' ? -1 : 0)

function formatScore(score: number) {
  if (score > 0) return `+${score}`
  if (score < 0) return `\u2212${Math.abs(score)}`
  return '0'
}

const buttonBase = cn(
  'inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors sm:h-8 sm:w-8',
  focusRing,
  'disabled:cursor-not-allowed disabled:opacity-50',
)
const buttonIdle =
  'border-border bg-card text-muted-foreground hover:border-brand hover:bg-brand/10 hover:text-brand-strong disabled:hover:border-border disabled:hover:bg-card disabled:hover:text-muted-foreground'

/**
 * Compact `[ + ]  +2  [ − ]` control. Local state only mirrors the selected
 * state for preview; persistence is owned by the Drupal vote backend.
 */
export function ArticleVote({
  initialScore,
  initialVote = null,
  loading = false,
  disabled = false,
  className,
}: ArticleVoteProps) {
  const [vote, setVote] = useState<Vote>(initialVote)
  const score = initialScore - contribution(initialVote) + contribution(vote)
  const blocked = disabled || loading

  const toggle = (next: Exclude<Vote, null>) => setVote((current) => (current === next ? null : next))

  return (
    <div
      role="group"
      aria-label="Ocena artykułu"
      aria-busy={loading}
      className={cn('inline-flex items-center gap-2', className)}
    >
      <button
        type="button"
        onClick={() => toggle('up')}
        disabled={blocked}
        aria-pressed={vote === 'up'}
        aria-label="Oceń artykuł na plus"
        className={cn(
          buttonBase,
          vote === 'up' ? 'border-success bg-success/10 text-success' : buttonIdle,
        )}
      >
        {loading && vote === 'up' ? (
          <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
        ) : (
          <Plus aria-hidden="true" className="h-4 w-4" />
        )}
      </button>

      <span
        aria-live="polite"
        aria-label={`Ocena: ${score > 0 ? `plus ${score}` : score < 0 ? `minus ${Math.abs(score)}` : '0'}`}
        className={cn(
          'min-w-8 text-center text-base font-bold tabular-nums',
          score > 0 && 'text-success',
          score < 0 && 'text-destructive',
          score === 0 && 'text-muted-foreground',
        )}
      >
        {formatScore(score)}
      </span>

      <button
        type="button"
        onClick={() => toggle('down')}
        disabled={blocked}
        aria-pressed={vote === 'down'}
        aria-label="Oceń artykuł na minus"
        className={cn(
          buttonBase,
          vote === 'down' ? 'border-destructive bg-destructive/10 text-destructive' : buttonIdle,
        )}
      >
        {loading && vote === 'down' ? (
          <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
        ) : (
          <Minus aria-hidden="true" className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}
