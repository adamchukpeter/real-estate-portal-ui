'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  X,
  ArrowRight,
  MapPin,
  BedDouble,
  Maximize2,
  Paintbrush,
  Zap,
  SquareStack,
  ShoppingCart,
  BookOpen,
  Newspaper,
  ChevronRight,
  Building2,
} from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = 'listings' | 'portfolio' | 'blog' | 'shop'

// ─── Mock data ────────────────────────────────────────────────────────────────

const LISTINGS = [
  {
    id: 1,
    img: '/images/prop-1.png',
    price: '620 000 PLN',
    area: 58,
    rooms: 3,
    city: 'Warszawa',
    desc: 'Nowe mieszkanie na Mokotowie, III piętro, winda, miejsce parkingowe w cenie.',
  },
  {
    id: 2,
    img: '/images/prop-2.png',
    price: '480 000 PLN',
    area: 72,
    rooms: 4,
    city: 'Kraków',
    desc: 'Dom szeregowy z ogrodem w spokojnej dzielnicy, blisko centrum.',
  },
  {
    id: 3,
    img: '/images/prop-3.png',
    price: '295 000 PLN',
    area: 34,
    rooms: 1,
    city: 'Wrocław',
    desc: 'Studio z aneksem kuchennym, idealne pod wynajem lub start własny.',
  },
]

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    img: '/images/prop-4.png',
    tags: ['#elektryka', '#smart-home'],
    icon: <Zap className="h-3.5 w-3.5" />,
    company: 'ElektroMistrz Sp.',
    href: '/portfolio/1',
  },
  {
    id: 2,
    img: '/images/prop-1.png',
    tags: ['#malowanie', '#wnętrza'],
    icon: <Paintbrush className="h-3.5 w-3.5" />,
    company: 'ColorPro Studio',
    href: '/portfolio/2',
  },
  {
    id: 3,
    img: '/images/prop-2.png',
    tags: ['#glazura', '#łazienka'],
    icon: <SquareStack className="h-3.5 w-3.5" />,
    company: 'Kaflex Glazura',
    href: '/portfolio/3',
  },
]

const BLOG_POSTS = [
  {
    id: 1,
    img: '/images/prop-3.png',
    category: 'Aktualności',
    title: 'Nowe przepisy budowlane 2025 – co zmienia się dla inwestorów?',
    excerpt: 'Ministerstwo Infrastruktury ogłosiło pakiet zmian w prawie budowlanym obowiązujący od stycznia.',
  },
  {
    id: 2,
    img: '/images/prop-4.png',
    category: 'Artykuły',
    title: 'Jak wybrać wykonawcę? 7 pytań, które musisz zadać',
    excerpt: 'Przed podpisaniem umowy sprawdź te kluczowe kwestie, by uniknąć kosztownych błędów.',
  },
  {
    id: 3,
    img: '/images/prop-1.png',
    category: 'Design',
    title: 'Trendy aranżacji wnętrz w 2025 roku – minimalizm wraca do łask',
    excerpt: 'Projektanci zgodnie wskazują na powrót czystych linii i naturalnych materiałów.',
  },
]

const SHOP_ITEMS = [
  {
    id: 1,
    img: '/images/prop-2.png',
    name: 'Farba akrylowa Premium Matt 10L',
    specs: 'Kolor: Biały | Wydajność: 120 m² | VOC: <3 g/L',
    price: '189 PLN',
  },
  {
    id: 2,
    img: '/images/prop-3.png',
    name: 'Płytki ceramiczne Gris 60×60 (1 m²)',
    specs: 'Gatunek: I | Mrozoodporność: tak | Antypoślizg: R10',
    price: '64 PLN',
  },
  {
    id: 3,
    img: '/images/prop-4.png',
    name: 'Przewód instalacyjny YDY 3×2,5mm 100m',
    specs: 'Napięcie: 450/750V | Izolacja: PVC | Cu',
    price: '238 PLN',
  },
]

// ─── Tag logic ────────────────────────────────────────────────────────────────

