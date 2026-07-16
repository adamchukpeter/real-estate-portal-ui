'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  User,
  Bookmark,
  Bell,
  MessageSquare,
  FileText,
  Shield,
  HardHat,
  Camera,
} from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

const UNREAD_COUNT = 3

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLang()
  const pathname = usePathname()

  const navItems = [
    {
      href: '/profile',
      icon: User,
      label: t('Profil', 'Профиль'),
      exact: true,
    },
    {
      href: '/profile/bookmarks',
      icon: Bookmark,
      label: t('Zapisane', 'Сохранённые'),
    },
    {
      href: '/profile/notifications',
      icon: Bell,
      label: t('Powiadomienia', 'Уведомления'),
      badge: UNREAD_COUNT,
    },
    {
      href: '/profile/comments',
      icon: MessageSquare,
      label: t('Moje opinie', 'Мои отзывы'),
    },
    {
      href: '/profile/blog',
      icon: FileText,
      label: t('Blog', 'Блог'),
    },
    {
      href: '/profile/security',
      icon: Shield,
      label: t('Bezpieczeństwo', 'Безопасность'),
    },
  ]

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10 sm:px-6">

        {/* ── Sidebar ── */}
        <aside className="hidden w-64 shrink-0 flex-col gap-4 lg:flex">

          {/* Profile card */}
          <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
            <div className="group relative mx-auto mb-3 h-20 w-20">
              {/* Avatar */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-graphite font-heading text-2xl font-bold text-graphite-foreground select-none transition-opacity group-hover:opacity-60">
                JK
              </div>
              {/* Camera overlay */}
              <button
                type="button"
                aria-label={t('Prześlij zdjęcie', 'Загрузить фото')}
                className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Camera className="h-6 w-6 text-white drop-shadow-md" />
              </button>
            </div>
            <p className="font-heading text-base font-bold text-foreground">Jan Kowalski</p>
            <span className="mt-1 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {t('Klient', 'Клиент')}
            </span>
          </div>

          {/* Navigation */}
          <nav className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <ul className="divide-y divide-border">
              {navItems.map(({ href, icon: Icon, label, exact, badge }) => {
                const active = isActive(href, exact)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
                        active
                          ? 'bg-graphite text-graphite-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{label}</span>
                      {badge && badge > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-bold text-brand-foreground">
                          {badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* B2B CTA widget */}
          <div className="rounded-2xl border border-brand/20 bg-brand/5 p-5">
            <p className="text-sm font-semibold leading-snug text-foreground">
              {t(
                'Prowadzisz firmę budowlaną?',
                'У вас строительный бизнес?',
              )}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t(
                'Dodaj profil i zdobywaj zlecenia.',
                'Добавьте профиль и получайте заказы.',
              )}
            </p>
            <Link
              href="/register-business"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-graphite px-3 py-2 text-xs font-semibold text-graphite-foreground transition-colors hover:bg-graphite/80"
            >
              <HardHat className="h-3.5 w-3.5" />
              {t('Dodaj firmę', 'Добавить компанию')}
            </Link>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="min-w-0 flex-1">{children}</main>

      </div>
    </div>
  )
}
