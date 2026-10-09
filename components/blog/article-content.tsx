import { cn } from '@/lib/utils'

const PROSE = cn(
  'break-words text-base leading-[1.8] text-foreground/90 sm:text-[1.0625rem]',
  '[&>*+*]:mt-5 [&>*:first-child]:mt-0',
  '[&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:text-balance sm:[&_h2]:text-[1.75rem]',
  '[&_h3]:mt-9 [&_h3]:scroll-mt-24 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-foreground [&_h3]:text-balance',
  '[&_h4]:mt-7 [&_h4]:font-heading [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground',
  '[&_h5]:mt-6 [&_h5]:font-semibold [&_h5]:text-foreground [&_h6]:mt-6 [&_h6]:text-sm [&_h6]:font-semibold [&_h6]:uppercase [&_h6]:tracking-wide [&_h6]:text-muted-foreground',
  '[&_h2+*]:mt-4 [&_h3+*]:mt-3',
  '[&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:decoration-brand [&_a]:decoration-2 [&_a]:underline-offset-4 hover:[&_a]:text-brand',
  '[&_strong]:font-semibold [&_strong]:text-foreground',
  '[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:pl-1 [&_li+li]:mt-2 [&_li::marker]:text-brand',
  '[&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:bg-secondary/50 [&_blockquote]:py-3 [&_blockquote]:pl-5 [&_blockquote]:pr-4 [&_blockquote]:text-lg [&_blockquote]:text-foreground',
  '[&_blockquote_p]:m-0',
  '[&_figure]:my-8 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-xl',
  '[&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground',
  '[&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:text-left [&_table]:text-sm',
  '[&_th]:whitespace-nowrap [&_th]:border-b-2 [&_th]:border-graphite [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-foreground',
  '[&_td]:border-b [&_td]:border-border [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top',
  '[&_hr]:my-10 [&_hr]:border-border',
  '[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em]',
)

interface ArticleContentProps {
  /** Server-processed HTML from the CMS. Must already be sanitized upstream. */
  html: string
  className?: string
}

export function ArticleContent({ html, className }: ArticleContentProps) {
  return <div className={cn(PROSE, className)} dangerouslySetInnerHTML={{ __html: html }} />
}
