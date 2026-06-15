'use client'

import { useState } from 'react'
import { MapPin, Home, Wrench, Building2 } from 'lucide-react'

interface Marker {
  id: number
  x: number
  y: number
  type: 'property' | 'service' | 'new'
  label: string
  price?: string
}

const MARKERS: Marker[] = [
  { id: 1, x: 38, y: 32, type: 'new', label: 'Warszawa, Mokotów', price: '850 000 PLN' },
  { id: 2, x: 55, y: 48, type: 'property', label: 'Warszawa, Śródmieście', price: '1 200 000 PLN' },
  { id: 3, x: 62, y: 28, type: 'service', label: 'Elektryk — Jan K.' },
  { id: 4, x: 28, y: 58, type: 'property', label: 'Praga Południe', price: '620 000 PLN' },
  { id: 5, x: 72, y: 60, type: 'service', label: 'Ekipa budowlana' },
  { id: 6, x: 46, y: 70, type: 'new', label: 'Ursynów', price: '490 000 PLN' },
  { id: 7, x: 82, y: 42, type: 'property', label: 'Wawer', price: '720 000 PLN' },
]

const CITY_LABELS = [
  { x: 22, y: 18, name: 'Łomianki' },
  { x: 58, y: 16, name: 'Legionowo' },
  { x: 80, y: 74, name: 'Otwock' },
  { x: 15, y: 72, name: 'Grójec' },
]

export function MapPreview() {
  const [active, setActive] = useState<number | null>(null)

  const typeColor = (type: Marker['type']) => {
    if (type === 'new') return 'bg-brand text-brand-foreground'
    if (type === 'service') return 'bg-graphite text-graphite-foreground'
    return 'bg-card text-foreground border border-border'
  }

  const typeIcon = (type: Marker['type']) => {
    if (type === 'new') return <Home className="h-2.5 w-2.5" />
    if (type === 'service') return <Wrench className="h-2.5 w-2.5" />
    return <Building2 className="h-2.5 w-2.5" />
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-[#EEF2F7] shadow-lg">
      {/* Grid lines (map style) */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4DCE8" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Simulated roads */}
        <path d="M 0,50% Q 30%,40% 60%,55% T 100%,48%" fill="none" stroke="#C8D0DC" strokeWidth="4" strokeLinecap="round" />
        <path d="M 0,35% Q 40%,38% 100%,30%" fill="none" stroke="#C8D0DC" strokeWidth="3" strokeLinecap="round" />
        <path d="M 45%,0 Q 48%,40% 50%,100%" fill="none" stroke="#C8D0DC" strokeWidth="3" strokeLinecap="round" />
        <path d="M 20%,0 Q 25%,50% 22%,100%" fill="none" stroke="#C8D0DC" strokeWidth="2" strokeLinecap="round" />
        <path d="M 70%,0 Q 72%,50% 75%,100%" fill="none" stroke="#C8D0DC" strokeWidth="2" strokeLinecap="round" />

        {/* Park areas */}
        <ellipse cx="30%" cy="65%" rx="8%" ry="5%" fill="#C8DFC8" opacity="0.7" />
        <ellipse cx="68%" cy="22%" rx="6%" ry="4%" fill="#C8DFC8" opacity="0.7" />

        {/* Water */}
        <path d="M 0,80% Q 20%,78% 40%,82% T 80%,79% T 100%,82%" fill="#B8D4E8" opacity="0.6" />
      </svg>

      {/* City labels */}
      {CITY_LABELS.map((c) => (
        <span
          key={c.name}
          className="absolute text-[10px] font-medium text-muted-foreground"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          {c.name}
        </span>
      ))}

      {/* Markers */}
      {MARKERS.map((m) => (
        <button
          key={m.id}
          onClick={() => setActive(active === m.id ? null : m.id)}
          className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
          aria-label={m.label}
        >
          {/* Pulse ring for new listings */}
          {m.type === 'new' && (
            <span className="absolute inset-0 -m-2 rounded-full bg-brand/20 animate-ping" />
          )}
          <div
            className={`relative flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-transform hover:scale-110 ${typeColor(m.type)}`}
          >
            {typeIcon(m.type)}
          </div>

          {/* Tooltip */}
          {active === m.id && (
            <div className="absolute bottom-8 left-1/2 z-10 w-44 -translate-x-1/2 rounded-lg border border-border bg-card p-2.5 shadow-xl">
              <p className="text-xs font-semibold text-foreground leading-tight">{m.label}</p>
              {m.price && (
                <p className="mt-0.5 text-xs font-bold text-brand">{m.price}</p>
              )}
              <div className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${typeColor(m.type)}`}>
                {typeIcon(m.type)}
                <span>{m.type === 'new' ? 'Nowe' : m.type === 'service' ? 'Usługa' : 'Dom'}</span>
              </div>
            </div>
          )}
        </button>
      ))}

      {/* Legend */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 rounded-lg border border-border bg-card/90 p-2 text-[10px] backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-brand-foreground"><Home className="h-2 w-2" /></div>
          <span className="text-muted-foreground">Nowe ogłoszenie</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full border border-border bg-card"><Building2 className="h-2 w-2" /></div>
          <span className="text-muted-foreground">Nieruchomość</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-graphite text-graphite-foreground"><Wrench className="h-2 w-2" /></div>
          <span className="text-muted-foreground">Usługi</span>
        </div>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-2 left-3 text-[9px] text-muted-foreground/60">
        Warszawa i okolice
      </div>
    </div>
  )
}
