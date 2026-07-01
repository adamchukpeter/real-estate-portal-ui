'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, HardHat, User } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { SearchHub } from '@/components/search-hub'
import { HeaderAuth } from '@/components/header-auth'
import { cn } from '@/lib/utils'

/* ─── shared logo ──────────────────────────────────────────────────────────── */
function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2 text-graphite">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-graphite">
        <HardHat className="h-4 w-4 text-brand-foreground" />
      </div>
      <span className="font-heading text-lg font-bold tracking-tight text-graphite">
        Buduj<span className="text-brand">PL</span>
      </span>
    </Link>
  )
}

export function Header() {
  const { lang, setLang, t } = useLang()
  const [searchOpen, setSearchOpen] = useState(false)

  // Dev-toggle state — only for Preview testing
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasPassword, setHasPassword] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 w-full overflow-x-hidden border-b border-border bg-card/95 backdrop-blur-md">

        {/* ── DESKTOP row (md and up) ─────────────────────────────────────── */}
        <div className="hidden md:flex mx-auto h-16 max-w-7xl items-center gap-4 px-6">
          <Logo />

          {/* Wide search trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="relative mx-4 flex flex-1 cursor-text items-center"
            aria-label={t('Otwórz wyszukiwarkę', 'Открыть поиск')}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <div className="flex h-9 w-full items-center rounded-md border border-border bg-muted/50 pl-9 pr-4 text-left text-sm text-muted-foreground">
              {t(
                'Szukaj nieruchomości, wykonawców lub artykułów...',
                'Поиск недвижимости, исполнителей или статей...',
              )}
            </div>
          </button>

          {/* Language switcher */}
          <div className="flex overflow-hidden rounded-md border border-border bg-secondary text-sm font-medium">
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

          {/* Auth — full desktop variant */}
          <HeaderAuth
            isLoggedIn={isLoggedIn}
            hasPassword={hasPassword}
            onLogout={() => setIsLoggedIn(false)}
          />
        </div>

        {/* ── MOBILE layout (below md) ────────────────────────────────────── */}
        <div className="flex flex-col md:hidden w-full px-4 py-2 bg-card">

          {/* Row 1: Logo + compact icons */}
          <div className="flex h-12 w-full items-center justify-between">
            <Logo />

            {/* Right icon cluster */}
            <div className="flex items-center gap-3">
              {/* Language — minimal pill */}
              <button
                onClick={() => setLang(lang === 'pl' ? 'ru' : 'pl')}
                className="rounded border border-border bg-secondary px-2 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                aria-label={t('Zmień język', 'Сменить язык')}
              >
                {lang.toUpperCase()}
              </button>

              {/* Bell — compact, reuses HeaderAuth bell only when logged in */}
              <HeaderAuth
                isLoggedIn={isLoggedIn}
                hasPassword={hasPassword}
                onLogout={() => setIsLoggedIn(false)}
                compact
              />

              {/* Logged-out fallback: single user icon */}
              {!isLoggedIn && (
                <Link
                  href="/login"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={t('Zaloguj się', 'Войти')}
                >
                  <User className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Row 2: Search bar */}
          <div className="w-full pb-2 pt-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="relative flex h-10 w-full cursor-text items-center rounded-lg border border-border bg-muted/50 px-3 text-sm text-muted-foreground"
              aria-label={t('Szukaj...', 'Поиск...')}
            >
              <Search className="mr-2 h-4 w-4 shrink-0" />
              <span>Szukaj...</span>
            </button>
          </div>
        </div>
      </header>

      {/* Search hub overlay */}
      {searchOpen && <SearchHub onClose={() => setSearchOpen(false)} />}

      {/* Floating DEV toggles — fixed bottom-left, preview only */}
      <div className="fixed bottom-4 left-4 z-[9999] flex items-center gap-3 rounded-lg bg-slate-900/90 px-3 py-2 text-xs text-white shadow-2xl backdrop-blur-sm">
        <span className="font-mono font-bold text-slate-400">DEV</span>
        <label className="flex cursor-pointer select-none items-center gap-1.5">
          <input
            type="checkbox"
            checked={isLoggedIn}
            onChange={(e) => setIsLoggedIn(e.target.checked)}
            className="h-3 w-3 cursor-pointer accent-white"
          />
          <span>isLoggedIn</span>
        </label>
        <span className="text-slate-600">|</span>
        <label
          className={cn(
            'flex cursor-pointer select-none items-center gap-1.5 transition-opacity',
            !isLoggedIn && 'pointer-events-none opacity-30',
          )}
        >
          <input
            type="checkbox"
            checked={hasPassword}
            onChange={(e) => setHasPassword(e.target.checked)}
            disabled={!isLoggedIn}
            className="h-3 w-3 cursor-pointer accent-white"
          />
          <span>hasPassword</span>
        </label>
      </div>
    </>
  )
}
