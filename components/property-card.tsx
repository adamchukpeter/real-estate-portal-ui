'use client'

import Image from 'next/image'
import { MapPin, BedDouble, Maximize2, Heart } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface Property {
  id: number
  image: string
  price: number
  area: number
  city: string
  rooms: number
  market: 'Pierwotny' | 'Wtórny'
  title: string
  titleRu: string
}

interface PropertyCardProps {
  property: Property
  lang: 'pl' | 'ru'
}

export function PropertyCard({ property, lang }: PropertyCardProps) {
  const [liked, setLiked] = useState(false)

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(p)

  const marketColor =
    property.market === 'Pierwotny'
      ? 'bg-brand text-brand-foreground'
      : 'bg-graphite text-graphite-foreground'

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={lang === 'pl' ? property.title : property.titleRu}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Market badge */}
        <span
          className={cn(
            'absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold',
            marketColor,
          )}
        >
          {property.market}
        </span>
        {/* Like button */}
        <button
          onClick={() => setLiked(!liked)}
          aria-label={lang === 'pl' ? 'Dodaj do ulubionych' : 'В избранное'}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
        >
          <Heart
            className={cn('h-4 w-4 transition-colors', liked ? 'fill-brand stroke-brand' : 'stroke-muted-foreground')}
          />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xl font-bold text-brand">
          {formatPrice(property.price)}
        </p>
        <h3 className="mt-1 font-heading text-sm font-semibold leading-snug text-foreground text-pretty">
          {lang === 'pl' ? property.title : property.titleRu}
        </h3>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>{property.city}</span>
        </div>

        <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Maximize2 className="h-3.5 w-3.5" />
            <span>
              {property.area} m²
            </span>
          </div>
          <div className="flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5" />
            <span>
              {property.rooms}{' '}
              {lang === 'pl'
                ? property.rooms === 1
                  ? 'pokój'
                  : property.rooms < 5
                  ? 'pokoje'
                  : 'pokoi'
                : property.rooms === 1
                ? 'комната'
                : property.rooms < 5
                ? 'комнаты'
                : 'комнат'}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
