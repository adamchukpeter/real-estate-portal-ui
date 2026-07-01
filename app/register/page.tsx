'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  HardHat,
  ArrowRight,
  User,
  Building2,
  Check,
  Eye,
  EyeOff,
  ChevronLeft,
} from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

type Role = 'client' | 'company' | null

const CLIENT_PERKS_PL = [
  'Dostęp do tysięcy ofert nieruchomości',
  'Kontakt z zweryfikowanymi firmami',
  'Zapisane wyszukiwania i ulubione',
  'Bezpłatne konsultacje z ekspertami',
]
const CLIENT_PERKS_RU = [
  'Доступ к тысячам предложений недвижимости',
  'Контакт с проверенными компаниями',
  'Сохранённые поиски и избранное',
  'Бесплатные консультации с экспертами',
]
const COMPANY_PERKS_PL = [
  'Profil firmy z certyfikatem jakości',
  'Publikacja nieograniczonej liczby ogłoszeń',
  'Panel zarządzania projektami i klientami',
  'Statystyki wyświetleń i konwersji',
]
const COMPANY_PERKS_RU = [
  'Профиль компании с сертификатом качества',
  'Публикация неограниченного числа объявлений',
  'Панель управления проектами и клиентами',
  'Статистика просмотров и конверсий',
]

