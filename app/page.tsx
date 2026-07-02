'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight, Shield, Zap, Award, Search, HardHat, Users } from 'lucide-react'

import { Header } from '@/components/header'
import { PropertyCard, type Property, type PropertyCategory } from '@/components/property-card'
import { ContractorCard, type Contractor } from '@/components/contractor-card'
import { useLang } from '@/lib/lang-context'

const PROPERTIES: Property[] = [
  // ── Mieszkania ────────────────────────────────────────────────────────────
  {
    id: 1,
    category: 'Mieszkania',
    image: '/images/prop-1.png',
    price: 850000,
    area: 72,
    rooms: 3,
    city: 'Warszawa, Mokotów',
    market: 'Pierwotny',
    title: 'Nowoczesne mieszkanie 3-pokojowe z balkonem',
    titleRu: 'Современная 3-комнатная квартира с балконом',
  },
  {
    id: 2,
    category: 'Mieszkania',
    image: '/images/prop-3.png',
    price: 390000,
    area: 38,
    rooms: 1,
    city: 'Wrocław, Śródmieście',
    market: 'Pierwotny',
    title: 'Kawalerka w centrum, wysoki standard',
    titleRu: 'Студия в центре города, высокий стандарт',
  },
  // ── Domy ─────────────────────────────────────────────────────────────────
  {
    id: 3,
    category: 'Domy',
    image: '/images/prop-2.png',
    price: 1290000,
    area: 142,
    rooms: 5,
    city: 'Kraków, Krowodrza',
    market: 'Wtórny',
    title: 'Szeregówka z ogrodem w spokojnej okolicy',
    titleRu: 'Таунхаус с садом в тихом районе',
  },
  {
    id: 4,
    category: 'Domy',
    image: '/images/prop-4.png',
    price: 1750000,
    area: 210,
    rooms: 6,
    city: 'Gdańsk, Oliwa',
    market: 'Pierwotny',
    title: 'Dom wolnostojący z garażem dwustanowiskowym',
    titleRu: 'Отдельный дом с двойным гаражом',
  },
  // ── Działki ───────────────────────────────────────────────────────────────
  {
    id: 5,
    category: 'Działki',
    image: '/images/prop-1.png',
    price: 320000,
    area: 1200,
    city: 'Poznań, Jeżyce',
    market: 'Wtórny',
    title: 'Działka budowlana w spokojnej dzielnicy',
    titleRu: 'Строительный участок в тихом районе',
    plotTypePl: 'Budowlana',
    plotTypeRu: 'Строительный',
  },
  {
    id: 6,
    category: 'Działki',
    image: '/images/prop-2.png',
    price: 95000,
    area: 4500,
    city: 'Zakopane, Podhale',
    market: 'Wtórny',
    title: 'Działka rekreacyjna z widokiem na Tatry',
    titleRu: 'Рекреационный участок с видом на Татры',
    plotTypePl: 'Rekreacyjna',
    plotTypeRu: 'Рекреационный',
  },
  // ── Komercyjne ────────────────────────────────────────────────────────────
  {
    id: 7,
    category: 'Komercyjne',
    image: '/images/prop-3.png',
    price: 2400000,
    area: 450,
    city: 'Łódź, Śródmieście',
    market: 'Pierwotny',
    title: 'Nowoczesne biuro klasy A w centrum',
    titleRu: 'Современный офис класса А в центре',
    purposePl: 'Biuro',
    purposeRu: 'Офис',
  },
  {
    id: 8,
    category: 'Komercyjne',
    image: '/images/prop-4.png',
    price: 1850000,
    area: 820,
    city: 'Wrocław, Fabryczna',
    market: 'Wtórny',
    title: 'Hala magazynowa z rampą i biurem socjalnym',
    titleRu: 'Складское помещение с рампой и офисом',
    purposePl: 'Magazyn',
    purposeRu: 'Склад',
  },
]

