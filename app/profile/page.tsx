'use client'

import { useState } from 'react'
import { Bookmark, Star, Inbox, Pencil, Check, X } from 'lucide-react'
import { useLang } from '@/lib/lang-context'

const STATS = [
  { icon: Bookmark, valueKey: 'saved',    value: 12 },
  { icon: Star,     valueKey: 'reviews',  value: 7  },
  { icon: Inbox,    valueKey: 'messages', value: 4  },
]

export default function ProfilePage() {
  const { t } = useLang()
  const [editing, setEditing] = useState(false)

  const [fields, setFields] = useState({
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@example.com',
    phone: '',
  })
  const [draft, setDraft] = useState(fields)

  function handleSave() {
    setFields(draft)
    setEditing(false)
  }

  function handleCancel() {
    setDraft(fields)
    setEditing(false)
  }

  const statLabels: Record<string, string> = {
    saved:    t('Zapisane firmy', 'Сохранённые компании'),
    reviews:  t('Wystawione opinie', 'Написанные отзывы'),
    messages: t('Wiadomości', 'Сообщения'),
  }

  const fieldDefs = [
    { key: 'firstName', label: t('Imię', 'Имя'),           type: 'text',  autoComplete: 'given-name'   },
    { key: 'lastName',  label: t('Nazwisko', 'Фамилия'),    type: 'text',  autoComplete: 'family-name'  },
    { key: 'email',     label: t('E-mail', 'E-mail'),        type: 'email', autoComplete: 'email'        },
    { key: 'phone',     label: t('Telefon', 'Телефон'),      type: 'tel',   autoComplete: 'tel'          },
  ] as const

  const inputCls =
    'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors'

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {t('Mój profil', 'Мой профиль')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('Zarządzaj swoimi danymi osobowymi.', 'Управляйте своими личными данными.')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {STATS.map(({ icon: Icon, valueKey, value }) => (
          <div
            key={valueKey}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
              <Icon className="h-5 w-5 text-brand" />
            </span>
            <span className="font-heading text-2xl font-extrabold text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground">{statLabels[valueKey]}</span>
          </div>
        ))}
      </div>

      {/* Profile fields card */}
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        {/* Card header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-heading text-base font-semibold text-foreground">
            {t('Dane osobowe', 'Личные данные')}
          </h2>
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Pencil className="h-3.5 w-3.5" />
              {t('Edytuj profil', 'Редактировать профиль')}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                <X className="h-3.5 w-3.5" />
                {t('Anuluj', 'Отмена')}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1.5 rounded-lg bg-graphite px-3 py-1.5 text-sm font-semibold text-graphite-foreground transition-colors hover:bg-graphite/80"
              >
                <Check className="h-3.5 w-3.5" />
                {t('Zapisz', 'Сохранить')}
              </button>
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
          {fieldDefs.map(({ key, label, type, autoComplete }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {label}
              </label>
              {editing ? (
                <input
                  type={type}
                  autoComplete={autoComplete}
                  value={draft[key]}
                  placeholder={key === 'phone' ? '+48 123 456 789' : undefined}
                  onChange={(e) => setDraft((prev) => ({ ...prev, [key]: e.target.value }))}
                  className={inputCls}
                />
              ) : (
                <p className="min-h-[2.25rem] content-center text-sm text-foreground">
                  {fields[key] || (
                    <span className="text-muted-foreground">
                      {t('Nie podano', 'Не указано')}
                    </span>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
