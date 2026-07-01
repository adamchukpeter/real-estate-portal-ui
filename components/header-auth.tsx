'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import {
  Bell,
  ChevronDown,
  HardHat,
  Shield,
  LogOut,
  Megaphone,
  Wrench,
  Video,
  Eye,
  EyeOff,
  X,
} from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// ─── types ────────────────────────────────────────────────────────────────────
interface HeaderAuthProps {
  isLoggedIn: boolean
  hasPassword: boolean
  onLogout: () => void
}

// ─── notifications data ───────────────────────────────────────────────────────
const NOTIFICATIONS = [
  {
    id: 1,
    type: 'changelog' as const,
    textPl: 'Aktualizacja platformy v1.2 — Nowe filtry i szybsze ładowanie mapy',
    textRu: 'Обновление платформы v1.2 — Новые фильтры и быстрая загрузка карты',
  },
  {
    id: 2,
    type: 'system' as const,
    textPl: 'Prace techniczne — Przerwa konserwacyjna 04.07 od godz. 02:00 do 04:00',
    textRu: 'Техобслуживание — Перерыв 04.07 с 02:00 до 04:00',
  },
  {
    id: 3,
    type: 'webinar' as const,
    textPl: 'Zaproszenie na Webinar! Spotkanie z założycielem platformy i omówienie planów rozwoju.',
    textRu: 'Приглашение на вебинар! Встреча с основателем платформы и обсуждение планов развития.',
  },
]

const BADGE_STYLES: Record<string, string> = {
  changelog: 'bg-sky-100 text-sky-700 border-sky-200',
  system: 'bg-secondary text-muted-foreground border-border',
  webinar: 'bg-brand/10 text-brand border-brand/20',
}

const BADGE_ICONS: Record<string, React.ElementType> = {
  changelog: Megaphone,
  system: Wrench,
  webinar: Video,
}

const BADGE_LABELS: Record<string, { pl: string; ru: string }> = {
  changelog: { pl: 'Changelog', ru: 'Changelog' },
  system: { pl: 'System', ru: 'System' },
  webinar: { pl: 'Webinar', ru: 'Вебинар' },
}

