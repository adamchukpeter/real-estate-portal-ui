const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Warsaw',
})

const dateTimeFormatter = new Intl.DateTimeFormat('pl-PL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Warsaw',
})

export function formatPolishDate(iso: string): string {
  return dateFormatter.format(new Date(iso))
}

export function formatPolishDateTime(iso: string): string {
  return dateTimeFormatter.format(new Date(iso))
}

/** True when the article was meaningfully edited after publication (more than a day later). */
export function wasUpdatedAfterPublication(publishedAt: string, updatedAt: string): boolean {
  return +new Date(updatedAt) - +new Date(publishedAt) > 86_400_000
}

export function pluralizeArticles(count: number): string {
  if (count === 1) return '1 artykuł'
  const lastTwo = count % 100
  const last = count % 10
  if (last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) return `${count} artykuły`
  return `${count} artykułów`
}