const CONTRACTORS: Contractor[] = [
  {
    id: 1,
    initials: 'PW',
    namePl: 'ProWykończenia Sp. z o.o.',
    nameRu: 'ProWykończenia ООО',
    city: 'Warszawa',
    rating: 4.9,
    reviewCount: 127,
    tagsPl: ['Wykończenia', 'Malowanie'],
    tagsRu: ['Отделка', 'Покраска'],
    photoMain: '/images/work-1a.png',
    photoTopRight: '/images/work-1b.png',
    photoBottomRight: '/images/work-1c.png',
  },
  {
    id: 2,
    initials: 'MT',
    namePl: 'MistrzoTynk Kraków',
    nameRu: 'МастерШтукатур Краков',
    city: 'Kraków',
    rating: 4.8,
    reviewCount: 84,
    tagsPl: ['Tynkowanie', 'Szpachlowanie'],
    tagsRu: ['Штукатурка', 'Шпаклёвка'],
    photoMain: '/images/work-2a.png',
    photoTopRight: '/images/work-2b.png',
    photoBottomRight: '/images/work-2c.png',
  },
  {
    id: 3,
    initials: 'BD',
    namePl: 'BudDom Gdańsk',
    nameRu: 'БудДом Гданьск',
    city: 'Gdańsk',
    rating: 5.0,
    reviewCount: 61,
    tagsPl: ['Budowa domów', 'Konstrukcje'],
    tagsRu: ['Строительство', 'Конструкции'],
    photoMain: '/images/work-3a.png',
    photoTopRight: '/images/work-3b.png',
    photoBottomRight: '/images/work-3c.png',
  },
]

const FEATURES = [
  {
    icon: Shield,
    titlePl: 'Weryfikacja firm',
    titleRu: 'Верификация компаний',
    descPl: 'Każda firma posiada zweryfikowane dane rejestrowe i oceny klientów.',
    descRu: 'Каждая компания имеет проверенные регистрационные данные и отзывы клиентов.',
  },
  {
    icon: Zap,
    titlePl: 'Szybkie zapytania',
    titleRu: 'Быстрые запросы',
    descPl: 'Wyślij zapytanie ofertowe do kilku firm jednocześnie i porównaj oferty.',
    descRu: 'Отправьте запрос сразу в несколько компаний и сравните предложения.',
  },
  {
    icon: Award,
    titlePl: 'Najlepsze oferty',
    titleRu: 'Лучшие предложения',
    descPl: 'Dostęp do ofert deweloperów, agentów i właścicieli prywatnych.',
    descRu: 'Доступ к предложениям застройщиков, агентов и частных владельцев.',
  },
]

// Tab keys are always the PL canonical category names (or 'Wszystkie')
const TABS: Array<{ keyPl: string; keyRu: string; category: PropertyCategory | null }> = [
  { keyPl: 'Wszystkie', keyRu: 'Все',          category: null },
  { keyPl: 'Mieszkania', keyRu: 'Квартиры',    category: 'Mieszkania' },
  { keyPl: 'Domy',       keyRu: 'Дома',        category: 'Domy' },
  { keyPl: 'Działki',    keyRu: 'Участки',     category: 'Działki' },
  { keyPl: 'Komercyjne', keyRu: 'Коммерческие', category: 'Komercyjne' },
]

