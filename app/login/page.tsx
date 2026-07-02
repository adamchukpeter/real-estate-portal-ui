'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, HardHat, ArrowRight, Facebook } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

function LoginContent() {
  const { lang, setLang, t } = useLang()
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex min-h-screen">
      {/* ── LEFT: Form ── */}
      <div className="flex w-full flex-col justify-between px-6 py-8 sm:px-10 lg:w-1/2 lg:px-16">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-graphite">
              <HardHat className="h-4 w-4 text-brand-foreground" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-graphite">
              Buduj<span className="text-brand">PL</span>
            </span>
          </Link>

          {/* Lang switcher */}
          <div className="flex overflow-hidden rounded-md border border-border text-sm font-medium">
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
        </div>

        {/* Form card */}
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-extrabold text-foreground">
              {t('Zaloguj się', 'Войти в аккаунт')}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                'Witaj ponownie! Wprowadź swoje dane, aby kontynuować.',
                'С возвращением! Введите данные для входа.',
              )}
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                {t('Adres e-mail', 'Адрес e-mail')}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jan.kowalski@example.com"
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  {t('Hasło', 'Пароль')}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-brand hover:underline"
                >
                  {t('Zapomniałeś hasła?', 'Забыли пароль?')}
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                <button
                  type="button"
                  aria-label={showPass ? t('Ukryj hasło', 'Скрыть пароль') : t('Pokaż hasło', 'Показать пароль')}
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border accent-brand"
              />
              <span className="text-sm text-muted-foreground">
                {t('Zapamiętaj mnie', 'Запомнить меня')}
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t('Zaloguj się', 'Войти')}
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                {t('lub kontynuuj przez', 'или продолжить через')}
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            {/* Google OAuth */}
            <button
              type="button"
              className="flex h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            {/* Facebook OAuth */}
            <button
              type="button"
              className="flex h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Facebook className="h-4 w-4 text-[#1877F2]" aria-hidden="true" />
              Facebook
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t('Nie masz konta?', 'Нет аккаунта?')}{' '}
            <Link href="/register" className="font-semibold text-brand hover:underline">
              {t('Zarejestruj się', 'Зарегистрироваться')}
            </Link>
          </p>
        </div>

        {/* Bottom */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          {lang === 'pl' ? (
            <>
              Logując się, akceptujesz nasz{' '}
              <Link href="/terms" className="underline-offset-2 hover:underline">
                Regulamin
              </Link>{' '}
              i{' '}
              <Link href="/privacy-policy" className="underline-offset-2 hover:underline">
                Politykę prywatności
              </Link>
              .
            </>
          ) : (
            <>
              Входя в систему, вы принимаете наши{' '}
              <Link href="/terms" className="underline-offset-2 hover:underline">
                Условия использования
              </Link>{' '}
              и{' '}
              <Link href="/privacy-policy" className="underline-offset-2 hover:underline">
                Политику конфиденциальности
              </Link>
              .
            </>
          )}
        </p>
      </div>

      {/* ── RIGHT: Visual ── */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <Image
          src="/images/login-bg.png"
          alt="Warsaw skyline"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-graphite/60" />

        {/* Content over image */}
        <div className="relative z-10 flex flex-col justify-end p-14 pb-16">
          <blockquote className="max-w-md">
            <p className="font-heading text-2xl font-bold leading-snug text-graphite-foreground text-balance">
              &ldquo;{t(
                'Znaleźliśmy idealną działkę i ekipę remontową w ciągu tygodnia. Polecam każdemu.',
                'Мы нашли идеальный участок и строительную бригаду за неделю. Рекомендую всем.',
              )}&rdquo;
            </p>
            <footer className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-heading font-bold text-brand-foreground">
                M
              </div>
              <div>
                <p className="text-sm font-semibold text-graphite-foreground">Michał Zawadzki</p>
                <p className="text-xs text-graphite-foreground/60">Warszawa</p>
              </div>
            </footer>
          </blockquote>

          {/* Stats row */}
          <div className="mt-10 flex gap-8 border-t border-graphite-foreground/20 pt-8">
            {[
              { v: '24 000+', l: t('Ogłoszeń', 'Объявлений') },
              { v: '3 800+', l: t('Firm', 'Компаний') },
              { v: '12 krajów', l: t('Zasięg', 'Охват') },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-heading text-xl font-extrabold text-graphite-foreground">{s.v}</p>
                <p className="text-xs text-graphite-foreground/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <LoginContent />
}
