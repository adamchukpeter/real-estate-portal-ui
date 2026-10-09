/**
 * Approved Article DTO v2 — data boundary for the public Blog UI.
 * Do not rename or extend these types for presentation reasons.
 */

export type ArticleAuthor = {
  type: 'user' | 'business'
  id: string
  name: string
}

export type ArticleMedia = {
  url: string
  alt: string
  width: number | null
  height: number | null
}

export type ArticleTaxonomyTerm = {
  id: string
  name: string
  slug: string
  pathAlias: string
}

export type ArticleSummaryV2 = {
  id: string
  title: string
  excerpt: string
  pathAlias: string
  author: ArticleAuthor
  createdAt: string
  publishedAt: string
  updatedAt: string
  cover: ArticleMedia | null
  category: ArticleTaxonomyTerm
  tags: ArticleTaxonomyTerm[]
  seoTitle: string
  seoDescription: string
}

export type ArticleSeo = {
  title: string
  description: string
  canonicalUrl: string
  robots: string | null
  ogTitle: string
  ogDescription: string
  ogUrl: string
  ogImage: ArticleMedia | null
}

export type ArticleDetailV2 = Omit<
  ArticleSummaryV2,
  'seoTitle' | 'seoDescription'
> & {
  bodyHtml: string
  seo: ArticleSeo
}

/* ─── Listing contract (presentation-only, not part of the Drupal DTO) ───── */

export const BLOG_PAGE_SIZE = 12

export type BlogPeriod = 'all' | 'week' | 'month' | 'year'
export type BlogSort = 'newest' | 'oldest' | 'relevance'

export type BlogListingQuery = {
  q: string
  category: string | null
  tags: string[]
  period: BlogPeriod
  sort: BlogSort
  page: number
}

export type BlogListingResult = {
  items: ArticleSummaryV2[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type BreadcrumbItem = {
  label: string
  /** Omit on the current page — it is rendered as non-interactive text. */
  href?: string
}
