import { Header } from '@/components/header'

/**
 * Public page frame: existing Header, <main>, and the same footer used on the homepage.
 * The project has no shared public layout yet, so each public page composes this frame.
 */
export function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <footer className="border-t border-border bg-graphite py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-heading text-base font-bold text-graphite-foreground">
              Buduj<span className="text-brand">PL</span>
            </p>
            <p className="text-xs text-graphite-foreground/60">
              © 2025 BudujPL. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
