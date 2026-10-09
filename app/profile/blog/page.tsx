'use client'

import { useState } from 'react'
import { Search, Plus, Pencil, Trash2, FileText } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

type Status = 'published' | 'draft'

interface Article {
  id: number
  titlePl: string
  titleRu: string
  excerpt: string
  status: Status
  date: string
  readMin: number
}

const INITIAL_ARTICLES: Article[] = [
  {
    id: 1, status: 'published', date: '10 lip 2026', readMin: 5,
    titlePl: 'Jak wybrać dobrego wykonawcę remontu?',
    titleRu: 'Как выбрать хорошего подрядчика для ремонта?',
    excerpt: 'Sprawdzone metody weryfikacji firm budowlanych, na co zwrócić uwagę przy podpisywaniu umowy…',
  },
  {
    id: 2, status: 'published', date: '28 cze 2026', readMin: 8,
    titlePl: 'Remont kuchni krok po kroku',
    titleRu: 'Ремонт кухни шаг за шагом',
    excerpt: 'Harmonogram prac, lista materiałów i orientacyjny kosztorys dla kuchni 12 m²…',
  },
  {
    id: 3, status: 'draft', date: '15 cze 2026', readMin: 3,
    titlePl: 'Izolacja termiczna — co wybrać w 2026?',
    titleRu: 'Теплоизоляция — что выбрать в 2026?',
    excerpt: 'Porównanie najpopularniejszych materiałów: styropian, wełna mineralna, PIR…',
  },
  {
    id: 4, status: 'draft', date: '2 cze 2026', readMin: 6,
    titlePl: 'Moje doświadczenia z portalem BudujPL',
    titleRu: 'Мой опыт использования портала BudujPL',
    excerpt: 'Jak w ciągu tygodnia znalazłem ekipę remontową i zaoszczędziłem 15% na kosztach…',
  },
]

const STATUS_LABELS: Record<Status, { pl: string; ru: string; cls: string }> = {
  published: { pl: 'Opublikowano', ru: 'Опубликовано', cls: 'bg-emerald-100 text-emerald-700' },
  draft:     { pl: 'Szkic',        ru: 'Черновик',     cls: 'bg-amber-100 text-amber-700'    },
}

export default function BlogPage() {
  const { t, lang } = useLang()
  const [articles, setArticles] = useState(INITIAL_ARTICLES)
  const [search, setSearch] = useState('')
  const [removing, setRemoving] = useState<Set<number>>(new Set())

  const filtered = articles.filter((a) => {
    const title = lang === 'pl' ? a.titlePl : a.titleRu
    return title.toLowerCase().includes(search.toLowerCase())
  })

  function handleDelete(id: number) {
    setRemoving((prev) => new Set(prev).add(id))
    setTimeout(() => {
      setArticles((prev) => prev.filter((a) => a.id !== id))
    }, 300)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {t('Mój blog', 'Мой блог')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(`${articles.length} artykułów`, `${articles.length} статей`)}
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 self-start rounded-lg bg-graphite px-4 py-2 text-sm font-semibold text-graphite-foreground transition-colors hover:bg-graphite/80 sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          {t('Dodaj artykuł', 'Написать статью')}
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('Szukaj artykułów…', 'Поиск статей…')}
          className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      {/* Articles list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <FileText className="mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="font-medium text-muted-foreground">
            {t('Brak artykułów.', 'Нет статей.')}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((article) => {
            const title  = lang === 'pl' ? article.titlePl : article.titleRu
            const status = STATUS_LABELS[article.status]

            return (
              <div
                key={article.id}
                className={cn(
                  'flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300',
                  removing.has(article.id) && 'opacity-0 scale-95',
                )}
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold', status.cls)}>
                      {lang === 'pl' ? status.pl : status.ru}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{article.excerpt}</p>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {article.date} &middot; {article.readMin} min {t('czytania', 'чтения')}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    aria-label={t('Edytuj', 'Редактировать')}
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={t('Usuń', 'Удалить')}
                    onClick={() => handleDelete(article.id)}
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}
