/**
 * Isolated preview fixtures for voting and comments.
 * Real data comes from Drupal (`wlasnemetry_vote`, Core Comment `article_comment`).
 */

export type ArticleComment = {
  id: string
  authorName: string
  createdAt: string
  body: string
  /** Drupal threading is shallow; the UI renders a single reply level. */
  replies?: ArticleComment[]
}

export const MOCK_VOTE_SCORE = 2

export const MOCK_COMMENTS: ArticleComment[] = [
  {
    id: 'c-1',
    authorName: 'Marta Zielińska',
    createdAt: '2025-03-14T09:42:00+01:00',
    body: 'Bardzo konkretny poradnik. Przed złożeniem wniosku warto jeszcze sprawdzić aktualny miejscowy plan zagospodarowania — u nas zmienił się w zeszłym roku.',
    replies: [
      {
        id: 'c-1-1',
        authorName: 'Tomasz Nowak',
        createdAt: '2025-03-14T12:10:00+01:00',
        body: 'Potwierdzam, plan sprawdzam zawsze jako pierwszy krok. Dziękuję za uzupełnienie.',
      },
    ],
  },
  {
    id: 'c-2',
    authorName: 'Piotr Wójcik',
    createdAt: '2025-03-15T18:05:00+01:00',
    body: 'Czy ktoś ma doświadczenie z odbiorem budynku bez kierownika budowy obecnego na miejscu? Chętnie poczytam, jak to wyglądało u Was.',
  },
  {
    id: 'c-3',
    authorName: 'Anna Kaczmarek',
    createdAt: '2025-03-17T07:30:00+01:00',
    body: 'Dzięki za zestawienie kosztów. Przyda się przy rozmowie z wykonawcą.',
  },
]

export function countComments(comments: ArticleComment[]): number {
  return comments.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0)
}
