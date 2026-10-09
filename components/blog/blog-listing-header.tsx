import { eyebrow as eyebrowClass } from '@/lib/blog/styles'

interface BlogListingHeaderProps {
  eyebrow: string
  title: string
  description?: string | null
}

export function BlogListingHeader({ eyebrow, title, description }: BlogListingHeaderProps) {
  return (
    <header className="max-w-3xl pb-6 pt-4 md:pb-7 md:pt-6">
      <p className={eyebrowClass}>{eyebrow}</p>
      <h1 className="mt-1.5 font-heading text-3xl font-bold leading-tight tracking-tight text-foreground text-balance break-words sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">{description}</p>
      )}
    </header>
  )
}
