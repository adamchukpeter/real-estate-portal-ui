/**
 * MOCK DATA — design preview only.
 *
 * Everything in this file stands in for Drupal content. Replace the exported
 * `getMock*` functions with the Drupal adapter during integration; no UI
 * component imports fixtures directly.
 */

import {
  BLOG_PAGE_SIZE,
  type ArticleAuthor,
  type ArticleDetailV2,
  type ArticleMedia,
  type ArticleSummaryV2,
  type ArticleTaxonomyTerm,
  type BlogListingQuery,
  type BlogListingResult,
} from './types'

/* ─── Taxonomy ─────────────────────────────────────────────────────────────── */

const term = (kind: 'tag' | 'kategoria', slug: string, name: string): ArticleTaxonomyTerm => ({
  id: `${kind}-${slug}`,
  name,
  slug,
  pathAlias: `/blog/${kind}/${slug}`,
})

export const MOCK_CATEGORIES: ArticleTaxonomyTerm[] = [
  term('kategoria', 'budowa-domu', 'Budowa domu'),
  term('kategoria', 'prawo-i-formalnosci', 'Prawo i formalności'),
  term('kategoria', 'rynek-nieruchomosci', 'Rynek nieruchomości'),
  term('kategoria', 'wykonczenie-i-remonty', 'Wykończenie i remonty'),
  term('kategoria', 'energia-i-instalacje', 'Energia i instalacje'),
]

export const MOCK_TAGS: ArticleTaxonomyTerm[] = [
  term('tag', 'pozwolenie-na-budowe', 'Pozwolenie na budowę'),
  term('tag', 'dzialka-budowlana', 'Działka budowlana'),
  term('tag', 'kredyt-hipoteczny', 'Kredyt hipoteczny'),
  term('tag', 'remont-mieszkania', 'Remont mieszkania'),
  term('tag', 'pompa-ciepla', 'Pompa ciepła'),
  term('tag', 'fotowoltaika', 'Fotowoltaika'),
  term('tag', 'mpzp', 'MPZP'),
  term('tag', 'odbior-budynku', 'Odbiór budynku'),
  term('tag', 'koszty-budowy', 'Koszty budowy'),
  term('tag', 'wykonczenie-pod-klucz', 'Wykończenie pod klucz'),
  term(
    'tag',
    'warunki-zabudowy-dzialki-rolne-na-obrzezach-miast',
    'Warunki zabudowy i zagospodarowania terenu dla działek rolnych na obrzeżach dużych miast',
  ),
]

const cat = (slug: string) => MOCK_CATEGORIES.find((c) => c.slug === slug)!
const tags = (...slugs: string[]) => slugs.map((s) => MOCK_TAGS.find((t) => t.slug === s)!)

/* ─── Authors & media ──────────────────────────────────────────────────────── */

const AUTHORS: Record<string, ArticleAuthor> = {
  anna: { type: 'user', id: 'user-12', name: 'Anna Kowalska' },
  marek: { type: 'user', id: 'user-31', name: 'Marek Wiśniewski' },
  linia: { type: 'business', id: 'biz-204', name: 'Pracownia Architektoniczna Linia Sp. z o.o.' },
  prowykonczenia: { type: 'business', id: 'biz-87', name: 'ProWykończenia Sp. z o.o.' },
}

const cover = (file: string, alt: string): ArticleMedia => ({
  url: `/images/blog/${file}`,
  alt,
  width: 1376,
  height: 768,
})

const COVERS = {
  pozwolenie: cover(
    'blog-pozwolenie.png',
    'Biurko architekta z planami domu, kaskiem budowlanym i miarą zwijaną',
  ),
  remont: cover(
    'blog-remont.png',
    'Jasne mieszkanie w trakcie remontu z świeżo otynkowanymi ścianami i drabiną',
  ),
  dzialka: cover(
    'blog-dzialka.png',
    'Widok z góry na pustą działkę budowlaną z palikami geodezyjnymi',
  ),
  energia: cover(
    'blog-energia.png',
    'Nowoczesny dom jednorodzinny z panelami fotowoltaicznymi i pompą ciepła',
  ),
}

