# Katzenschutz Astro — Fundament für den Neuaufbau

Astro + React + Tailwind CSS + TypeScript, mit shadcn/ui-Struktur. Enthält die
integrierte `animated-hero`-Komponente als lauffähige Demo. Lokal getestet:
`npm run build` läuft fehlerfrei durch.

## Schnellstart

```bash
npm install
npm run dev      # Dev-Server, Standard http://localhost:4321
npm run build    # Statischen Build erzeugen (Ordner dist/)
npm run preview  # Build lokal ansehen
```

## Struktur (shadcn-Konvention)

- `src/components/ui/` — UI-Komponenten (shadcn-Standardpfad)
  - `button.tsx` — shadcn Button (Abhängigkeit der Hero-Komponente)
  - `animated-hero.tsx` — die integrierte Hero-Komponente
  - `demo.tsx` — Demo-Wrapper
- `src/lib/utils.ts` — `cn()`-Helper (clsx + tailwind-merge)
- `src/styles/globals.css` — Tailwind + shadcn-Theme-Variablen (Light/Dark)
- `src/pages/index.astro` — Beispielseite, bindet den Hero als React-Insel ein
- `tailwind.config.mjs`, `components.json`, `tsconfig.json` — Konfiguration
- Alias `@/*` zeigt auf `src/*`

## Warum /components/ui wichtig ist

shadcn/ui erwartet seine Komponenten unter `@/components/ui`. Der `cn()`-Helper
liegt unter `@/lib/utils`. Hält man sich an diese Pfade, lassen sich weitere
shadcn-Komponenten später per CLI (`npx shadcn@latest add ...`) dazuholen, ohne
Importe von Hand zu reparieren.

## Wichtige Hinweise

- Der Hero ist interaktiv (useState/useEffect/framer-motion) und wird in Astro
  als Insel mit `client:load` eingebunden — siehe `src/pages/index.astro`.
- Die Komponente ist der GENERISCHE Demo-Hero (englische Texte "amazing/new...",
  SMB-Trade-Absatz). Für die Katzen-Seite müssen Texte, Buttons und Farben noch
  angepasst werden.
- Die Klasse `text-spektr-cyan-50` aus der Vorlage ist keine Standard-Tailwind-
  Klasse und bleibt wirkungslos, bis sie definiert wird (oder entfernt wird).

## Nächste sinnvolle Schritte (Vorschlag)

1. Texte/Buttons des Heros auf Katzenschutz-Miez umschreiben.
2. Theme-Farben in `globals.css` an dein Lila (#7c3aed) anpassen.
3. Inhalte der Live-Seite (Tarife, FAQ, Über mich) als Astro-Sektionen übernehmen
   und Tracking (consent.js) + Formular (AJAX -> danke.html) mitnehmen.