function getListingTags(query: string): string[] {
  const q = query.toLowerCase()
  if (q.includes('warszawa')) return ['Mokotów', 'Wola', '2-pokojowe', 'Rynek pierwotny']
  if (q.includes('kraków')) return ['Podgórze', 'Krowodrza', '3-pokojowe', 'Rynek wtórny']
  if (q.includes('mieszkanie') || q.includes('квартира')) return ['Kupno', 'Wynajem', 'Warszawa', 'Kraków']
  if (q.includes('dom') || q.includes('дом')) return ['Sprzedaż', 'Gdańsk', 'Wrocław', 'Z garażem']
  return ['Mieszkania', 'Domy', 'Działki', 'Nowe inwestycje']
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TagRow({ query, onTagClick }: { query: string; onTagClick: (tag: string) => void }) {
  const tags = getListingTags(query)
  return (
    <div className="flex flex-wrap gap-2 py-3">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-brand hover:bg-brand/10 hover:text-brand"
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

function SectionLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-opacity hover:opacity-80"
    >
      {label}
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  )
}

// ─── Tab panels ───────────────────────────────────────────────────────────────

function ListingsPanel({ query, onTagClick, t }: { query: string; onTagClick: (t: string) => void; t: (a: string, b: string) => string }) {
  return (
    <div>
      <TagRow query={query} onTagClick={onTagClick} />
      <div className="pb-2">
        <SectionLink href="/catalog" label={t('Przejdź do wyników wyszukiwania w Ogłoszeniach', 'Перейти к результатам поиска в Объявлениях')} />
      </div>
      <ul className="mt-3 divide-y divide-border">
        {LISTINGS.map((item) => (
          <li key={item.id}>
            <Link
              href={`/catalog/${item.id}`}
              className="flex items-start gap-3 py-3 transition-colors hover:bg-muted/40 rounded-md px-1"
            >
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                <Image src={item.img} alt={item.city} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-sm font-semibold text-graphite">{item.price}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Maximize2 className="h-3 w-3" />{item.area} m²</span>
                  <span className="flex items-center gap-1"><BedDouble className="h-3 w-3" />{item.rooms} {t('pok.', 'комн.')}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{item.city}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{item.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50 mt-1" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PortfolioPanel({ t }: { t: (a: string, b: string) => string }) {
  return (
    <div>
      <div className="flex flex-wrap gap-3 py-3">
        <div className="flex flex-col gap-0.5">
          <label className="text-xs text-muted-foreground">{t('Rodzaj usług', 'Вид услуг')}</label>
          <select className="h-8 rounded-md border border-border bg-secondary px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20">
            <option>{t('Wszystkie', 'Все')}</option>
            <option>Elektryka</option>
            <option>Malowanie</option>
            <option>Glazura</option>
          </select>
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-xs text-muted-foreground">{t('Lokalizacja', 'Город')}</label>
          <select className="h-8 rounded-md border border-border bg-secondary px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20">
            <option>{t('Całe PL', 'Вся PL')}</option>
            <option>Warszawa</option>
            <option>Kraków</option>
            <option>Wrocław</option>
            <option>Gdańsk</option>
          </select>
        </div>
      </div>
      <div className="pb-3">
        <SectionLink href="/portfolio" label={t('Przejdź do wyników wyszukiwania w Portfolio', 'Перейти к результатам поиска в Портфолио')} />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PORTFOLIO_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
          >
            <div className="relative h-28 w-full overflow-hidden bg-muted">
              <Image src={item.img} alt={item.company} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-2">
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[10px] text-muted-foreground">{tag}</span>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  {item.icon}
                </div>
                <span className="text-[11px] font-medium text-graphite truncate">{item.company}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function BlogPanel({ t }: { t: (a: string, b: string) => string }) {
  const [onlyVideo, setOnlyVideo] = useState(false)
  const categoryColors: Record<string, string> = {
    'Aktualności': 'bg-blue-100 text-blue-700',
    'Artykuły': 'bg-emerald-100 text-emerald-700',
    'Design': 'bg-purple-100 text-purple-700',
    'Budowa': 'bg-orange-100 text-orange-700',
  }
  return (
    <div>
      <div className="flex flex-wrap items-end gap-3 py-3">
        <div className="flex flex-col gap-0.5">
          <label className="text-xs text-muted-foreground">{t('Kategoria', 'Категория')}</label>
          <select className="h-8 rounded-md border border-border bg-secondary px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20">
            <option>{t('Wszystkie', 'Все')}</option>
            <option>Aktualności</option>
            <option>Artykuły</option>
            <option>Budowa</option>
            <option>Design</option>
          </select>
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-xs text-muted-foreground">{t('Okres', 'Период')}</label>
          <select className="h-8 rounded-md border border-border bg-secondary px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20">
            <option>{t('Ostatni miesiąc', 'Последний месяц')}</option>
            <option>{t('Ostatnie pół roku', 'Последние полгода')}</option>
            <option>{t('Wszystkie', 'Всё время')}</option>
          </select>
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-xs text-muted-foreground">{t('Sortowanie', 'Сортировка')}</label>
          <select className="h-8 rounded-md border border-border bg-secondary px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20">
            <option>{t('Najbardziej trafne', 'По релевантности')}</option>
            <option>{t('Najnowsze', 'Сначала новые')}</option>
          </select>
        </div>
        <label className="flex cursor-pointer items-center gap-1.5 pb-1 text-xs font-medium text-foreground">
          <input
            type="checkbox"
            checked={onlyVideo}
            onChange={(e) => setOnlyVideo(e.target.checked)}
            className="h-3.5 w-3.5 accent-[var(--color-brand)]"
          />
          {t('Tylko wideo', 'Только видео')}
        </label>
      </div>
      <div className="pb-3">
        <SectionLink href="/blog" label={t('Przejdź do pełnego Bloga', 'Перейти в полный Блог')} />
      </div>
      <ul className="divide-y divide-border">
        {BLOG_POSTS.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.id}`}
              className="flex items-start gap-3 py-3 transition-colors hover:bg-muted/40 rounded-md px-1"
            >
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                <Image src={post.img} alt={post.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <span className={cn('inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide', categoryColors[post.category] ?? 'bg-muted text-muted-foreground')}>
                  {post.category}
                </span>
                <p className="mt-0.5 text-sm font-semibold text-graphite line-clamp-1">{post.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{post.excerpt}</p>
              </div>
              <span className="mt-1 shrink-0 rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-foreground transition-colors hover:bg-muted">
                {t('Czytaj', 'Читать')}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ShopPanel({ t }: { t: (a: string, b: string) => string }) {
  return (
    <div>
      <div className="pb-3 pt-3">
        <SectionLink href="/shop" label={t('Przejdź do pełnego katalogu produktów', 'Перейти в полный каталог товаров')} />
      </div>
      <ul className="divide-y divide-border">
        {SHOP_ITEMS.map((item) => (
          <li key={item.id}>
            <div className="flex items-center gap-3 py-3 px-1">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                <Image src={item.img} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-graphite line-clamp-1">{item.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{item.specs}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span className="font-heading text-sm font-bold text-graphite">{item.price}</span>
                <button className="flex items-center gap-1 rounded-md bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground transition-opacity hover:opacity-90">
                  <ShoppingCart className="h-3 w-3" />
                  {t('Do koszyka', 'В корзину')}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Main overlay component ───────────────────────────────────────────────────

export function SearchHub({ onClose }: { onClose: () => void }) {
  const { t } = useLang()
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('listings')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleTagClick = useCallback((tag: string) => {
    setQuery((prev) => (prev.trim() ? `${prev.trim()} ${tag}` : tag))
    inputRef.current?.focus()
  }, [])

  const TABS: { id: Tab; label: string; labelRu: string; icon: React.ReactNode }[] = [
    { id: 'listings', label: 'Ogłoszenia', labelRu: 'Объявления', icon: <Building2 className="h-3.5 w-3.5" /> },
    { id: 'portfolio', label: 'Wykonawcy i Portfolio', labelRu: 'Исполнители и Портфолио', icon: <Paintbrush className="h-3.5 w-3.5" /> },
    { id: 'blog', label: 'Blog', labelRu: 'Блог', icon: <BookOpen className="h-3.5 w-3.5" /> },
    { id: 'shop', label: 'Shop / Marketplace', labelRu: 'Магазин', icon: <Newspaper className="h-3.5 w-3.5" /> },
  ]

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 bg-graphite/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Panel — stop propagation so clicks inside don't close */}
      <div
        className="relative mx-auto mt-4 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-white shadow-2xl sm:mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search bar row */}
        <div className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-3">
          <Search className="h-4.5 w-4.5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              'Szukaj nieruchomości, wykonawców lub artykułów...',
              'Поиск недвижимости, исполнителей или статей...',
            )}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label={t('Zamknij', 'Закрыть')}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 overflow-x-auto border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors',
                activeTab === tab.id
                  ? 'border-brand text-brand'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.icon}
              {t(tab.label, tab.labelRu)}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} className="overflow-y-auto px-4 pb-6">
          {activeTab === 'listings' && (
            <ListingsPanel query={query} onTagClick={handleTagClick} t={t} />
          )}
          {activeTab === 'portfolio' && <PortfolioPanel t={t} />}
          {activeTab === 'blog' && <BlogPanel t={t} />}
          {activeTab === 'shop' && <ShopPanel t={t} />}
        </div>
      </div>
    </div>
  )
}