/* ─── Articles ─────────────────────────────────────────────────────────────── */

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString()

type Seed = {
  slug: string
  title: string
  excerpt: string
  author: ArticleAuthor
  cover: ArticleMedia | null
  category: string
  tags: string[]
  published: number
  updated?: number
}

function build(seed: Seed): ArticleSummaryV2 {
  const published = daysAgo(seed.published)
  return {
    id: `article-${seed.slug}`,
    title: seed.title,
    excerpt: seed.excerpt,
    pathAlias: `/blog/${seed.slug}`,
    author: seed.author,
    createdAt: daysAgo(seed.published + 2),
    publishedAt: published,
    updatedAt: daysAgo(seed.updated ?? seed.published),
    cover: seed.cover,
    category: cat(seed.category),
    tags: tags(...seed.tags),
    seoTitle: `${seed.title} | Blog`,
    seoDescription: seed.excerpt,
  }
}

const SEEDS: Seed[] = [
  {
    slug: 'pozwolenie-na-budowe-krok-po-kroku',
    title: 'Pozwolenie na budowę krok po kroku: dokumenty, terminy i najczęstsze błędy',
    excerpt:
      'Od wypisu z MPZP po decyzję starosty — rozpisujemy cały proces uzyskania pozwolenia na budowę domu jednorodzinnego i wskazujemy miejsca, w których inwestorzy tracą najwięcej czasu.',
    author: AUTHORS.linia,
    cover: COVERS.pozwolenie,
    category: 'prawo-i-formalnosci',
    tags: ['pozwolenie-na-budowe', 'mpzp', 'dzialka-budowlana'],
    published: 2,
    updated: 1,
  },
  {
    slug: 'jak-sprawdzic-dzialke-przed-zakupem',
    title: 'Jak sprawdzić działkę przed zakupem: 9 punktów, których nie można pominąć',
    excerpt:
      'Księga wieczysta, media, dostęp do drogi, warunki gruntowe. Lista kontrolna, która pozwoli uniknąć kosztownych niespodzianek jeszcze przed podpisaniem umowy.',
    author: AUTHORS.anna,
    cover: COVERS.dzialka,
    category: 'rynek-nieruchomosci',
    tags: ['dzialka-budowlana', 'mpzp'],
    published: 5,
  },
  {
    slug: 'pompa-ciepla-czy-gaz-w-nowym-domu',
    title: 'Pompa ciepła czy gaz w nowym domu? Porównanie kosztów na 15 lat',
    excerpt:
      'Koszt inwestycji, rachunki za ogrzewanie i dostępne dopłaty. Zestawiamy realne liczby dla domu o powierzchni 150 m² budowanego w standardzie WT 2021.',
    author: AUTHORS.marek,
    cover: COVERS.energia,
    category: 'energia-i-instalacje',
    tags: ['pompa-ciepla', 'koszty-budowy'],
    published: 9,
  },
  {
    slug: 'remont-mieszkania-w-bloku-kolejnosc-prac',
    title: 'Remont mieszkania w bloku: w jakiej kolejności wykonywać prace',
    excerpt:
      'Błędna kolejność prac to najczęstsza przyczyna poprawek i przestojów. Podpowiadamy, jak ułożyć harmonogram od instalacji po malowanie.',
    author: AUTHORS.prowykonczenia,
    cover: COVERS.remont,
    category: 'wykonczenie-i-remonty',
    tags: ['remont-mieszkania', 'wykonczenie-pod-klucz'],
    published: 12,
  },
  {
    slug: 'fotowoltaika-w-2025-czy-sie-oplaca',
    title: 'Fotowoltaika po zmianie zasad rozliczeń: czy nadal się opłaca?',
    excerpt:
      'Net-billing, magazyny energii i rosnące ceny prądu. Sprawdzamy, po jakim czasie zwraca się instalacja o mocy 6 kWp.',
    author: AUTHORS.marek,
    cover: COVERS.energia,
    category: 'energia-i-instalacje',
    tags: ['fotowoltaika', 'koszty-budowy'],
    published: 16,
  },
  {
    slug: 'kredyt-na-budowe-domu-etapy-wyplat',
    title: 'Kredyt na budowę domu: jak wyglądają transze i co sprawdza bank',
    excerpt:
      'Harmonogram wypłat, wizytacje inspektora i wymagany wkład własny. Wyjaśniamy, jak przygotować się do każdego etapu finansowania.',
    author: AUTHORS.anna,
    cover: null,
    category: 'rynek-nieruchomosci',
    tags: ['kredyt-hipoteczny', 'koszty-budowy'],
    published: 21,
  },
  {
    slug: 'odbior-techniczny-nowego-domu',
    title: 'Odbiór techniczny nowego domu: lista usterek, które warto sprawdzić',
    excerpt:
      'Wilgoć, szczelność okien, poziom posadzek i instalacje. Praktyczna checklista na dzień odbioru od wykonawcy lub dewelopera.',
    author: AUTHORS.prowykonczenia,
    cover: COVERS.remont,
    category: 'budowa-domu',
    tags: ['odbior-budynku'],
    published: 27,
  },
  {
    slug: 'warunki-zabudowy-gdy-nie-ma-mpzp',
    title:
      'Warunki zabudowy, gdy gmina nie ma planu miejscowego: kiedy decyzja WZ ma sens i ile trwa jej uzyskanie',
    excerpt:
      'Zasada dobrego sąsiedztwa, wymagania co do dostępu do drogi publicznej i ryzyko odmowy. Omawiamy pełną ścieżkę postępowania krok po kroku.',
    author: AUTHORS.linia,
    cover: null,
    category: 'prawo-i-formalnosci',
    tags: ['mpzp', 'pozwolenie-na-budowe', 'warunki-zabudowy-dzialki-rolne-na-obrzezach-miast'],
    published: 33,
  },
  {
    slug: 'ile-kosztuje-wykonczenie-pod-klucz',
    title: 'Ile kosztuje wykończenie pod klucz? Stawki za m² w największych miastach',
    excerpt:
      'Trzy standardy wykończenia i orientacyjne widełki cenowe dla Warszawy, Krakowa, Wrocławia i Gdańska, wraz z elementami, które najczęściej podnoszą budżet.',
    author: AUTHORS.prowykonczenia,
    cover: COVERS.remont,
    category: 'wykonczenie-i-remonty',
    tags: ['wykonczenie-pod-klucz', 'koszty-budowy', 'remont-mieszkania'],
    published: 41,
  },
  {
    slug: 'fundamenty-rodzaje-i-dobor-do-gruntu',
    title: 'Fundamenty: rodzaje i dobór do warunków gruntowych',
    excerpt:
      'Ławy, płyta fundamentowa czy pale? Wskazujemy, kiedy badanie geotechniczne jest konieczne i jak wpływa na budżet inwestycji.',
    author: AUTHORS.linia,
    cover: COVERS.pozwolenie,
    category: 'budowa-domu',
    tags: ['koszty-budowy', 'dzialka-budowlana'],
    published: 52,
  },
  {
    slug: 'rynek-dzialek-budowlanych-trendy',
    title: 'Rynek działek budowlanych: gdzie ceny rosną najszybciej',
    excerpt:
      'Analiza ofert z dużych aglomeracji i ich obrzeży. Pokazujemy, jak zmieniają się stawki za metr kwadratowy oraz które gminy zyskują na atrakcyjności.',
    author: AUTHORS.anna,
    cover: COVERS.dzialka,
    category: 'rynek-nieruchomosci',
    tags: ['dzialka-budowlana'],
    published: 64,
  },
  {
    slug: 'doplaty-do-pomp-ciepla-i-fotowoltaiki',
    title: 'Dopłaty do pomp ciepła i fotowoltaiki: z jakich programów skorzystasz',
    excerpt:
      'Przegląd aktualnych programów wsparcia, wymagane dokumenty i terminy składania wniosków — bez konieczności szukania informacji w kilku miejscach.',
    author: AUTHORS.marek,
    cover: COVERS.energia,
    category: 'energia-i-instalacje',
    tags: ['pompa-ciepla', 'fotowoltaika'],
    published: 90,
  },
  {
    slug: 'umowa-z-wykonawca-na-co-zwrocic-uwage',
    title: 'Umowa z wykonawcą: na co zwrócić uwagę, zanim podpiszesz',
    excerpt:
      'Zakres prac, harmonogram, kary umowne i gwarancja. Klauzule, które chronią inwestora, i zapisy, które lepiej negocjować.',
    author: AUTHORS.anna,
    cover: null,
    category: 'prawo-i-formalnosci',
    tags: ['wykonczenie-pod-klucz', 'koszty-budowy'],
    published: 140,
  },
  {
    slug: 'planowanie-budzetu-budowy-domu',
    title: 'Planowanie budżetu budowy domu: rezerwa, etapy i pułapki kosztorysu',
    excerpt:
      'Dlaczego 10% rezerwy to minimum i które pozycje kosztorysu najczęściej są niedoszacowane. Prosty model planowania wydatków w czasie.',
    author: AUTHORS.linia,
    cover: COVERS.pozwolenie,
    category: 'budowa-domu',
    tags: ['koszty-budowy', 'kredyt-hipoteczny'],
    published: 220,
  },
]

