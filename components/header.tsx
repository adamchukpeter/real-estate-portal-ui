'use client'

import Link from 'next/link'
import { Bell, ChevronDown, Search, HardHat } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

export function Header() {
  const { lang, setLang, t } = useLang()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
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

        {/* Search */}
        <div className="relative mx-4 hidden flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder={t(
              'Szukaj nieruchomości, usług, mistrzów...',
              'Поиск недвижимости, услуг, мастеров...',
            )}
            className="h-9 w-full rounded-md border border-border bg-muted/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

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

      {/* Mobile search */}
      <div className="border-t border-border px-4 pb-3 pt-2 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder={t(
              'Szukaj nieruchomości...',
              'Поиск недвижимости...',
            )}
            className="h-9 w-full rounded-md border border-border bg-muted/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>
    </header>
  )
}