// ─── security modal ───────────────────────────────────────────────────────────
function SecurityModal({
  open,
  hasPassword,
  onClose,
}: {
  open: boolean
  hasPassword: boolean
  onClose: () => void
}) {
  const { t } = useLang()
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-md mx-4 rounded-xl bg-card shadow-2xl border border-border">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-graphite/10">
              <Shield className="h-4 w-4 text-graphite" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-foreground">
                {t('Bezpieczeństwo i Hasło', 'Безопасность и пароль')}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t('Zarządzaj hasłem do swojego konta', 'Управление паролем аккаунта')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label={t('Zamknij', 'Закрыть')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-5 space-y-5">
          {!hasPassword ? (
            <>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/15 mt-0.5">
                  <Shield className="h-3.5 w-3.5 text-brand" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(
                    'Twoje konto zostało utworzone przez serwis zewnętrzny (Google / Facebook). Możesz dodać hasło, aby logować się również przez e-mail.',
                    'Ваш аккаунт создан через внешний сервис (Google / Facebook). Вы можете добавить пароль, чтобы также входить по e-mail.',
                  )}
                </p>
              </div>
              <Button className="w-full h-10 bg-brand text-brand-foreground hover:bg-brand/90 font-medium">
                {t('Ustaw hasło dla logowania e-mail', 'Задать пароль для входа по e-mail')}
              </Button>
            </>
          ) : (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  {t('Stare hasło', 'Старый пароль')}
                </Label>
                <div className="relative">
                  <Input type={showOld ? 'text' : 'password'} placeholder="••••••••" className="h-10 pr-10" />
                  <button type="button" onClick={() => setShowOld((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  {t('Nowe hasło', 'Новый пароль')}
                </Label>
                <div className="relative">
                  <Input type={showNew ? 'text' : 'password'} placeholder="••••••••" className="h-10 pr-10" />
                  <button type="button" onClick={() => setShowNew((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  {t('Powtórz nowe hasło', 'Повторите новый пароль')}
                </Label>
                <div className="relative">
                  <Input type={showRepeat ? 'text' : 'password'} placeholder="••••••••" className="h-10 pr-10" />
                  <button type="button" onClick={() => setShowRepeat((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showRepeat ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <Button type="submit" className="w-full h-10 bg-graphite text-graphite-foreground hover:bg-graphite/90 font-medium">
                  {t('Zapisz zmiany', 'Сохранить изменения')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

// ─── main export ──────────────────────────────────────────────────────────────
export function HeaderAuth({ isLoggedIn, hasPassword, onLogout }: HeaderAuthProps) {
  const { t } = useLang()
  const [securityOpen, setSecurityOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const openSecurity = () => {
    setDropdownOpen(false)
    // Wait for dropdown close animation before opening modal
    setTimeout(() => setSecurityOpen(true), 150)
  }

  // ── LOGGED OUT ──────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="text-sm font-medium text-foreground hover:text-brand transition-colors px-1"
        >
          {t('Zaloguj się', 'Войти')}
        </Link>
        <Link
          href="/register"
          className="flex items-center rounded-md border border-graphite px-3 py-1.5 text-sm font-medium text-graphite hover:bg-graphite hover:text-graphite-foreground transition-colors"
        >
          {t('Zarejestruj się', 'Регистрация')}
        </Link>
      </div>
    )
  }

  // ── LOGGED IN ───────────────────────────────────────────────────────────────
  return (
    <>
      {mounted && (
        <SecurityModal
          open={securityOpen}
          hasPassword={hasPassword}
          onClose={() => setSecurityOpen(false)}
        />
      )}

      <div className="flex items-center gap-1.5">

        {/* Bell / Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand" />
              <span className="sr-only">{t('Powiadomienia', 'Уведомления')}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-semibold text-foreground">
                {t('Powiadomienia', 'Уведомления')}
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
                {NOTIFICATIONS.length}
              </span>
            </div>
            <div className="divide-y divide-border">
              {NOTIFICATIONS.map((n) => {
                const Icon = BADGE_ICONS[n.type]
                const isWebinar = n.type === 'webinar'
                return (
                  <div key={n.id} className={cn('px-4 py-3 space-y-2', isWebinar && 'bg-brand/5')}>
                    <span className={cn(
                      'inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                      BADGE_STYLES[n.type],
                    )}>
                      <Icon className="h-2.5 w-2.5" />
                      {t(BADGE_LABELS[n.type].pl, BADGE_LABELS[n.type].ru)}
                    </span>
                    <p className="text-sm text-foreground leading-snug">
                      {t(n.textPl, n.textRu)}
                    </p>
                    {isWebinar && (
                      <Button size="sm" className="h-7 bg-brand text-brand-foreground hover:bg-brand/90 text-xs px-3">
                        {t('Dołącz', 'Присоединиться')}
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </PopoverContent>
        </Popover>

        {/* Avatar / User menu */}
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-graphite text-[11px] font-bold text-graphite-foreground">
                J
              </div>
              <span className="hidden sm:inline">Janusz</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-1" sideOffset={6}>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2.5 cursor-pointer rounded-sm px-2 py-2 text-sm">
                <HardHat className="h-4 w-4 text-muted-foreground" />
                {t('Mój profil', 'Мой профиль')}
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2.5 cursor-pointer rounded-sm px-2 py-2 text-sm"
              onSelect={openSecurity}
            >
              <Shield className="h-4 w-4 text-muted-foreground" />
              {t('Bezpieczeństwo', 'Безопасность')}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-2.5 cursor-pointer rounded-sm px-2 py-2 text-sm text-muted-foreground hover:text-foreground focus:text-foreground"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              {t('Wyloguj się', 'Выйти')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </>
  )
}
