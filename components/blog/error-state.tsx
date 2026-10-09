import Link from 'next/link'
import { TriangleAlert } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  title?: string
  description?: string
  retryHref: string
}

export function ErrorState({
  title = 'Nie udało się załadować artykułów',
  description = 'Wystąpił problem z pobraniem danych. Spróbuj ponownie za chwilę.',
  retryHref,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-14 text-center"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert aria-hidden="true" className="h-6 w-6" />
      </span>
      <p className="mt-4 font-heading text-lg font-bold text-foreground text-balance">{title}</p>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
        {description}
      </p>
      <Link href={retryHref} className={cn(buttonVariants(), 'mt-6 h-10 px-4')}>
        Spróbuj ponownie
      </Link>
    </div>
  )
}
