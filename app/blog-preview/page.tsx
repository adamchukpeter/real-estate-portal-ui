import type { Metadata } from 'next'
import Link from 'next/link'
import { ArticleCard } from '@/components/blog/article-card'
import { ArticleGrid } from '@/components/blog/article-grid'
import { ArticleGridSkeleton } from '@/components/blog/article-grid-skeleton'
import { BlogPagination } from '@/components/blog/blog-pagination'
import { BlogShell } from '@/components/blog/blog-shell'
import { EmptyState } from '@/components/blog/empty-state'
import { ErrorState } from '@/components/blog/error-state'
import { Breadcrumbs } from '@/components/breadcrumbs'
import {
  MOCK_ARTICLES,
  MOCK_LONG_CATEGORY_ARTICLE,
  MOCK_LONG_TITLE_ARTICLE,
} from '@/lib/blog/mock-data'
import { createPageHref } from '@/lib/blog/url'

export const metadata: Metadata = {
  title: 'Blog — podgląd stanów interfejsu',
  robots: { index: false, follow: false },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-10 first:border-t-0">
      <h2 className="mb-5 font-heading text-xl font-bold text-foreground">{title}</h2>
      {children}
    </section>
  )
}

export default function BlogPreviewPage() {
  const href = createPageHref('/blog-preview')

  return (
    <BlogShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-heading text-3xl font-extrabold text-foreground">Blog — podgląd stanów</h1>
        <p className="mt-2 text-muted-foreground">
          Strona pomocnicza do przeglądu komponentów. Szablony:{' '}
          <Link href="/blog" className="underline underline-offset-4">/blog</Link>,{' '}
          <Link href="/blog/kategoria/pozwolenie-na-budowe" className="underline underline-offset-4">kategoria</Link>,{' '}
          <Link href="/blog/tag/pozwolenie-na-budowe" className="underline underline-offset-4">tag</Link>.
        </p>

        <div className="mt-6">
          <Section title="Lista z wyróżnionym pierwszym artykułem">
            <ArticleGrid articles={MOCK_ARTICLES.slice(0, 4)} titleAs="h3" featuredFirst />
          </Section>

          <Section title="Skrajne przypadki kart: długi tytuł, długa kategoria, brak okładki">
            <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <li className="flex min-w-0"><ArticleCard article={MOCK_LONG_TITLE_ARTICLE} titleAs="h3" /></li>
              <li className="flex min-w-0"><ArticleCard article={MOCK_LONG_CATEGORY_ARTICLE} titleAs="h3" /></li>
            </ul>
          </Section>

          <Section title="Stan pusty">
            <EmptyState
              titleAs="h3"
              title="Brak artykułów spełniających kryteria"
              description="Zmień frazę wyszukiwania lub usuń część filtrów."
              action={{ label: 'Wyczyść filtry', href: '/blog' }}
            />
          </Section>

          <Section title="Stan błędu">
            <ErrorState retryHref="/blog-preview" />
          </Section>

          <Section title="Ładowanie">
            <ArticleGridSkeleton count={3} />
          </Section>

          <Section title="Paginacja — strona 9 z 24">
            <BlogPagination page={9} totalPages={24} hrefForPage={href} />
          </Section>
          <Section title="Paginacja — pierwsza strona z 3">
            <BlogPagination page={1} totalPages={3} hrefForPage={href} />
          </Section>

          <Section title="Ścieżka nawigacji z bardzo długim tytułem">
            <Breadcrumbs
              items={[
                { label: 'Strona główna', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: MOCK_LONG_CATEGORY_ARTICLE.category.name, href: MOCK_LONG_CATEGORY_ARTICLE.category.pathAlias },
                { label: MOCK_LONG_TITLE_ARTICLE.title },
              ]}
            />
          </Section>
        </div>
      </div>
    </BlogShell>
  )
}
