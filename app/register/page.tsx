'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
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

type Role = 'client' | 'business' | null

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

// ─── Inner component — uses useSearchParams (must be inside Suspense) ──────────
function RegisterContent() {
  const { lang, setLang, t } = useLang()
  const searchParams = useSearchParams()

  const [role, setRole] = useState<Role>(null)
  const [step, setStep] = useState<1 | 2>(1)
  const [showPass, setShowPass] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeInvoice, setAgreeInvoice] = useState(false)

  // Auto-advance when ?role=business is in the URL
  useEffect(() => {
    if (searchParams.get('role') === 'business') {
      setRole('business')
      setStep(2)
    }
  }, [searchParams])

  const isCompany = role === 'business'
  const perks = isCompany
    ? lang === 'pl' ? COMPANY_PERKS_PL : COMPANY_PERKS_RU
    : lang === 'pl' ? CLIENT_PERKS_PL : CLIENT_PERKS_RU

  // Shared input class
  const inputCls =
    'h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 w-full'

  return (
    <div className="min-h-screen bg-secondary/40 py-10 px-4">
      {/* Top bar */}
      <div className="mx-auto mb-10 flex max-w-5xl items-center justify-between">
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

      <div className="mx-auto max-w-5xl">
        {/* Stepper */}
        <div className="mb-8 flex items-center gap-3">
          {([1, 2] as const).map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  step > s
                    ? 'bg-brand text-brand-foreground'
                    : step === s
                    ? 'bg-brand text-brand-foreground ring-4 ring-brand/20'
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

        {/* ── STEP 1: Role picker ── */}
        {step === 1 && (
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
                  {CLIENT_PERKS_PL.slice(0, 3).map((_, i) => (
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

              {/* Business card */}
              <button
                onClick={() => setRole('business')}
                className={cn(
                  'group relative flex flex-col items-start rounded-xl border-2 bg-card p-7 text-left transition-all hover:shadow-lg',
                  role === 'business'
                    ? 'border-brand shadow-md'
                    : 'border-border hover:border-brand/50',
                )}
              >
                {role === 'business' && (
                  <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
                {role !== 'business' && (
                  <span className="absolute right-4 top-4 rounded-full bg-graphite px-2.5 py-0.5 text-[11px] font-semibold text-graphite-foreground">
                    {t('Popularne', 'Популярное')}
                  </span>
                )}
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
        )}

        {/* ── STEP 2: Account form ── */}
        {step === 2 && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Form column */}
            <div className="lg:col-span-3">
              {/* Back link */}
              <button
                onClick={() => setStep(1)}
                className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                {t('Zmień rolę', 'Изменить роль')}
              </button>

              <div className="mb-7">
                <h1 className="font-heading text-3xl font-extrabold text-foreground">
                  {isCompany
                    ? t('Zarejestruj firmę', 'Зарегистрировать компанию')
                    : t('Utwórz konto klienta', 'Создать аккаунт клиента')}
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {t('Wypełnij poniższe pola, aby rozpocząć.', 'Заполните поля ниже, чтобы начать.')}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  <span className="text-orange-500">*</span>{' '}
                  {t('Pola obowiązkowe', 'Обязательные поля')}
                </p>
              </div>

              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                {/* Imię + Nazwisko */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fname" className="text-sm font-medium text-foreground">
                      {t('Imię', 'Имя')}
                      <span className="ml-1 text-orange-500">*</span>
                    </label>
                    <input
                      id="fname"
                      type="text"
                      autoComplete="given-name"
                      placeholder={t('Jan', 'Иван')}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lname" className="text-sm font-medium text-foreground">
                      {t('Nazwisko', 'Фамилия')}
                      {isCompany && <span className="ml-1 text-orange-500">*</span>}
                    </label>
                    <input
                      id="lname"
                      type="text"
                      autoComplete="family-name"
                      placeholder={t('Kowalski', 'Иванов')}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Business-only fields */}
                {isCompany && (
                  <>
                    {/* Nazwa firmy */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className="text-sm font-medium text-foreground">
                        {t('Nazwa firmy', 'Название компании')}
                        <span className="ml-1 text-orange-500">*</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder={t('np. Kowalski Budownictwo Sp. z o.o.', 'напр. Иванов Строй ООО')}
                        className={inputCls}
                      />
                    </div>

                    {/* NIP */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="nip" className="text-sm font-medium text-foreground">
                        {t('NIP (Numer Identyfikacji Podatkowej)', 'NIP (Налоговый идентификационный номер)')}
                        <span className="ml-1 text-orange-500">*</span>
                      </label>
                      <input
                        id="nip"
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="0000000000"
                        className={inputCls}
                      />
                      <p className="text-xs text-muted-foreground">
                        {t('10 cyfr, bez myślników', '10 цифр, без дефисов')}
                      </p>
                    </div>

                    {/* Adres rejestracyjny */}
                    <fieldset className="flex flex-col gap-3 rounded-lg border border-border p-4">
                      <legend className="px-1 text-sm font-medium text-foreground">
                        {t('Adres rejestracyjny firmy', 'Юридический адрес компании')}
                      </legend>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="street" className="text-sm font-medium text-foreground">
                          {t('Ulica, nr domu', 'Улица, номер дома')}
                          <span className="ml-1 text-orange-500">*</span>
                        </label>
                        <input
                          id="street"
                          type="text"
                          autoComplete="street-address"
                          placeholder={t('ul. Budowlana 12/3', 'ул. Строительная 12/3')}
                          className={inputCls}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="postcode" className="text-sm font-medium text-foreground">
                            {t('Kod pocztowy', 'Почтовый индекс')}
                            <span className="ml-1 text-orange-500">*</span>
                          </label>
                          <input
                            id="postcode"
                            type="text"
                            placeholder="00-000"
                            maxLength={6}
                            className={inputCls}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="city" className="text-sm font-medium text-foreground">
                            {t('Miejscowość', 'Населённый пункт')}
                            <span className="ml-1 text-orange-500">*</span>
                          </label>
                          <input
                            id="city"
                            type="text"
                            autoComplete="address-level2"
                            placeholder={t('Warszawa', 'Варшава')}
                            className={inputCls}
                          />
                        </div>
                      </div>
                    </fieldset>
                  </>
                )}

                {/* Email + Phone */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="reg-email" className="text-sm font-medium text-foreground">
                      {t('Adres e-mail', 'Адрес e-mail')}
                      <span className="ml-1 text-orange-500">*</span>
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      autoComplete="email"
                      placeholder="jan.kowalski@example.com"
                      className={inputCls}
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
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-password" className="text-sm font-medium text-foreground">
                    {t('Hasło', 'Пароль')}
                    <span className="ml-1 text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-password"
                      type={showPass ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder={t('Min. 8 znaków', 'Мин. 8 символов')}
                      className={cn(inputCls, 'pr-10')}
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

                {/* Checkboxes */}
                <div className="flex flex-col gap-3">
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand"
                    />
                    <span className="text-sm text-muted-foreground">
                      {lang === 'pl' ? (
                        <>
                          Akceptuję{' '}
                          <Link href="/terms" className="font-medium text-brand hover:underline">
                            Regulamin
                          </Link>{' '}
                          i{' '}
                          <Link href="/privacy" className="font-medium text-brand hover:underline">
                            Politykę Prywatności
                          </Link>
                          <span className="ml-1 text-orange-500">*</span>
                        </>
                      ) : (
                        <>
                          Принимаю{' '}
                          <Link href="/terms" className="font-medium text-brand hover:underline">
                            Условия использования
                          </Link>{' '}
                          и{' '}
                          <Link href="/privacy" className="font-medium text-brand hover:underline">
                            Политику конфиденциальности
                          </Link>
                          <span className="ml-1 text-orange-500">*</span>
                        </>
                      )}
                    </span>
                  </label>

                  {isCompany && (
                    <label className="flex cursor-pointer items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={agreeInvoice}
                        onChange={(e) => setAgreeInvoice(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand"
                      />
                      <span className="text-sm text-muted-foreground">
                        {t(
                          'Wyrażam zgodę na otrzymywanie Faktur drogą elektroniczną (e-faktura).',
                          'Соглашаюсь на получение счетов в электронном виде (e-faktura).',
                        )}
                      </span>
                    </label>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!agreeTerms}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {isCompany
                    ? t('Zarejestruj firmę', 'Зарегистрировать компанию')
                    : t('Utwórz konto', 'Создать аккаунт')}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2">
              <div className="sticky top-8 rounded-xl border border-border bg-card p-6">
                {/* Badge */}
                <div
                  className={cn(
                    'mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold',
                    isCompany
                      ? 'bg-graphite text-graphite-foreground'
                      : 'bg-secondary text-foreground',
                  )}
                >
                  {isCompany ? (
                    <Building2 className="h-3.5 w-3.5" />
                  ) : (
                    <User className="h-3.5 w-3.5" />
                  )}
                  {isCompany
                    ? t('Konto firmowe', 'Корпоративный аккаунт')
                    : t('Konto klienta', 'Аккаунт клиента')}
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

                {isCompany && (
                  <>
                    <div className="mt-5 rounded-lg bg-brand/10 p-3">
                      <p className="text-xs font-semibold text-brand">
                        {t('14 dni próbne — bez karty kredytowej', '14 дней пробного периода — без карты')}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {t('Zarejestruj się i odbierz 14 dni za darmo', 'Зарегистрируйтесь и получите 14 дней бесплатно')}
                    </button>
                  </>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

// Suspense boundary required by useSearchParams in Next.js App Router
export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterContent />
    </Suspense>
  )
}
