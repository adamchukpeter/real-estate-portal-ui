import Link from 'next/link'
import { SearchX } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title: string
  description: string
  action?: { label: string; href: string }
  titleAs?: 'h2' | 'h3'
}

export function EmptyState({ title, description, action, titleAs: Title = 'h2' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <SearchX aria-hidden="true" className="h-6 w-6" />
      </span>
      <Title className="mt-4 font-heading text-lg font-bold text-foreground text-balance">{title}</Title>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
        {description}
      </p>
      {action && (
        <Link href={action.href} className={cn(buttonVariants(), 'mt-6 h-10 px-4')}>
          {action.label}
        </Link>
      )}
    </div>
  )
}
