'use client'

import { useState } from 'react'
import { Heart, Star } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

interface Bookmark {
  id: number
  initials: string
  name: string
  category: { pl: string; ru: string }
  rating: number
  reviews: number
  color: string
}

const INITIAL_BOOKMARKS: Bookmark[] = [
  { id: 1, initials: 'PW', name: 'ProWykończenia Sp. z o.o.', category: { pl: 'Wykończenia', ru: 'Отделка' },        rating: 4.9, reviews: 127, color: 'bg-sky-600'    },
  { id: 2, initials: 'MT', name: 'MistrzoTynk Kraków',        category: { pl: 'Tynkowanie',  ru: 'Штукатурка' },     rating: 4.8, reviews: 84,  color: 'bg-amber-600'  },
  { id: 3, initials: 'BD', name: 'BudDom Gdańsk',             category: { pl: 'Budowa domów',ru: 'Строительство' },  rating: 5.0, reviews: 61,  color: 'bg-graphite'   },
  { id: 4, initials: 'EK', name: 'ElektroKraft Wrocław',      category: { pl: 'Elektryka',   ru: 'Электрика' },      rating: 4.7, reviews: 93,  color: 'bg-emerald-600'},
  { id: 5, initials: 'HB', name: 'HydroBlue Poznań',          category: { pl: 'Hydraulika',  ru: 'Сантехника' },     rating: 4.6, reviews: 52,  color: 'bg-blue-700'   },
  { id: 6, initials: 'MA', name: 'MalerArt Łódź',             category: { pl: 'Malowanie',   ru: 'Покраска' },       rating: 4.8, reviews: 110, color: 'bg-rose-600'   },
]

export default function BookmarksPage() {
  const { t, lang } = useLang()
  const [items, setItems] = useState(INITIAL_BOOKMARKS)
  const [removing, setRemoving] = useState<Set<number>>(new Set())

  function handleRemove(id: number) {
    setRemoving((prev) => new Set(prev).add(id))
    setTimeout(() => {
      setItems((prev) => prev.filter((b) => b.id !== id))
      setRemoving((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 280)
  }

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {t('Zapisane firmy', 'Сохранённые компании')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(`${items.length} zapisanych firm`, `${items.length} сохранённых компаний`)}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <Heart className="mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="font-medium text-muted-foreground">
            {t('Brak zapisanych firm.', 'Нет сохранённых компаний.')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                'relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-280',
                removing.has(item.id) ? 'scale-95 opacity-0' : 'scale-100 opacity-100',
              )}
            >
              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                aria-label={t('Usuń z zapisanych', 'Удалить из сохранённых')}
                className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-brand transition-colors hover:bg-brand/10"
              >
                <Heart className="h-4 w-4 fill-brand" />
              </button>

              {/* Logo + info */}
              <div className="flex items-center gap-3">
                <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-heading text-base font-bold text-white', item.color)}>
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground text-sm">{item.name}</p>
                  <span className="mt-0.5 inline-block rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {lang === 'pl' ? item.category.pl : item.category.ru}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5 border-t border-border pt-3">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star
                      key={s}
                      className={cn('h-3.5 w-3.5', s <= Math.round(item.rating) ? 'fill-brand text-brand' : 'text-border')}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">{item.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({item.reviews})</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
