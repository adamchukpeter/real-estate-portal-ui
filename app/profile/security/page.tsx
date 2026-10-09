'use client'

import { useState } from 'react'
import { Eye, EyeOff, Shield, Check } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

type FieldKey = 'current' | 'next' | 'confirm'

export default function SecurityPage() {
  const { t } = useLang()

  const [values, setValues] = useState<Record<FieldKey, string>>({
    current: '', next: '', confirm: '',
  })
  const [show, setShow] = useState<Record<FieldKey, boolean>>({
    current: false, next: false, confirm: false,
  })
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function toggleShow(field: FieldKey) {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  function validate(): boolean {
    const errs: Partial<Record<FieldKey, string>> = {}
    if (!values.current)
      errs.current = t('Pole wymagane', 'Обязательное поле')
    if (values.next.length < 8)
      errs.next = t('Minimum 8 znaków', 'Минимум 8 символов')
    if (values.confirm !== values.next)
      errs.confirm = t('Hasła nie są identyczne', 'Пароли не совпадают')
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSuccess(false)
    if (!validate()) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsLoading(false)
    setSuccess(true)
    setValues({ current: '', next: '', confirm: '' })
  }

  const inputCls = (field: FieldKey) =>
    cn(
      'h-10 w-full rounded-lg border bg-background px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors',
      errors[field]
        ? 'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-400/20'
        : 'border-border focus:border-brand focus:ring-brand/20',
    )

  const fields: { key: FieldKey; label: string }[] = [
    { key: 'current', label: t('Aktualne hasło',        'Текущий пароль')         },
    { key: 'next',    label: t('Nowe hasło',             'Новый пароль')            },
    { key: 'confirm', label: t('Powtórz nowe hasło',     'Повторите новый пароль') },
  ]

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {t('Bezpieczeństwo', 'Безопасность')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('Zarządzaj swoim hasłem i dostępem do konta.', 'Управляйте паролем и доступом к аккаунту.')}
        </p>
      </div>

      <div className="max-w-md rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-3 border-b border-border px-6 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10">
            <Shield className="h-4.5 w-4.5 text-brand" />
          </span>
          <h2 className="font-heading text-base font-semibold text-foreground">
            {t('Zmień hasło', 'Изменить пароль')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">

          {/* Success banner */}
          {success && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-700">
              <Check className="h-4 w-4 shrink-0" />
              {t('Hasło zostało zmienione pomyślnie.', 'Пароль успешно изменён.')}
            </div>
          )}

          {fields.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label htmlFor={key} className="text-sm font-medium text-foreground">
                {label}
              </label>
              <div className="relative">
                <input
                  id={key}
                  type={show[key] ? 'text' : 'password'}
                  autoComplete={key === 'current' ? 'current-password' : 'new-password'}
                  value={values[key]}
                  placeholder="••••••••"
                  disabled={isLoading}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, [key]: e.target.value }))
                    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n })
                    setSuccess(false)
                  }}
                  className={inputCls(key)}
                />
                <button
                  type="button"
                  onClick={() => toggleShow(key)}
                  aria-label={show[key] ? t('Ukryj', 'Скрыть') : t('Pokaż', 'Показать')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show[key]
                    ? <EyeOff className="h-4 w-4" />
                    : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors[key] && (
                <p className="text-xs text-red-500">{errors[key]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-graphite text-sm font-semibold text-graphite-foreground transition-colors hover:bg-graphite/80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : null}
            {t('Zmień hasło', 'Изменить пароль')}
          </button>

        </form>
      </div>

    </div>
  )
}
