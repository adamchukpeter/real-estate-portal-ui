import Link from 'next/link'
import { FileText } from 'lucide-react'
import { brandButton } from '@/lib/blog/styles'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title: string
  description: string
  action?: { label: string; href: string }
  titleAs?: 'h2' | 'h3'
}

export function EmptyState({ title, description, action, titleAs: Title = 'h2' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-brand/40 bg-card px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand-strong">
        <FileText aria-hidden="true" className="h-6 w-6" />
      </span>
      <Title className="mt-4 font-heading text-lg font-bold text-foreground text-balance">{title}</Title>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">{description}</p>
      {action && (
        <Link href={action.href} className={cn(brandButton, 'mt-6')}>
          {action.label}
        </Link>
      )}
    </div>
  )
}
