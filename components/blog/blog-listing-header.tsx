interface BlogListingHeaderProps {
  eyebrow: string
  title: string
  description?: string | null
}

export function BlogListingHeader({ eyebrow, title, description }: BlogListingHeaderProps) {
  return (
    <header className="max-w-3xl pb-6 pt-5 md:pb-8 md:pt-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance break-words sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          {description}
        </p>
      )}
    </header>
  )
}