export const MOCK_ARTICLES: ArticleSummaryV2[] = SEEDS.map(build).sort(
  (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
)

/* ─── Article body (stand-in for Drupal-processed HTML) ────────────────────── */

const RICH_BODY = `
<p>Uzyskanie pozwolenia na budowę to dla wielu inwestorów pierwsze poważne zderzenie z administracją. Dobra wiadomość jest taka, że proces jest przewidywalny — o ile dobrze przygotujesz dokumenty i znasz kolejność kroków.</p>

<h2>1. Sprawdź, co wolno na Twojej działce</h2>
<p>Zanim zamówisz projekt, ustal, czy dla działki obowiązuje <a href="/blog/tag/mpzp">miejscowy plan zagospodarowania przestrzennego</a>. Jeśli tak, wypis i wyrys z planu określą m.in. maksymalną wysokość zabudowy, wskaźnik intensywności i linię zabudowy.</p>
<p>Gdy planu brak, konieczna będzie decyzja o warunkach zabudowy. Wniosek składa się w urzędzie gminy lub miasta.</p>

<h3>Dokumenty potrzebne na tym etapie</h3>
<ul>
  <li>mapa zasadnicza lub ewidencyjna w odpowiedniej skali,</li>
  <li>dokument potwierdzający prawo do dysponowania nieruchomością,</li>
  <li>wstępna koncepcja zabudowy — jeżeli ubiegasz się o warunki zabudowy.</li>
</ul>

<figure>
  <img src="/images/blog/blog-dzialka.png" alt="Pusta działka budowlana z palikami geodezyjnymi widziana z góry" width="1376" height="768" loading="lazy" />
  <figcaption>Dokładne wytyczenie granic działki przed projektem pozwala uniknąć kolizji z linią zabudowy.</figcaption>
</figure>

<h2>2. Zamów projekt budowlany</h2>
<p>Projekt zagospodarowania działki, projekt architektoniczno-budowlany i projekt techniczny przygotowuje uprawniony architekt. Zakres dokumentacji jest określony w rozporządzeniu, ale w praktyce urzędy zwracają uwagę na kilka powtarzających się elementów.</p>

<blockquote>
  <p>Najwięcej opóźnień powodują braki formalne we wniosku, a nie samo merytoryczne ocenianie projektu.</p>
</blockquote>

<h2>3. Złóż wniosek i oświadczenie o prawie do dysponowania gruntem</h2>
<p>Wniosek składasz w starostwie powiatowym lub urzędzie miasta na prawach powiatu. Dołączasz do niego cztery egzemplarze projektu oraz wymagane uzgodnienia i opinie.</p>

<h3>Orientacyjne terminy</h3>
<table>
  <thead>
    <tr><th>Etap</th><th>Typowy czas</th><th>Uwagi</th></tr>
  </thead>
  <tbody>
    <tr><td>Decyzja o warunkach zabudowy</td><td>do 2 miesięcy</td><td>Tylko gdy brak MPZP</td></tr>
    <tr><td>Przygotowanie projektu</td><td>2–4 miesiące</td><td>Zależy od złożoności bryły</td></tr>
    <tr><td>Rozpatrzenie wniosku</td><td>do 65 dni</td><td>Termin liczony od złożenia kompletnego wniosku</td></tr>
  </tbody>
</table>

<h2>Najczęstsze błędy inwestorów</h2>
<ol>
  <li>Zamawianie projektu przed sprawdzeniem zapisów planu miejscowego.</li>
  <li>Niedostateczne uzgodnienia dotyczące przyłączy mediów.</li>
  <li>Składanie wniosku bez kompletu załączników, co skutkuje wezwaniem do uzupełnień.</li>
</ol>

<h3>Co dalej po uzyskaniu decyzji?</h3>
<p>Po uprawomocnieniu się decyzji zgłaszasz rozpoczęcie robót i możesz wejść na plac budowy. Pamiętaj o dzienniku budowy oraz o kierowniku budowy z odpowiednimi uprawnieniami.</p>
`

function genericBody(excerpt: string): string {
  return `
<p>${excerpt}</p>
<h2>Najważniejsze informacje</h2>
<p>Poniższy materiał to treść demonstracyjna, służąca wyłącznie do oceny układu typograficznego szablonu. W wersji produkcyjnej zostanie zastąpiona przetworzonym kodem HTML pochodzącym z Drupala.</p>
<ul>
  <li>zakres prac i odpowiedzialność wykonawcy,</li>
  <li>harmonogram oraz kluczowe terminy,</li>
  <li>koszty i sposób rozliczenia.</li>
</ul>
<h3>Podsumowanie</h3>
<p>Dobre przygotowanie na początku inwestycji znacząco ogranicza ryzyko późniejszych kosztów i opóźnień.</p>
`
}

export function toMockDetail(summary: ArticleSummaryV2): ArticleDetailV2 {
  const { seoTitle, seoDescription, ...rest } = summary
  return {
    ...rest,
    bodyHtml: summary.id === `article-${SEEDS[0].slug}` ? RICH_BODY : genericBody(summary.excerpt),
    seo: {
      title: seoTitle,
      description: seoDescription,
      canonicalUrl: summary.pathAlias,
      robots: null,
      ogTitle: seoTitle,
      ogDescription: seoDescription,
      ogUrl: summary.pathAlias,
      ogImage: summary.cover,
    },
  }
}

/* ─── Mock "repository" ────────────────────────────────────────────────────── */

const PERIOD_DAYS = { week: 7, month: 30, year: 365 } as const

function relevanceScore(a: ArticleSummaryV2, q: string): number {
  const needle = q.toLowerCase()
  const inTitle = a.title.toLowerCase().includes(needle) ? 3 : 0
  const inExcerpt = a.excerpt.toLowerCase().includes(needle) ? 1 : 0
  return inTitle + inExcerpt
}

export function getMockListing(
  query: BlogListingQuery,
  base: ArticleSummaryV2[] = MOCK_ARTICLES,
): BlogListingResult {
  const q = query.q.trim().toLowerCase()
  const cutoff =
    query.period === 'all' ? null : Date.now() - PERIOD_DAYS[query.period] * 86_400_000

  let items = base.filter((a) => {
    if (q && !`${a.title} ${a.excerpt}`.toLowerCase().includes(q)) return false
    if (query.category && a.category.slug !== query.category) return false
    // Category AND (Tag A OR Tag B)
    if (query.tags.length > 0 && !a.tags.some((t) => query.tags.includes(t.slug))) return false
    if (cutoff !== null && +new Date(a.publishedAt) < cutoff) return false
    return true
  })

  items = [...items].sort((a, b) => {
    if (query.sort === 'relevance' && q) {
      const diff = relevanceScore(b, q) - relevanceScore(a, q)
      if (diff !== 0) return diff
    }
    const delta = +new Date(b.publishedAt) - +new Date(a.publishedAt)
    return query.sort === 'oldest' ? -delta : delta
  })

  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE))
  const start = (query.page - 1) * BLOG_PAGE_SIZE

  return {
    items: items.slice(start, start + BLOG_PAGE_SIZE),
    total,
    page: query.page,
    pageSize: BLOG_PAGE_SIZE,
    totalPages,
  }
}

