'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { PERIOD_LABELS, SORT_LABELS } from '@/lib/blog/url'
import type { ArticleTaxonomyTerm, BlogListingQuery, BlogPeriod, BlogSort } from '@/lib/blog/types'

interface BlogFiltersProps {
  action: string
  categories: ArticleTaxonomyTerm[]
  tags: ArticleTaxonomyTerm[]
  initial: BlogListingQuery
}

const selectClass =
  'h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'

export function BlogFilters({ action, categories, tags, initial }: BlogFiltersProps) {
  const uid = useId()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState(initial.q)
  const [category, setCategory] = useState(initial.category ?? '')
  const [period, setPeriod] = useState<BlogPeriod>(initial.period)
  const [sort, setSort] = useState<BlogSort>(initial.sort)
  const [selectedTags, setSelectedTags] = useState<string[]>(initial.tags)

  const canSortByRelevance = q.trim() !== ''
  const effectiveSort: BlogSort = sort === 'relevance' && !canSortByRelevance ? 'newest' : sort

  const activeCount =
    (category ? 1 : 0) + selectedTags.length + (period !== 'all' ? 1 : 0) + (effectiveSort !== 'newest' ? 1 : 0)
  const hasAnything = activeCount > 0 || q.trim() !== ''

  const toggleTag = (slug: string) =>
    setSelectedTags((prev) => (prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug]))

  const panelId = `${uid}-panel`

  return (
    <form action={action} method="get" role="search" aria-label="Filtruj artykuły" className="mb-8">
      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <label htmlFor={`${uid}-q`} className="sr-only">
            Szukaj w artykułach
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id={`${uid}-q`}
            name="q"
            type="search"
            value={q}
            maxLength={120}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Szukaj w artykułach"
            className="h-10 bg-card pl-9"
          />
        </div>
        <Button type="submit" className="h-10 px-4">
          Szukaj
        </Button>
        <Button
          type="button"
          variant="outline"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="h-10 gap-2 px-3 md:hidden"
        >
          <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
          <span>Filtry</span>
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-bold text-brand-foreground">
              <span className="sr-only">Aktywne filtry: </span>
              {activeCount}
            </span>
          )}
        </Button>
      </div>

      <div id={panelId} className={cn('mt-4 flex-col gap-5', open ? 'flex' : 'hidden', 'md:flex')}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${uid}-category`} className="text-sm font-medium text-foreground">
              Kategoria
            </label>
            <select
              id={`${uid}-category`}
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectClass}
            >
              <option value="">Wszystkie kategorie</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${uid}-period`} className="text-sm font-medium text-foreground">
              Okres publikacji
            </label>
            <select
              id={`${uid}-period`}
              name="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value as BlogPeriod)}
              className={selectClass}
            >
              {(Object.keys(PERIOD_LABELS) as BlogPeriod[]).map((key) => (
                <option key={key} value={key}>
                  {PERIOD_LABELS[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${uid}-sort`} className="text-sm font-medium text-foreground">
              Sortowanie
            </label>
            <select
              id={`${uid}-sort`}
              name="sort"
              value={effectiveSort}
              onChange={(e) => setSort(e.target.value as BlogSort)}
              className={selectClass}
            >
              {(Object.keys(SORT_LABELS) as BlogSort[]).map((key) => (
                <option key={key} value={key} disabled={key === 'relevance' && !canSortByRelevance}>
                  {SORT_LABELS[key]}
                  {key === 'relevance' && !canSortByRelevance ? ' (wpisz frazę)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {tags.length > 0 && (
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-foreground">Tagi</legend>
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const id = `${uid}-tag-${tag.slug}`
                return (
                  <li key={tag.id} className="max-w-full">
                    <input
                      id={id}
                      type="checkbox"
                      name="tag"
                      value={tag.slug}
                      checked={selectedTags.includes(tag.slug)}
                      onChange={() => toggleTag(tag.slug)}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={id}
                      className="inline-flex max-w-full cursor-pointer items-center rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-graphite hover:text-foreground peer-checked:border-graphite peer-checked:bg-graphite peer-checked:text-graphite-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
                    >
                      <span className="truncate">{tag.name}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </fieldset>
        )}

        {hasAnything && (
          <div>
            <Link
              href={action}
              className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Wyczyść filtry
            </Link>
          </div>
        )}
      </div>
    </form>
  )
}
