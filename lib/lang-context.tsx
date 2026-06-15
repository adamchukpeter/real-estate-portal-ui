'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'pl' | 'ru'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (pl: string, ru: string) => string
}

const LangContext = createContext<LangContextValue>({
  lang: 'pl',
  setLang: () => {},
  t: (pl) => pl,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pl')
  const t = (pl: string, ru: string) => (lang === 'pl' ? pl : ru)
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