function RegisterContent() {
  const { lang, setLang, t } = useLang()
  const [role, setRole] = useState<Role>(null)
  const [step, setStep] = useState<1 | 2>(1)
  const [showPass, setShowPass] = useState(false)

  const perks = role === 'client'
    ? (lang === 'pl' ? CLIENT_PERKS_PL : CLIENT_PERKS_RU)
    : (lang === 'pl' ? COMPANY_PERKS_PL : COMPANY_PERKS_RU)

  return (
    <div className="min-h-screen bg-secondary/40 py-10 px-4">
      {/* Header */}
      <div className="mx-auto mb-10 flex max-w-4xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-graphite">
            <HardHat className="h-4 w-4 text-brand-foreground" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-graphite">
            Buduj<span className="text-brand">PL</span>
          </span>
        </Link>

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

      <div className="mx-auto max-w-4xl">
        {/* Progress */}
        <div className="mb-8 flex items-center gap-3">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  step >= s
                    ? 'bg-brand text-brand-foreground'
                    : 'border-2 border-border bg-card text-muted-foreground',
                )}
              >
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  step >= s ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {s === 1
                  ? t('Wybierz rolę', 'Выберите роль')
                  : t('Dane konta', 'Данные аккаунта')}
              </span>
              {s < 2 && <div className="h-px w-10 bg-border" />}
            </div>
          ))}
        </div>

        {step === 1 ? (
          /* ── STEP 1: Role selection ── */
          <div>
            <div className="mb-8 text-center">
              <h1 className="font-heading text-3xl font-extrabold text-foreground">
                {t('Jak chcesz korzystać z portalu?', 'Как вы хотите использовать портал?')}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(
                  'Wybierz swoją rolę — możesz ją zmienić później.',
                  'Выберите свою роль — её можно изменить позже.',
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Client card */}
              <button
                onClick={() => setRole('client')}
                className={cn(
                  'group relative flex flex-col items-start rounded-xl border-2 bg-card p-7 text-left transition-all hover:shadow-lg',
                  role === 'client'
                    ? 'border-brand shadow-md'
                    : 'border-border hover:border-brand/50',
                )}
              >
                {role === 'client' && (
                  <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                  <User className="h-7 w-7 text-graphite" />
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {t('Jestem klientem', 'Я клиент')}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(
                    'Szukam nieruchomości, działki lub specjalisty budowlanego do swojego projektu.',
                    'Ищу недвижимость, участок или строительного специалиста для своего проекта.',
                  )}
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  {CLIENT_PERKS_PL.slice(0, 3).map((perk, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                      {lang === 'pl' ? CLIENT_PERKS_PL[i] : CLIENT_PERKS_RU[i]}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  {t('Bezpłatne', 'Бесплатно')}
                </span>
              </button>

              {/* Company card */}
              <button
                onClick={() => setRole('company')}
                className={cn(
                  'group relative flex flex-col items-start rounded-xl border-2 bg-card p-7 text-left transition-all hover:shadow-lg',
                  role === 'company'
                    ? 'border-brand shadow-md'
                    : 'border-border hover:border-brand/50',
                )}
              >
                {role === 'company' && (
                  <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
                {/* Popular badge */}
                <span className="absolute right-4 top-4 rounded-full bg-graphite px-2.5 py-0.5 text-[11px] font-semibold text-graphite-foreground">
                  {t('Popularne', 'Популярное')}
                </span>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-graphite/10">
                  <Building2 className="h-7 w-7 text-graphite" />
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {t('Jestem firmą / wykonawcą', 'Я компания / подрядчик')}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(
                    'Świadczę usługi budowlane, remontowe lub sprzedaję nieruchomości.',
                    'Оказываю строительные, ремонтные услуги или продаю недвижимость.',
                  )}
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  {COMPANY_PERKS_PL.slice(0, 3).map((_, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                      {lang === 'pl' ? COMPANY_PERKS_PL[i] : COMPANY_PERKS_RU[i]}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  {t('14 dni za darmo', '14 дней бесплатно')}
                </span>
              </button>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => role && setStep(2)}
                disabled={!role}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3 text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t('Kontynuuj', 'Продолжить')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {t('Masz już konto?', 'Уже есть аккаунт?')}{' '}
              <Link href="/login" className="font-semibold text-brand hover:underline">
                {t('Zaloguj się', 'Войти')}
              </Link>
            </p>
          </div>
        ) : (
          /* ── STEP 2: Account form ── */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <button
                onClick={() => setStep(1)}
                className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                {t('Zmień rolę', 'Изменить роль')}
              </button>

              <div className="mb-7">
                <h1 className="font-heading text-3xl font-extrabold text-foreground">
                  {role === 'client'
                    ? t('Utwórz konto klienta', 'Создать аккаунт клиента')
                    : t('Zarejestruj firmę', 'Зарегистрировать компанию')}
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {t('Wypełnij poniższe pola, aby rozpocząć.', 'Заполните поля ниже, чтобы начать.')}
                </p>
              </div>

              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fname" className="text-sm font-medium text-foreground">
                      {t('Imię', 'Имя')}
                    </label>
                    <input
                      id="fname"
                      type="text"
                      autoComplete="given-name"
                      placeholder={t('Jan', 'Иван')}
                      className="h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lname" className="text-sm font-medium text-foreground">
                      {t('Nazwisko', 'Фамилия')}
                    </label>
                    <input
                      id="lname"
                      type="text"
                      autoComplete="family-name"
                      placeholder={t('Kowalski', 'Иванов')}
                      className="h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                  </div>
                </div>

                {role === 'company' && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-sm font-medium text-foreground">
                      {t('Nazwa firmy', 'Название компании')}
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder={t('np. Kowalski Budownictwo Sp. z o.o.', 'напр. Иванов Строй ��ОО')}
                      className="h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-email" className="text-sm font-medium text-foreground">
                    {t('Adres e-mail', 'Адрес e-mail')}
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jan.kowalski@example.com"
                    className="h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    {t('Numer telefonu', 'Номер телефона')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+48 123 456 789"
                    className="h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-password" className="text-sm font-medium text-foreground">
                    {t('Hasło', 'Пароль')}
                  </label>
                  <div className="relative">
                    <input
                      id="reg-password"
                      type={showPass ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Min. 8 znaków"
                      className="h-10 w-full rounded-lg border border-border bg-card px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPass ? t('Ukryj', 'Скрыть') : t('Pokaż', 'Показать')}
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand" />
                  <span className="text-sm text-muted-foreground">
                    {t(
                      <>Akceptuję <Link href="/terms" className="font-medium text-brand hover:underline">Regulamin</Link> i <Link href="/privacy" className="font-medium text-brand hover:underline">Politykę prywatności</Link></>,
                      <>Принимаю <Link href="/terms" className="font-medium text-brand hover:underline">Условия использования</Link> и <Link href="/privacy" className="font-medium text-brand hover:underline">Политику конфиденциальности</Link></>,
                    )}
                  </span>
                </label>

                <button
                  type="submit"
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {role === 'company'
                    ? t('Zarejestruj firmę', 'Зарегистрировать компанию')
                    : t('Utwórz konto', 'Создать аккаунт')}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Sidebar perks */}
            <aside className="lg:col-span-2">
              <div className="sticky top-8 rounded-xl border border-border bg-card p-6">
                <div
                  className={cn(
                    'mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold',
                    role === 'client'
                      ? 'bg-secondary text-foreground'
                      : 'bg-graphite text-graphite-foreground',
                  )}
                >
                  {role === 'client' ? (
                    <User className="h-3.5 w-3.5" />
                  ) : (
                    <Building2 className="h-3.5 w-3.5" />
                  )}
                  {role === 'client' ? t('Konto klienta', 'Аккаунт клиента') : t('Konto firmowe', 'Корпоративный аккаунт')}
                </div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  {t('Co otrzymujesz:', 'Что вы получаете:')}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                        <Check className="h-3 w-3 text-brand" />
                      </div>
                      {perk}
                    </li>
                  ))}
                </ul>
                {role === 'company' && (
                  <div className="mt-5 rounded-lg bg-brand/10 p-3">
                    <p className="text-xs font-semibold text-brand">
                      {t('14 dni próbne — bez karty kredytowej', '14 дней пробного периода — без карты')}
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return <RegisterContent />
}
