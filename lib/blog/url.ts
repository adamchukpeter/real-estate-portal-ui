import type { BlogListingQuery, BlogPeriod, BlogSort } from './types'

type RawSearchParams = Record<string, string | string[] | undefined>

const PERIODS: BlogPeriod[] = ['all', 'week', 'month', 'year']
const SORTS: BlogSort[] = ['newest', 'oldest', 'relevance']

export const PERIOD_LABELS: Record<BlogPeriod, string> = {
  all: 'Cały okres',
  week: 'Ostatni tydzień',
  month: 'Ostatni miesiąc',
  year: 'Ostatni rok',
}

export const SORT_LABELS: Record<BlogSort, string> = {
  newest: 'Najnowsze',
  oldest: 'Najstarsze',
  relevance: 'Najbardziej trafne',
}

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

/**
 * - `absent`  — no `page` param, page 1
 * - `one`     — explicit `?page=1`, must be redirected to the base URL
 * - `valid`   — integer >= 2
 * - `invalid` — anything else; must not be silently replaced with another page
 */
export type PageParamStatus = 'absent' | 'one' | 'valid' | 'invalid'

export function parseListingQuery(raw: RawSearchParams): {
  query: BlogListingQuery
  pageStatus: PageParamStatus
} {
  const q = (first(raw.q) ?? '').trim().slice(0, 120)
  const category = first(raw.category)?.trim() || null

  const rawTags = raw.tag === undefined ? [] : Array.isArray(raw.tag) ? raw.tag : [raw.tag]
  const tags = Array.from(new Set(rawTags.map((t) => t.trim()).filter(Boolean)))

  const periodParam = first(raw.period) as BlogPeriod | undefined
  const period = periodParam && PERIODS.includes(periodParam) ? periodParam : 'all'

  const sortParam = first(raw.sort) as BlogSort | undefined
  let sort: BlogSort = sortParam && SORTS.includes(sortParam) ? sortParam : 'newest'
  if (sort === 'relevance' && !q) sort = 'newest'

  const pageParam = first(raw.page)
  let page = 1
  let pageStatus: PageParamStatus = 'absent'
  if (pageParam !== undefined) {
    if (!/^\d+$/.test(pageParam) || Number(pageParam) < 1) {
      pageStatus = 'invalid'
    } else {
      page = Number(pageParam)
      pageStatus = page === 1 ? 'one' : 'valid'
    }
  }

  return { query: { q, category, tags, period, sort, page }, pageStatus }
}

export function parseLandingPage(raw: RawSearchParams): { page: number; pageStatus: PageParamStatus } {
  const { query, pageStatus } = parseListingQuery({ page: raw.page })
  return { page: query.page, pageStatus }
}

export function isFilteredQuery(query: BlogListingQuery): boolean {
  return (
    query.q !== '' ||
    query.category !== null ||
    query.tags.length > 0 ||
    query.period !== 'all' ||
    query.sort !== 'newest'
  )
}

export function buildListingHref(
  basePath: string,
  query: Partial<BlogListingQuery>,
  page = 1,
): string {
  const params = new URLSearchParams()
  if (query.q) params.set('q', query.q)
  if (query.category) params.set('category', query.category)
  query.tags?.forEach((t) => params.append('tag', t))
  if (query.period && query.period !== 'all') params.set('period', query.period)
  if (query.sort && query.sort !== 'newest') params.set('sort', query.sort)
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

/** Returns a page-number → href factory; page 1 always normalizes to the base URL. */
export function createPageHref(basePath: string, query: Partial<BlogListingQuery> = {}) {
  return (page: number) => buildListingHref(basePath, query, page)
}
