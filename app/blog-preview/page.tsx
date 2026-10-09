import type { Metadata } from 'next'
import Link from 'next/link'
import { ArticleCard } from '@/components/blog/article-card'
import { ArticleComments } from '@/components/blog/article-comments'
import { ArticleGrid } from '@/components/blog/article-grid'
import { ArticleGridSkeleton } from '@/components/blog/article-grid-skeleton'
import { ArticleVote } from '@/components/blog/article-vote'
import { BlogPagination } from '@/components/blog/blog-pagination'
import { BlogShell } from '@/components/blog/blog-shell'
import { CategoryNav } from '@/components/blog/category-nav'
import { EmptyState } from '@/components/blog/empty-state'
import { ErrorState } from '@/components/blog/error-state'
import { TaxonomyLinks } from '@/components/blog/taxonomy-links'
import { Breadcrumbs } from '@/components/breadcrumbs'
import {
  MOCK_ARTICLES,
  MOCK_CATEGORIES,
  MOCK_LONG_CATEGORY_ARTICLE,
  MOCK_LONG_TITLE_ARTICLE,
  MOCK_TAGS,
} from '@/lib/blog/mock-data'
import { MOCK_COMMENTS } from '@/lib/blog/mock-engagement'
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
        <h1 className="font-heading text-3xl font-bold text-foreground">Blog — podgląd stanów</h1>
        <p className="mt-2 text-muted-foreground">
          Strona pomocnicza do przeglądu komponentów. Szablony:{' '}
          <Link href="/blog" className="text-brand-strong underline underline-offset-4">/blog</Link>,{' '}
          <Link href="/blog/kategoria/prawo-i-formalnosci" className="text-brand-strong underline underline-offset-4">kategoria</Link>,{' '}
          <Link href="/blog/tag/pozwolenie-na-budowe" className="text-brand-strong underline underline-offset-4">tag</Link>.
        </p>

        <div className="mt-6">
          <Section title="Nawigacja kategorii i tagi">
            <CategoryNav categories={MOCK_CATEGORIES} activeId={MOCK_CATEGORIES[1].id} />
            <TaxonomyLinks terms={MOCK_TAGS.slice(0, 6)} label="Tagi przykładowe" className="mt-6" />
          </Section>

          <Section title="Lista artykułów">
            <ArticleGrid articles={MOCK_ARTICLES.slice(0, 6)} titleAs="h3" />
          </Section>

          <Section title="Skrajne przypadki kart: długi tytuł, długa kategoria, brak okładki">
            <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <li className="flex min-w-0"><ArticleCard article={MOCK_LONG_TITLE_ARTICLE} titleAs="h3" /></li>
              <li className="flex min-w-0"><ArticleCard article={MOCK_LONG_CATEGORY_ARTICLE} titleAs="h3" /></li>
            </ul>
          </Section>

          <Section title="Stan pusty">
            <EmptyState
              titleAs="h3"
              title="Brak artykułów w tej kategorii"
              description="Wkrótce pojawią się tu nowe poradniki."
              action={{ label: 'Wszystkie artykuły', href: '/blog' }}
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

          <Section title="Ocena: dodatnia, zerowa, ujemna, zablokowana, ładowanie">
            <div className="flex flex-wrap items-center gap-8">
              <ArticleVote initialScore={2} />
              <ArticleVote initialScore={0} />
              <ArticleVote initialScore={-3} />
              <ArticleVote initialScore={2} initialVote="up" />
              <ArticleVote initialScore={-2} initialVote="down" />
              <ArticleVote initialScore={2} disabled />
              <ArticleVote initialScore={3} initialVote="up" loading />
            </div>
          </Section>

          <Section title="Komentarze — gość">
            <ArticleComments comments={MOCK_COMMENTS} viewer="guest" className="max-w-3xl" />
          </Section>
          <Section title="Komentarze — zalogowany, wysyłanie">
            <ArticleComments comments={MOCK_COMMENTS.slice(0, 1)} viewer="authenticated" formStatus="submitting" className="max-w-3xl" />
          </Section>
          <Section title="Komentarze — błąd formularza, brak komentarzy">
            <ArticleComments comments={[]} viewer="authenticated" formStatus="error" className="max-w-3xl" />
          </Section>
          <Section title="Komentarze — ładowanie">
            <ArticleComments comments={[]} status="loading" className="max-w-3xl" />
          </Section>
          <Section title="Komentarze — błąd listy">
            <ArticleComments comments={[]} status="error" retryHref="/blog-preview" className="max-w-3xl" />
          </Section>
        </div>
      </div>
    </BlogShell>
  )
}
