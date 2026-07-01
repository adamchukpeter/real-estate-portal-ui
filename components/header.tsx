'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, ChevronDown, Search, HardHat } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { SearchHub } from '@/components/search-hub'
import { cn } from '@/lib/utils'

export function Header() {
  const { lang, setLang, t } = useLang()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-graphite"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-graphite">
              <HardHat className="h-4 w-4 text-brand-foreground" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-graphite">
              Buduj<span className="text-brand">PL</span>
            </span>
          </Link>

          {/* Search trigger — desktop */}
          <button
            onClick={() => setSearchOpen(true)}
            className="relative mx-4 hidden flex-1 cursor-text items-center md:flex"
            aria-label={t('Otwórz wyszukiwarkę', 'Открыть поиск')}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <div className="h-9 w-full rounded-md border border-border bg-muted/50 pl-9 pr-4 text-left text-sm text-muted-foreground flex items-center">
              {t(
                'Szukaj nieruchomości, wykonawców lub artykułów...',
                'Поиск недвижимости, исполнителей или статей...',
              )}
            </div>
          </button>

          <div className="ml-auto flex items-center gap-2">
            {/* Language switcher */}
            <div className="flex items-center rounded-md border border-border bg-secondary overflow-hidden text-sm font-medium">
              <button
                onClick={() => setLang('pl')}
                className={cn(
                  'px-3 py-1.5 transition-colors',
                  lang === 'pl'
                    ? 'bg-graphite text-graphite-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                PL
              </button>
              <button
                onClick={() => setLang('ru')}
                className={cn(
                  'px-3 py-1.5 transition-colors',
                  lang === 'ru'
                    ? 'bg-graphite text-graphite-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                RU
              </button>
            </div>

            {/* Notifications */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand" />
              <span className="sr-only">{t('Powiadomienia', 'Уведомления')}</span>
            </button>

            {/* User avatar */}
            <button className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                A
              </div>
              <span className="hidden sm:inline">Anna K.</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile search trigger */}
        <div className="border-t border-border px-4 pb-3 pt-2 md:hidden">
          <button
            onClick={() => setSearchOpen(true)}
            className="relative flex w-full cursor-text items-center"
            aria-label={t('Otwórz wyszukiwarkę', 'Открыть поиск')}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <div className="h-9 w-full rounded-md border border-border bg-muted/50 pl-9 pr-4 text-left text-sm text-muted-foreground flex items-center">
              {t('Szukaj nieruchomości...', 'Поиск недвижимости...')}
            </div>
          </button>
        </div>
      </header>

      {/* Search hub overlay */}
      {searchOpen && <SearchHub onClose={() => setSearchOpen(false)} />}
    </>
  )
}