export function getMockArticleByAlias(alias: string): ArticleDetailV2 | null {
  const found = MOCK_ARTICLES.find((a) => a.pathAlias === alias)
  return found ? toMockDetail(found) : null
}

export function getMockCategory(slug: string): ArticleTaxonomyTerm | null {
  return MOCK_CATEGORIES.find((c) => c.slug === slug) ?? null
}

export function getMockTag(slug: string): ArticleTaxonomyTerm | null {
  return MOCK_TAGS.find((t) => t.slug === slug) ?? null
}

/** Preview-only: the real term-level description contract is defined separately. */
const MOCK_TERM_DESCRIPTIONS: Record<string, string> = {
  'pozwolenie-na-budowe':
    'Poradniki dotyczące uzyskania pozwolenia na budowę: wymagane dokumenty, terminy rozpatrywania wniosków i najczęstsze przyczyny odmów.',
  'prawo-i-formalnosci':
    'Wszystko o formalnościach towarzyszących inwestycji budowlanej — od decyzji administracyjnych po umowy z wykonawcami.',
  'energia-i-instalacje':
    'Pompy ciepła, fotowoltaika, wentylacja i ogrzewanie. Praktyczne porównania kosztów i dostępnych programów wsparcia.',
}

export function getMockTermDescription(slug: string): string | null {
  return MOCK_TERM_DESCRIPTIONS[slug] ?? null
}

