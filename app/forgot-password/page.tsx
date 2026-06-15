'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HardHat, ArrowLeft, ArrowRight, MailCheck, RefreshCw } from 'lucide-react'
import { LangProvider, useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

type Step = 'request' | 'sent'

function ForgotPasswordContent() {
  const { lang, setLang, t } = useLang()
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<Step>('request')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) setStep('sent')
  }

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

        {/* Form area */}
        <div className="mx-auto w-full max-w-sm">
          {step === 'request' ? (
            <>
              {/* Back link */}
              <Link
                href="/login"
                className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t('Wróć do logowania', 'Вернуться ко входу')}
              </Link>

              {/* Heading */}
              <div className="mb-8">
                {/* Icon badge */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                  <MailCheck className="h-6 w-6 text-brand" />
                </div>
                <h1 className="font-heading text-3xl font-extrabold text-foreground">
                  {t('Odzyskaj hasło', 'Восстановление пароля')}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(
                    'Podaj adres e-mail powiązany z kontem. Wyślemy Ci link do resetowania hasła.',
                    'Укажите адрес e-mail, связанный с вашим аккаунтом. Мы отправим вам ссылку для сброса пароля.',
                  )}
                </p>
              </div>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {t('Adres e-mail', 'Адрес e-mail')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jan.kowalski@example.com"
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t('Wyślij link resetujący', 'Отправить ссылку для сброса')}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                {t('Pamiętasz hasło?', 'Помните пароль?')}{' '}
                <Link href="/login" className="font-semibold text-brand hover:underline">
                  {t('Zaloguj się', 'Войти')}
                </Link>
              </p>
            </>
          ) : (
            /* ── Success state ── */
            <div className="flex flex-col items-center text-center">
              {/* Animated check badge */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10">
                <MailCheck className="h-8 w-8 text-brand" />
              </div>

              <h1 className="font-heading text-3xl font-extrabold text-foreground">
                {t('Sprawdź swoją skrzynkę', 'Проверьте вашу почту')}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(
                  'Wysłaliśmy link do resetowania hasła na adres',
                  'Мы отправили ссылку для сброса пароля на адрес',
                )}{' '}
                <span className="font-semibold text-foreground">{email}</span>
                {t(
                  '. Sprawdź folder spam, jeśli nie widzisz wiadomości.',
                  '. Если письмо не пришло, проверьте папку «Спам».',
                )}
              </p>

              {/* Steps */}
              <ol className="mt-8 w-full space-y-3 text-left">
                {[
                  t('Otwórz wiadomość e-mail od BudujPL', 'Откройте письмо от BudujPL'),
                  t('Kliknij link „Resetuj hasło"', 'Нажмите на ссылку «Сбросить пароль»'),
                  t('Ustaw nowe, bezpieczne hasło', 'Установите новый надёжный пароль'),
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>

              {/* Resend */}
              <div className="mt-10 flex w-full flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setStep('request')}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <RefreshCw className="h-4 w-4" />
                  {t('Wyślij ponownie', 'Отправить снова')}
                </button>
                <Link
                  href="/login"
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t('Wróć do logowania', 'Вернуться ко входу')}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Bottom footnote */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          {t(
            'Potrzebujesz pomocy? Skontaktuj się z nami: pomoc@budujpl.pl',
            'Нужна помощь? Напишите нам: pomoc@budujpl.pl',
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
          {/* Security tips card */}
          <div className="mb-8 rounded-2xl border border-graphite-foreground/20 bg-graphite/40 p-6 backdrop-blur-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">
              {t('Wskazówki bezpieczeństwa', 'Советы по безопасности')}
            </p>
            <ul className="space-y-3">
              {[
                t(
                  'Używaj unikalnego hasła dla każdej strony',
                  'Используйте уникальный пароль для каждого сайта',
                ),
                t(
                  'Hasło powinno mieć minimum 12 znaków',
                  'Пароль должен содержать не менее 12 символов',
                ),
                t(
                  'Włącz weryfikację dwuetapową (2FA)',
                  'Включите двухфакторную аутентификацию (2FA)',
                ),
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-brand/20 text-center text-[10px] font-bold leading-4 text-brand">
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed text-graphite-foreground/80">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 border-t border-graphite-foreground/20 pt-8">
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

export default function ForgotPasswordPage() {
  return (
    <LangProvider>
      <ForgotPasswordContent />
    </LangProvider>
  )
}
