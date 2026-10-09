'use client'

import { useId, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { brandButton, focusRing } from '@/lib/blog/styles'
import { cn } from '@/lib/utils'

const MAX_LENGTH = 2000

interface CommentFormProps {
  status?: 'idle' | 'submitting' | 'error'
  errorMessage?: string
}

export function CommentForm({ status = 'idle', errorMessage }: CommentFormProps) {
  const id = useId()
  const [value, setValue] = useState('')
  const submitting = status === 'submitting'
  const errorId = `${id}-error`

  return (
    <form
      onSubmit={(event) => {
        // Submission is wired to Drupal Core Comment during integration.
        event.preventDefault()
      }}
      className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
    >
      <label htmlFor={`${id}-body`} className="text-sm font-semibold text-foreground">
        Dodaj komentarz
      </label>
      <textarea
        id={`${id}-body`}
        name="body"
        rows={4}
        maxLength={MAX_LENGTH}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={submitting}
        aria-invalid={status === 'error'}
        aria-describedby={status === 'error' ? errorId : undefined}
        placeholder="Podziel się opinią lub doświadczeniem…"
        className={cn(
          'mt-2 block min-h-28 w-full resize-y rounded-lg border border-input bg-background px-3.5 py-3 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 sm:text-sm',
          'transition-colors hover:border-brand/60 disabled:cursor-not-allowed disabled:opacity-60',
          focusRing,
          status === 'error' && 'border-destructive',
        )}
      />

      {status === 'error' && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-destructive">
          {errorMessage ?? 'Nie udało się dodać komentarza. Spróbuj ponownie.'}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground" aria-hidden="true">
          {value.length} / {MAX_LENGTH}
        </span>
        <button type="submit" disabled={!value.trim() || submitting} className={brandButton}>
          {submitting && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
          {submitting ? 'Wysyłanie…' : 'Dodaj komentarz'}
        </button>
      </div>
    </form>
  )
}