export function getMockRelated(
  article: Pick<ArticleSummaryV2, 'id' | 'category'>,
  limit = 3,
): ArticleSummaryV2[] {
  return MOCK_ARTICLES.filter((a) => a.id !== article.id)
    .sort((a, b) => {
      const sameCat = (x: ArticleSummaryV2) => (x.category.id === article.category.id ? 1 : 0)
      return sameCat(b) - sameCat(a)
    })
    .slice(0, limit)
}

/* ─── Preview-only edge cases ──────────────────────────────────────────────── */

export const MOCK_LONG_TITLE_ARTICLE: ArticleSummaryV2 = build({
  slug: 'bardzo-dlugi-tytul-artykulu-do-testow-zawijania',
  title:
    'Kompleksowy przewodnik po wszystkich formalnościach, kosztach i terminach związanych z budową domu jednorodzinnego od zakupu działki aż po odbiór końcowy i wpis do księgi wieczystej',
  excerpt:
    'Ten wpis służy wyłącznie do sprawdzenia, jak szablon radzi sobie z wyjątkowo długimi tytułami, długimi nazwami kategorii oraz długim opisem w zajawce, który powinien zostać przycięty po trzech liniach.',
  author: AUTHORS.linia,
  cover: COVERS.pozwolenie,
  category: 'prawo-i-formalnosci',
  tags: ['warunki-zabudowy-dzialki-rolne-na-obrzezach-miast', 'pozwolenie-na-budowe'],
  published: 3,
})

export const MOCK_LONG_CATEGORY_ARTICLE: ArticleSummaryV2 = {
  ...MOCK_LONG_TITLE_ARTICLE,
  id: 'article-long-category',
  title: 'Artykuł z wyjątkowo długą nazwą kategorii',
  cover: null,
  category: {
    id: 'kategoria-long',
    name: 'Prawo budowlane, administracja i formalności związane z inwestycjami na terenach wiejskich',
    slug: 'prawo-budowlane-administracja-i-formalnosci',
    pathAlias: '/blog/kategoria/prawo-budowlane-administracja-i-formalnosci',
  },
}
