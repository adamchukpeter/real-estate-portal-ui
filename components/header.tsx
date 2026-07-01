'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, HardHat } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { SearchHub } from '@/components/search-hub'
import { HeaderAuth } from '@/components/header-auth'
import { cn } from '@/lib/utils'

export function Header() {
  const { lang, setLang, t } = useLang()
  const [searchOpen, setSearchOpen] = useState(false)

  // Dev-toggle state — only for Preview testing
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasPassword, setHasPassword] = useState(false)

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
            {/* Dev Toggles — subtle control panel for Preview */}
            <div className="hidden items-center gap-1.5 rounded-md border border-dashed border-border bg-muted/40 px-2 py-1 text-[10px] text-muted-foreground sm:flex">
              <span className="font-mono font-semibold text-muted-foreground/60 mr-0.5">DEV</span>
              <label className="flex cursor-pointer items-center gap-1 select-none">
                <input
                  type="checkbox"
                  checked={isLoggedIn}
                  onChange={(e) => setIsLoggedIn(e.target.checked)}
                  className="h-3 w-3 accent-graphite cursor-pointer"
                />
                <span>isLoggedIn</span>
              </label>
              <span className="text-border">|</span>
              <label
                className={cn(
                  'flex cursor-pointer items-center gap-1 select-none transition-opacity',
                  !isLoggedIn && 'pointer-events-none opacity-30',
                )}
              >
                <input
                  type="checkbox"
                  checked={hasPassword}
                  onChange={(e) => setHasPassword(e.target.checked)}
                  disabled={!isLoggedIn}
                  className="h-3 w-3 accent-graphite cursor-pointer"
                />
                <span>hasPassword</span>
              </label>
            </div>

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

            {/* Auth block — logged in / logged out */}
            <HeaderAuth
              isLoggedIn={isLoggedIn}
              hasPassword={hasPassword}
              onLogout={() => setIsLoggedIn(false)}
            />
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
