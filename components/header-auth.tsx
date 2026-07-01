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

interface HeaderAuthProps {
  isLoggedIn: boolean
  hasPassword: boolean
  onLogout: () => void
  /** Mobile compact mode: renders only bell + round avatar, no text or dropdown trigger width */
  compact?: boolean
}

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

// ─── Shared notifications panel content ───────────────────────────────────────
function NotificationsPanel({
  readIds,
  onMarkRead,
  onMarkAllRead,
}: {
  readIds: Set<number>
  onMarkRead: (id: number) => void
  onMarkAllRead: () => void
}) {
  const { t } = useLang()
  const unreadCount = NOTIFICATIONS.filter((n) => !readIds.has(n.id)).length

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            {t('Powiadomienia', 'Уведомления')}
          </span>
          {unreadCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-brand"
          >
            {t('Oznacz jako przeczytane', 'Отметить все прочитанными')}
          </button>
        )}
      </div>

      {/* List */}
      <div className="divide-y divide-border overflow-y-auto">
        {NOTIFICATIONS.map((n) => {
          const Icon = BADGE_ICONS[n.type]
          const isWebinar = n.type === 'webinar'
          const isRead = readIds.has(n.id)

          return (
            <div
              key={n.id}
              onClick={() => onMarkRead(n.id)}
              className={cn(
                'cursor-pointer space-y-2 px-4 py-3 transition-colors',
                isRead
                  ? 'bg-white'
                  : isWebinar
                  ? 'bg-amber-50/60'
                  : 'bg-slate-50/70',
                'hover:bg-muted/40',
              )}
            >
              {/* Badge row + unread dot */}
              <div className="flex items-center gap-2">
                {!isRead && (
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                )}
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                    BADGE_STYLES[n.type],
                  )}
                >
                  <Icon className="h-2.5 w-2.5" />
                  {t(BADGE_LABELS[n.type].pl, BADGE_LABELS[n.type].ru)}
                </span>
              </div>

              {/* Text */}
              <p
                className={cn(
                  'text-sm leading-snug',
                  isRead ? 'font-normal text-slate-500' : 'font-semibold text-slate-900',
                )}
              >
                {t(n.textPl, n.textRu)}
              </p>

              {/* Webinar CTA */}
              {isWebinar && (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onMarkRead(n.id)
                  }}
                  className={cn(
                    'h-7 px-3 text-xs',
                    isRead
                      ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                      : 'bg-brand text-brand-foreground hover:bg-brand/90',
                  )}
                >
                  {t('Dołącz', 'Присоединиться')}
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Security Modal — rendered via portal into document.body ──────────────────
function SecurityModal({
  open,
  hasPassword,
  onClose,
  onPasswordCreated,
}: {
  open: boolean
  hasPassword: boolean
  onClose: () => void
  onPasswordCreated: () => void
}) {
  const { t } = useLang()
  // 'info'   — no password yet, show warning + CTA
  // 'create' — user clicked CTA, show 2-field creation form
  const [step, setStep] = useState<'info' | 'create'>('info')
  const [showNew, setShowNew] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)
  const [showOld, setShowOld] = useState(false)

  // Reset to 'info' step whenever the modal opens fresh
  useEffect(() => {
    if (open) setStep('info')
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  // Subtitle changes based on active step
  const subtitle = hasPassword
    ? t('Zmień hasło do swojego konta', 'Смена пароля аккаунта')
    : step === 'create'
    ? t('Utwórz hasło dla logowania e-mail', 'Создайте пароль для входа по e-mail')
    : t('Zarządzaj hasłem do swojego konta', 'Управление паролем аккаунта')

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('Bezpieczeństwo i Hasło', 'Безопасность и пароль')}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative mx-4 w-full max-w-md rounded-xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-graphite/10">
              <Shield className="h-4 w-4 text-graphite" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-foreground">
                {t('Bezpieczeństwo i Hasło', 'Безопасность и пароль')}
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={t('Zamknij', 'Закрыть')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 px-6 py-5">
          {/* ── No password yet: info screen ─────────────────────────────── */}
          {!hasPassword && step === 'info' && (
            <>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-4">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/15">
                  <Shield className="h-3.5 w-3.5 text-brand" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(
                    'Twoje konto zostało utworzone przez serwis zewnętrzny (Google / Facebook). Możesz dodać hasło, aby logować się również przez e-mail.',
                    'Ваш аккаунт создан через внешний сервис (Google / Facebook). Вы можете добавить пароль, чтобы также входить по e-mail.',
                  )}
                </p>
              </div>
              <Button
                className="h-10 w-full bg-brand font-medium text-brand-foreground hover:bg-brand/90"
                onClick={() => setStep('create')}
              >
                {t('Ustaw hasło dla logowania e-mail', 'Задать пароль для входа по e-mail')}
              </Button>
            </>
          )}

          {/* ── No password yet: creation form ───────────────────────────── */}
          {!hasPassword && step === 'create' && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                onPasswordCreated()
              }}
            >
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  {t('Nowe hasło', 'Новый пароль')}
                </Label>
                <div className="relative">
                  <Input
                    type={showNew ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="h-10 pr-10"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={t('Pokaż/ukryj hasło', 'Показать/скрыть пароль')}
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  {t('Powtórz nowe hasło', 'Повторите новый пароль')}
                </Label>
                <div className="relative">
                  <Input
                    type={showRepeat ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeat((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={t('Pokaż/ukryj hasło', 'Показать/скрыть пароль')}
                  >
                    {showRepeat ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 flex-1"
                  onClick={() => setStep('info')}
                >
                  {t('Wstecz', 'Назад')}
                </Button>
                <Button
                  type="submit"
                  className="h-10 flex-[2] bg-brand font-medium text-brand-foreground hover:bg-brand/90"
                >
                  {t('Zapisz i powiąż e-mail', 'Сохранить и привязать e-mail')}
                </Button>
              </div>
            </form>
          )}

          {/* ── Has password: change-password form ───────────────────────── */}
          {hasPassword && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  {t('Stare hasło', 'Старый пароль')}
                </Label>
                <div className="relative">
                  <Input
                    type={showOld ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={t('Pokaż/ukryj hasło', 'Показать/скрыть пароль')}
                  >
                    {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  {t('Nowe hasło', 'Новый пароль')}
                </Label>
                <div className="relative">
                  <Input
                    type={showNew ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={t('Pokaż/ukryj hasło', 'Показать/скрыть пароль')}
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  {t('Powtórz nowe hasło', 'Повторите новый пароль')}
                </Label>
                <div className="relative">
                  <Input
                    type={showRepeat ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeat((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={t('Pokaż/ukryj hasło', 'Показать/скрыть пароль')}
                  >
                    {showRepeat ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  className="h-10 w-full bg-graphite font-medium text-graphite-foreground hover:bg-graphite/90"
                >
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

// ─── Main export ──────────────────────────────────────────────────────────────
export function HeaderAuth({ isLoggedIn, hasPassword, onLogout, compact = false }: HeaderAuthProps) {
  const { t } = useLang()
  const [securityOpen, setSecurityOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  // Simulates the live hasPassword state within this session (toggled by the modal)
  const [simHasPassword, setSimHasPassword] = useState(hasPassword)
  // Tracks which notification IDs have been read
  const [readIds, setReadIds] = useState<Set<number>>(new Set())

  const markRead = (id: number) => setReadIds((prev) => new Set(prev).add(id))
  const markAllRead = () => setReadIds(new Set(NOTIFICATIONS.map((n) => n.id)))
  const unreadCount = NOTIFICATIONS.filter((n) => !readIds.has(n.id)).length

  // Keep in sync if the prop changes externally (e.g. DEV checkbox toggle)
  useEffect(() => {
    setSimHasPassword(hasPassword)
  }, [hasPassword])

  useEffect(() => {
    setMounted(true)
  }, [])

  // ── Logged out state ─────────────────────────────────────────────────────
  // In compact mode the header renders the User icon itself; nothing to render here.
  if (!isLoggedIn) {
    if (compact) return null
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="px-1 text-sm font-medium text-foreground transition-colors hover:text-brand"
        >
          {t('Zaloguj się', 'Войти')}
        </Link>
        <Link
          href="/register"
          className="flex items-center rounded-md border border-graphite px-3 py-1.5 text-sm font-medium text-graphite transition-colors hover:bg-graphite hover:text-graphite-foreground"
        >
          {t('Zarejestruj się', 'Регистрация')}
        </Link>
      </div>
    )
  }

  // ── Logged in — COMPACT (mobile) ─────────────────────────────────────────
  // Bell + icon-only avatar that opens the same DropdownMenu as desktop.
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {mounted && (
          <SecurityModal
            open={securityOpen}
            hasPassword={simHasPassword}
            onClose={() => setSecurityOpen(false)}
            onPasswordCreated={() => setSimHasPassword(true)}
          />
        )}

        {/* Bell */}
        <Popover>
          <PopoverTrigger
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t('Powiadomienia', 'Уведомления')}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand" />
            )}
          </PopoverTrigger>
          {/* Mobile: fixed card anchored below header, full viewport width minus margins */}
          <PopoverContent
            align="end"
            sideOffset={8}
            className="w-[calc(100vw-2rem)] max-h-[70vh] overflow-y-auto rounded-xl border border-border bg-card p-0 shadow-2xl md:w-80"
          >
            <NotificationsPanel
              readIds={readIds}
              onMarkRead={markRead}
              onMarkAllRead={markAllRead}
            />
          </PopoverContent>
        </Popover>

        {/* Avatar — icon-only trigger, same DropdownMenu as desktop */}
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger
            className="flex h-9 w-9 items-center justify-center rounded-full bg-graphite text-sm font-bold text-graphite-foreground transition-opacity hover:opacity-80"
            aria-label={t('Moje konto', 'Мой аккаунт')}
          >
            J
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-1" sideOffset={6}>
            <DropdownMenuItem asChild>
              <Link
                href="/profile"
                className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-2 text-sm"
              >
                <HardHat className="h-4 w-4 text-muted-foreground" />
                {t('Mój profil', 'Мой профиль')}
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-2 text-sm"
              closeOnClick={false}
              onClick={() => {
                setDropdownOpen(false)
                setSecurityOpen(true)
              }}
            >
              <Shield className="h-4 w-4 text-muted-foreground" />
              {t('Bezpieczeństwo', 'Безопасность')}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-2 text-sm text-muted-foreground hover:text-foreground focus:text-foreground"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              {t('Wyloguj się', 'Выйти')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  // ── Logged in — FULL (desktop) ───────────────────────────────────────────
  return (
    <div className="flex items-center gap-1.5">
      {/* Portal-mounted security modal */}
      {mounted && (
        <SecurityModal
          open={securityOpen}
          hasPassword={simHasPassword}
          onClose={() => setSecurityOpen(false)}
          onPasswordCreated={() => setSimHasPassword(true)}
        />
      )}

      {/* Bell / Notifications */}
      <Popover>
        <PopoverTrigger
          className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          aria-label={t('Powiadomienia', 'Уведомления')}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand" />
          )}
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 max-h-[70vh] overflow-y-auto p-0">
          <NotificationsPanel
            readIds={readIds}
            onMarkRead={markRead}
            onMarkAllRead={markAllRead}
          />
        </PopoverContent>
      </Popover>

      {/* Avatar / User dropdown */}
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-graphite text-[11px] font-bold text-graphite-foreground">
            J
          </div>
          <span className="hidden sm:inline">Janusz</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 p-1" sideOffset={6}>
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-2 text-sm"
            >
              <HardHat className="h-4 w-4 text-muted-foreground" />
              {t('Mój profil', 'Мой профиль')}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-2 text-sm"
            closeOnClick={false}
            onClick={() => {
              setDropdownOpen(false)
              setSecurityOpen(true)
            }}
          >
            <Shield className="h-4 w-4 text-muted-foreground" />
            {t('Bezpieczeństwo', 'Безопасность')}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-2 text-sm text-muted-foreground hover:text-foreground focus:text-foreground"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            {t('Wyloguj się', 'Выйти')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