function HomeContent() {
  const { lang } = useLang()
  const t = (pl: string, ru: string) => (lang === 'pl' ? pl : ru)

  const [activeCategory, setActiveCategory] = useState<PropertyCategory | null>(null)

  const visibleProperties =
    activeCategory === null
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-background">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-24">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              {/* Pill label */}
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {t('Polska · Europa · Nieruchomości i usługi budowlane', 'Польша · Европа · Недвижимость и строительные услуги')}
              </div>

              {/* H1 */}
              <h1 className="font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-foreground text-balance sm:text-5xl xl:text-[3.5rem]">
                {t('Portal Budowlany ', 'Строительный портал ')}
                <span className="text-brand">{t('#1 w Polsce.', '№1 в Польше.')}</span>
                <br />
                {t('Od zakupu ziemi do wykończenia pod klucz.', 'От покупки земли до отделки под ключ.')}
              </h1>

              {/* Subtitle */}
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                {t(
                  'Wszystko w jednym miejscu dla rynku nieruchomości i budownictwa. Tysiące ofert, zweryfikowane firmy i specjaliści na wyciągnięcie ręki.',
                  'Всё в одном месте для рынка недвижимости и строительства. Тысячи предложений, проверенные компании и специалисты на расстоянии одного клика.',
                )}
              </p>

              {/* 3 CTA buttons */}
              <div className="mt-9 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/catalog"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
                >
                  <Search className="h-4 w-4" />
                  {t('Znajdź nieruchomość', 'Найти недвижимость')}
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-graphite hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
                >
                  <Users className="h-4 w-4" />
                  {t('Znajdź wykonawcę', 'Найти подрядчика')}
                </Link>
                <Link
                  href="/register?role=business"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-graphite px-6 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-graphite hover:text-graphite-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
                >
                  <HardHat className="h-4 w-4" />
                  {t('Dołącz jako wykonawca lub sprzedawca', 'Присоединиться как подрядчик')}
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ── LISTINGS ── */}
        <section className="border-t border-slate-100 bg-secondary/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                  {t('Najnowsze oferty', 'Свежие предложения')}
                </p>
                <h2 className="mt-1 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  {t('Najnowsze ogłoszenia', 'Свежие объявления')}
                </h2>
              </div>
              <Link
                href="/search"
                className="hidden items-center gap-1 text-sm font-medium text-brand hover:underline sm:flex"
              >
                {t('Zobacz wszystkie', 'Смотреть все')}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Filter pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              {TABS.map((tab) => {
                const isActive = activeCategory === tab.category
                return (
                  <button
                    key={tab.keyPl}
                    onClick={() => setActiveCategory(tab.category)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-graphite text-graphite-foreground'
                        : 'border border-border bg-card text-muted-foreground hover:border-graphite hover:text-foreground'
                    }`}
                  >
                    {lang === 'pl' ? tab.keyPl : tab.keyRu}
                  </button>
                )
              })}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProperties.map((p) => (
                <PropertyCard key={p.id} property={p} lang={lang} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/search"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                {t('Zobacz wszystkie ogłoszenia', 'Смотреть все объявления')}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── CONTRACTORS ── */}
        <section className="border-t border-slate-100 bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                  {t('Sprawdzone firmy', 'Проверенные компании')}
                </p>
                <h2 className="mt-1 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  {t('Polecani wykonawcy', 'Рекомендуемые исполнители')}
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden items-center gap-1 text-sm font-medium text-brand hover:underline sm:flex"
              >
                {t('Zobacz wszystkich wykonawców', 'Все исполнители')}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CONTRACTORS.map((c) => (
                <ContractorCard key={c.id} contractor={c} lang={lang} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                {t('Zobacz wszystkich wykonawców', 'Все исполнители')}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="border-t border-slate-100 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                {t('Dlaczego my', 'Почему мы')}
              </p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                {t('Zaufaj sprawdzonemu portalowi', 'Доверьтесь проверенному порталу')}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {FEATURES.map(({ icon: Icon, titlePl, titleRu, descPl, descRu }) => (
                <div
                  key={titlePl}
                  className="flex flex-col items-start rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10">
                    <Icon className="h-5 w-5 text-brand" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    {lang === 'pl' ? titlePl : titleRu}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {lang === 'pl' ? descPl : descRu}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-graphite py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-heading text-base font-bold text-graphite-foreground">
              Buduj<span className="text-brand">PL</span>
            </p>
            <p className="text-xs text-graphite-foreground/50">
              © 2025 BudujPL.{' '}
              {t('Wszelkie prawa zastrzeżone.', 'Все права защищены.')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function HomePage() {
  return <HomeContent />
}
