'use client'

import { useState } from 'react'
import { Star, Pencil, Trash2, MessageSquare } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

interface Review {
  id: number
  companyInitials: string
  companyColor: string
  companyName: string
  rating: number
  date: string
  textPl: string
  textRu: string
}

const REVIEWS: Review[] = [
  {
    id: 1, companyInitials: 'PW', companyColor: 'bg-sky-600',
    companyName: 'ProWykończenia Sp. z o.o.', rating: 5, date: '12 lip 2026',
    textPl: 'Doskonała ekipa, wszystko zrobione terminowo i z dbałością o szczegóły. Polecam każdemu.',
    textRu: 'Отличная бригада, всё сделано в срок и с вниманием к деталям. Рекомендую всем.',
  },
  {
    id: 2, companyInitials: 'MT', companyColor: 'bg-amber-600',
    companyName: 'MistrzoTynk Kraków', rating: 4, date: '3 lip 2026',
    textPl: 'Bardzo dobra jakość tynkowania. Małe opóźnienie, ale efekt końcowy zadowalający.',
    textRu: 'Очень хорошее качество штукатурки. Небольшая задержка, но результат удовлетворительный.',
  },
  {
    id: 3, companyInitials: 'EK', companyColor: 'bg-emerald-600',
    companyName: 'ElektroKraft Wrocław', rating: 5, date: '20 cze 2026',
    textPl: 'Profesjonalne podejście, czysta robota. Instalacja elektryczna zrobiona bez żadnych uwag.',
    textRu: 'Профессиональный подход, чистая работа. Электромонтаж выполнен без замечаний.',
  },
  {
    id: 4, companyInitials: 'HB', companyColor: 'bg-blue-700',
    companyName: 'HydroBlue Poznań', rating: 3, date: '1 cze 2026',
    textPl: 'Praca wykonana poprawnie, lecz komunikacja mogłaby być lepsza.',
    textRu: 'Работа выполнена правильно, но коммуникация могла бы быть лучше.',
  },
]

export default function CommentsPage() {
  const { t, lang } = useLang()
  const [reviews, setReviews] = useState(REVIEWS)
  const [removing, setRemoving] = useState<Set<number>>(new Set())

  function handleDelete(id: number) {
    setRemoving((prev) => new Set(prev).add(id))
    setTimeout(() => {
      setReviews((prev) => prev.filter((r) => r.id !== id))
    }, 300)
  }

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {t('Historia opinii', 'История отзывов')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(`${reviews.length} wystawionych opinii`, `${reviews.length} написанных отзывов`)}
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <MessageSquare className="mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="font-medium text-muted-foreground">
            {t('Brak wystawionych opinii.', 'Нет написанных отзывов.')}
          </p>
        </div>
      ) : (
        <div className="relative flex flex-col gap-0">
          {/* Timeline line */}
          <div className="absolute left-5 top-6 bottom-6 w-px bg-border" aria-hidden="true" />

          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className={cn(
                'relative flex gap-5 pb-6 transition-all duration-300',
                removing.has(review.id) && 'opacity-0 -translate-x-4',
                idx === reviews.length - 1 && 'pb-0',
              )}
            >
              {/* Timeline dot */}
              <div className={cn('relative z-10 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold text-white', review.companyColor)}>
                {review.companyInitials}
              </div>

              {/* Card */}
              <div className="flex-1 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{review.companyName}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label={t('Edytuj', 'Редактировать')}
                      className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label={t('Usuń', 'Удалить')}
                      onClick={() => handleDelete(review.id)}
                      className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Stars */}
                <div className="mt-2 flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star
                      key={s}
                      className={cn('h-3.5 w-3.5', s <= review.rating ? 'fill-brand text-brand' : 'text-border')}
                    />
                  ))}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {lang === 'pl' ? review.textPl : review.textRu}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
