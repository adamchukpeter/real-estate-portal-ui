'use client'

import { useState } from 'react'
import { Bell, Shield, CheckCircle, Trash2 } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

type Category = 'system' | 'security' | 'verification'

interface Notification {
  id: number
  category: Category
  titlePl: string
  titleRu: string
  bodyPl: string
  bodyRu: string
  date: string
  read: boolean
}

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  system:       Bell,
  security:     Shield,
  verification: CheckCircle,
}

const CATEGORY_LABELS: Record<Category, { pl: string; ru: string }> = {
  system:       { pl: 'System',         ru: 'Система'      },
  security:     { pl: 'Bezpieczeństwo', ru: 'Безопасность' },
  verification: { pl: 'Weryfikacja',    ru: 'Верификация'  },
}

const INITIAL: Notification[] = [
  {
    id: 1, category: 'verification', read: false, date: '16 lip 2026',
    titlePl: 'Profil zweryfikowany', titleRu: 'Профиль верифицирован',
    bodyPl: 'Twój profil klienta został pomyślnie zweryfikowany. Możesz teraz w pełni korzystać z platformy.',
    bodyRu: 'Ваш профиль клиента успешно верифицирован. Теперь вы можете в полной мере пользоваться платформой.',
  },
  {
    id: 2, category: 'security', read: false, date: '14 lip 2026',
    titlePl: 'Nowe logowanie wykryte', titleRu: 'Обнаружен новый вход',
    bodyPl: 'Wykryliśmy nowe logowanie z urządzenia w Warszawie. Jeśli to nie byłeś Ty, zmień hasło.',
    bodyRu: 'Мы обнаружили новый вход с устройства в Варшаве. Если это были не вы, смените пароль.',
  },
  {
    id: 3, category: 'system', read: false, date: '10 lip 2026',
    titlePl: 'Nowe ogłoszenia w Twojej okolicy', titleRu: 'Новые объявления в вашем районе',
    bodyPl: 'Pojawiło się 5 nowych ogłoszeń firm budowlanych w odległości 20 km od Ciebie.',
    bodyRu: 'В радиусе 20 км от вас появилось 5 новых объявлений строительных компаний.',
  },
  {
    id: 4, category: 'system', read: true, date: '5 lip 2026',
    titlePl: 'Zaproszenie do programu partnerskiego', titleRu: 'Приглашение в партнёрскую программу',
    bodyPl: 'Dołącz do programu partnerskiego BudujPL i zarabiaj na poleceniach.',
    bodyRu: 'Присоединяйтесь к партнёрской программе BudujPL и зарабатывайте на рекомендациях.',
  },
  {
    id: 5, category: 'security', read: true, date: '1 lip 2026',
    titlePl: 'Hasło zostało zmienione', titleRu: 'Пароль изменён',
    bodyPl: 'Twoje hasło zostało pomyślnie zmienione 1 lipca 2026.',
    bodyRu: 'Ваш пароль был успешно изменён 1 июля 2026 года.',
  },
]

export default function NotificationsPage() {
  const { t, lang } = useLang()
  const [items, setItems] = useState(INITIAL)
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const [removing, setRemoving] = useState<Set<number>>(new Set())

  const unreadCount = items.filter((n) => !n.read).length

  function toggleItem(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
        // Mark as read optimistically
        setItems((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)))
      }
      return next
    })
  }

  function handleDelete(id: number) {
    setRemoving((prev) => new Set(prev).add(id))
    setTimeout(() => {
      setItems((prev) => prev.filter((n) => n.id !== id))
      setRemoving((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 300)
  }

  const categoryColorMap: Record<Category, string> = {
    system:       'bg-sky-100 text-sky-700',
    security:     'bg-red-100 text-red-700',
    verification: 'bg-emerald-100 text-emerald-700',
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {t('Powiadomienia', 'Уведомления')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {unreadCount > 0
              ? t(`${unreadCount} nieprzeczytanych`, `${unreadCount} непрочитанных`)
              : t('Wszystko przeczytane', 'Всё прочитано')}
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-brand px-2 text-sm font-bold text-brand-foreground">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const Icon = CATEGORY_ICONS[item.category]
          const isExpanded = expanded.has(item.id)
          const isRemoving = removing.has(item.id)
          const title = lang === 'pl' ? item.titlePl : item.titleRu
          const body  = lang === 'pl' ? item.bodyPl  : item.bodyRu

          return (
            <div
              key={item.id}
              className={cn(
                'overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300',
                !item.read && 'border-brand/30 bg-brand/5',
                isRemoving && '-translate-x-8 opacity-0',
              )}
            >
              <div
                className="flex cursor-pointer items-start gap-4 p-4"
                onClick={() => toggleItem(item.id)}
              >
                {/* Unread dot */}
                <div className="relative mt-0.5 shrink-0">
                  <span className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full',
                    categoryColorMap[item.category],
                  )}>
                    <Icon className="h-4 w-4" />
                  </span>
                  {!item.read && (
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className={cn('text-sm text-foreground', !item.read && 'font-semibold')}>
                      {title}
                    </p>
                    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide', categoryColorMap[item.category])}>
                      {lang === 'pl' ? CATEGORY_LABELS[item.category].pl : CATEGORY_LABELS[item.category].ru}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.date}</p>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }}
                  aria-label={t('Usuń', 'Удалить')}
                  className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Expanded body */}
              <div className={cn(
                'overflow-hidden transition-all duration-300',
                isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0',
              )}>
                <p className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                  {body}
                </p>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
