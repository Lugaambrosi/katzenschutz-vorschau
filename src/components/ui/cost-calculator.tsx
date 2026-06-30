"use client";
import { useEffect, useRef, useState } from "react";

interface Scenario {
  name: string;
  emoji: string;
  cost: number;
  note: string;
}

interface Tarif {
  key: string;
  name: string;
  rate: number; // Erstattungssatz 0..1
  beitrag: number; // € / Monat
  highlight?: boolean;
}

// OP-Kosten = realistische Beispielwerte (Spannen aus der Praxis, Mittelwert)
const SCENARIOS: Scenario[] = [
  { name: "Verschluckter Fremdkörper", emoji: "🧶", cost: 2000, note: "Not-OP – einer der häufigsten Eingriffe bei jungen Katzen." },
  { name: "Unfall als Freigänger", emoji: "🚗", cost: 3000, note: "Auto, Sturz, Bissverletzung – bei Unfällen gilt keine Wartezeit." },
  { name: "Kreuzbandriss-OP", emoji: "🦴", cost: 1800, note: "Orthopädischer Eingriff inkl. Nachsorge und Kontrollen." },
  { name: "Chronische Niere (1 Jahr)", emoji: "💧", cost: 1500, note: "Dauerbehandlung mit Medikamenten und regelmäßigen Kontrollen." },
  { name: "Tumor-OP + Nachsorge", emoji: "🎗️", cost: 2500, note: "Operation, Gewebeuntersuchung und Nachbehandlung." },
];

// Premium Plus: 98 % sind die belegte Barmenia-Angabe.
// Basis / Komfort: Beispiel-Erstattungssätze · alle Beiträge sind Platzhalter.
const TARIFE: Tarif[] = [
  { key: "basis", name: "Basis", rate: 0.7, beitrag: 18 },
  { key: "komfort", name: "Komfort", rate: 0.85, beitrag: 28 },
  { key: "premium", name: "Premium Plus", rate: 0.98, beitrag: 42, highlight: true },
];

const euro = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

function useCountUp(target: number, duration = 650) {
  const [val, setVal] = useState(target);
  const valRef = useRef(target);
  useEffect(() => {
    const from = valRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(from + (target - from) * eased);
      valRef.current = v;
      setVal(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

export default function CostCalculator() {
  const [sIdx, setSIdx] = useState(1); // Start: Unfall
  const [tKey, setTKey] = useState("premium");

  const scenario = SCENARIOS[sIdx];
  const tarif = TARIFE.find((t) => t.key === tKey) ?? TARIFE[2];

  const erstattet = Math.round(scenario.cost * tarif.rate);
  const eigenanteil = scenario.cost - erstattet;

  const cCost = useCountUp(scenario.cost);
  const cErstattet = useCountUp(erstattet);
  const cEigen = useCountUp(eigenanteil);

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7c3aed] mb-2">Zum Mitrechnen</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e]">Was kostet der Ernstfall?</h2>
          <p className="text-[#666] mt-3">Schieb durch echte Szenarien und sieh, was du mit und ohne Versicherung zahlst.</p>
        </div>

        {/* Szenario-Regler */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden>{scenario.emoji}</span>
              <div>
                <div className="font-bold text-[#1a1a2e] leading-tight">{scenario.name}</div>
                <div className="text-sm text-[#777]">{scenario.note}</div>
              </div>
            </div>
            <div className="text-xs font-semibold text-[#999] whitespace-nowrap ml-3">
              {sIdx + 1} / {SCENARIOS.length}
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={SCENARIOS.length - 1}
            step={1}
            value={sIdx}
            onChange={(e) => setSIdx(Number(e.target.value))}
            aria-label="Szenario wählen"
            className="w-full accent-[#7c3aed] cursor-pointer h-2"
          />
          <div className="flex justify-between mt-2">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setSIdx(i)}
                aria-label={s.name}
                title={s.name}
                className={`text-lg leading-none transition-transform ${i === sIdx ? "scale-125" : "opacity-40 hover:opacity-80"}`}
              >
                {s.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Tarif-Umschalter */}
        <div className="mb-8">
          <div className="text-sm font-semibold text-[#555] mb-2">Tarif</div>
          <div className="grid grid-cols-3 gap-2 p-1 bg-[#f3f1fb] rounded-xl">
            {TARIFE.map((t) => (
              <button
                key={t.key}
                onClick={() => setTKey(t.key)}
                className={`relative py-2.5 px-2 rounded-lg text-sm font-semibold transition-all ${
                  t.key === tKey ? "bg-[#7c3aed] text-white shadow" : "text-[#555] hover:bg-white"
                }`}
              >
                {t.name}
                <span className={`block text-[11px] font-medium mt-0.5 ${t.key === tKey ? "text-white/80" : "text-[#999]"}`}>
                  {Math.round(t.rate * 100)} % Erstattung
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Ergebnis */}
        <div className="rounded-2xl border border-[#eee] shadow-sm p-6 md:p-8">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-sm font-semibold text-[#666]">Tierarztrechnung</span>
            <span className="text-2xl font-extrabold text-[#1a1a2e] tabular-nums">{euro(cCost)}</span>
          </div>

          {/* Aufschlüsselungs-Balken */}
          <div className="flex h-7 w-full overflow-hidden rounded-full bg-[#fde8e8] mb-2">
            <div
              className="flex items-center justify-end bg-[#16a34a] transition-all duration-700 ease-out"
              style={{ width: `${tarif.rate * 100}%` }}
            >
              <span className="text-[11px] font-bold text-white px-2 whitespace-nowrap">
                {Math.round(tarif.rate * 100)} %
              </span>
            </div>
          </div>
          <div className="flex justify-between text-xs font-medium text-[#888] mb-6">
            <span className="text-[#16a34a]">Barmenia erstattet</span>
            <span className="text-[#c0392b]">dein Anteil</span>
          </div>

          {/* Kontrast */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#fdeeee] p-4 text-center">
              <div className="text-xs font-semibold text-[#c0392b] mb-1">Ohne Versicherung</div>
              <div className="text-2xl md:text-3xl font-extrabold text-[#c0392b] tabular-nums">{euro(cCost)}</div>
            </div>
            <div className="rounded-xl bg-[#e9f7ee] p-4 text-center">
              <div className="text-xs font-semibold text-[#16a34a] mb-1">Mit Barmenia zahlst du nur</div>
              <div className="text-2xl md:text-3xl font-extrabold text-[#16a34a] tabular-nums">{euro(cEigen)}</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-[#555]">
            <span>
              Barmenia übernimmt <strong className="text-[#16a34a] tabular-nums">{euro(cErstattet)}</strong>
            </span>
            <span className="text-[#ccc]">·</span>
            <span>
              Beitrag <strong className="text-[#1a1a2e]">{euro(tarif.beitrag)}</strong>/Monat
            </span>
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-[#aaa] mt-4 text-center">
          Beispielrechnung. OP-Kosten sind realistische Durchschnittswerte aus der Praxis. 98 % Erstattung gilt für die
          Barmenia Premium Plus; Erstattungssätze der Tarife Basis/Komfort und alle Monatsbeiträge sind Platzhalter und
          werden durch echte Tarifwerte ersetzt.
        </p>
      </div>
    </section>
  );
}
