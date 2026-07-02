'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight, Shield, Zap, Award, Search, HardHat, Users } from 'lucide-react'
import { Header } from '@/components/header'
import { PropertyCard, type Property } from '@/components/property-card'
import { useLang } from '@/lib/lang-context'

const PROPERTIES: Property[] = [
  {
    id: 1,
    image: '/images/prop-1.png',
    price: 850000,
    area: 72,
    city: 'Warszawa, Mokotów',
    rooms: 3,
    market: 'Pierwotny',
    title: 'Nowoczesne mieszkanie 3-pokojowe z balkonem',
    titleRu: 'Современная 3-комнатная квартира с балконом',
  },
  {
    id: 2,
    image: '/images/prop-2.png',
    price: 1290000,
    area: 142,
    city: 'Kraków, Krowodrza',
    rooms: 5,
    market: 'Wtórny',
    title: 'Szeregówka z ogrodem w spokojnej okolicy',
    titleRu: 'Таунхаус с садом в тихом районе',
  },
  {
    id: 3,
    image: '/images/prop-3.png',
    price: 390000,
    area: 38,
    city: 'Wrocław, Śródmieście',
    rooms: 1,
    market: 'Pierwotny',
    title: 'Kawalerka w centrum, wysoki standard',
    titleRu: 'Студия в центре города, высокий стандарт',
  },
  {
    id: 4,
    image: '/images/prop-4.png',
    price: 1750000,
    area: 210,
    city: 'Gdańsk, Oliwa',
    rooms: 6,
    market: 'Pierwotny',
    title: 'Dom wolnostojący z garażem dwustanowiskowym',
    titleRu: 'Отдельный дом с двойным гаражом',
  },
]

const STATS = [
  { value: '24 000+', labelPl: 'Aktywnych ogłoszeń', labelRu: 'Активных объявлений' },
  { value: '3 800+', labelPl: 'Zweryfikowanych firm', labelRu: 'Проверенных компаний' },
  { value: '98%', labelPl: 'Zadowolonych klientów', labelRu: 'Довольных клиентов' },
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

const FILTER_PILLS_PL = ['Wszystkie', 'Mieszkania', 'Domy', 'Działki', 'Komercyjne']
const FILTER_PILLS_RU = ['Все', 'Квартиры', 'Дома', 'Участки', 'Коммерческие']

function HomeContent() {
  const { lang } = useLang()
  const t = (pl: string, ru: string) => (lang === 'pl' ? pl : ru)
  const pills = lang === 'pl' ? FILTER_PILLS_PL : FILTER_PILLS_RU

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

              {/* Stats */}
              <div className="mt-12 grid w-full grid-cols-3 gap-4 border-t border-border pt-8">
                {STATS.map((s) => (
                  <div key={s.value} className="flex flex-col items-center">
                    <p className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-xs leading-tight text-muted-foreground">
                      {lang === 'pl' ? s.labelPl : s.labelRu}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── LISTINGS ── */}
        <section className="bg-secondary/40 py-14">
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
              {pills.map((label, i) => (
                <button
                  key={i}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    i === 0
                      ? 'bg-graphite text-graphite-foreground'
                      : 'border border-border bg-card text-muted-foreground hover:border-graphite hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROPERTIES.map((p) => (
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

        {/* ── FEATURES ── */}
        <section className="py-14">
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
