'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Contractor {
  id: number
  /** Initials shown in the avatar circle when no logo */
  initials: string
  namePl: string
  nameRu: string
  city: string
  rating: number
  reviewCount: number
  /** PL tag labels */
  tagsPl: string[]
  /** RU tag labels */
  tagsRu: string[]
  /** Large (left 2/3) portfolio photo */
  photoMain: string
  /** Small top-right portfolio photo */
  photoTopRight: string
  /** Small bottom-right portfolio photo */
  photoBottomRight: string
}

export function ContractorCard({
  contractor,
  lang,
}: {
  contractor: Contractor
  lang: 'pl' | 'ru'
}) {
  const {
    id,
    initials,
    namePl,
    nameRu,
    city,
    rating,
    reviewCount,
    tagsPl,
    tagsRu,
    photoMain,
    photoTopRight,
    photoBottomRight,
  } = contractor

  const name = lang === 'pl' ? namePl : nameRu
  const tags = lang === 'pl' ? tagsPl : tagsRu
  const verifiedLabel = lang === 'pl' ? 'Zweryfikowany' : 'Проверен'
  const reviewsLabel = lang === 'pl' ? 'opinii' : 'отзывов'

  return (
    <Link
      href={`/portfolio/${id}`}
      className="group flex flex-col rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      {/* ── Header row ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-graphite text-sm font-bold text-graphite-foreground">
          {initials}
        </div>

        {/* Name + city */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-foreground">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{city}</p>
        </div>

        {/* Verified badge */}
        <span className="shrink-0 rounded-full bg-brand/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
          {verifiedLabel}
        </span>
      </div>

      {/* ── Portfolio collage ───────────────────────────────────────────────── */}
      <div className="mx-4 overflow-hidden rounded-xl">
        <div className="flex h-40 gap-1">
          {/* Large left photo (2/3 width) */}
          <div className="relative w-2/3 overflow-hidden">
            <Image
              src={photoMain}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          </div>
          {/* Two small right photos (1/3 width) */}
          <div className="flex w-1/3 flex-col gap-1">
            <div className="relative flex-1 overflow-hidden">
              <Image
                src={photoTopRight}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 25vw, 10vw"
              />
            </div>
            <div className="relative flex-1 overflow-hidden">
              <Image
                src={photoBottomRight}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 25vw, 10vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Rating + tags ───────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-3">
        {/* Star + score + count */}
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-foreground">{rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">
            ({reviewCount} {reviewsLabel})
          </span>
        </div>

        {/* Separator dot */}
        <span className="h-1 w-1 rounded-full bg-border" />

        {/* Specialization tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'rounded-md border border-border bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground',
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
