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
  beitrag: number; // Einstiegsbeitrag junge Katze, € / Monat
  highlight?: boolean;
}

// Reine OP-/Ernstfall-Szenarien. OP-Kosten = realistische Beispielwerte aus der Praxis.
// Operationen sind in allen Barmenia-Tarifen ohne Jahreshöchstgrenze zu 100 % mitversichert.
const SCENARIOS: Scenario[] = [
  { name: "Verschluckter Fremdkörper", emoji: "🧶", cost: 2000, note: "Not-OP – bei Unfällen wie Verschlucken gilt keine Wartezeit." },
  { name: "Unfall als Freigänger", emoji: "🚗", cost: 3000, note: "Auto, Sturz, Bissverletzung – Unfall-OP ohne Wartezeit." },
  { name: "Kreuzband- / Patella-OP", emoji: "🦴", cost: 1800, note: "Orthopädischer Eingriff inkl. Untersuchung und Nachsorge." },
  { name: "Harnstein- / Blasen-OP", emoji: "🐾", cost: 1500, note: "Harnröhrenverschluss beim Kater – akuter Notfall, OP nötig." },
  { name: "Tumor-OP + Nachsorge", emoji: "🎗️", cost: 2500, note: "Operation, Gewebeuntersuchung und Nachbehandlung." },
];

// Echte Einstiegsbeiträge (junge Katze, 2–11 Monate), Stand 01/2026.
const TARIFE: Tarif[] = [
  { key: "basis", name: "Basis", beitrag: 22.74 },
  { key: "top", name: "Top", beitrag: 40.54 },
  { key: "premium", name: "Premium", beitrag: 61.42 },
  { key: "premiumplus", name: "Premium Plus", beitrag: 71.91, highlight: true },
];

const euro0 = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(n));
const euro2 = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format(n);

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

const SB_RATE = 0.2;
const SB_MAX = 250;

export default function CostCalculator() {
  const [sIdx, setSIdx] = useState(1); // Start: Unfall
  const [tKey, setTKey] = useState("premiumplus");
  const [sb, setSb] = useState(false);

  const scenario = SCENARIOS[sIdx];
  const tarif = TARIFE.find((t) => t.key === tKey) ?? TARIFE[3];

  const eigenanteil = sb ? Math.min(Math.round(scenario.cost * SB_RATE), SB_MAX) : 0;
  const erstattet = scenario.cost - eigenanteil;
  const erstattetPct = Math.round((erstattet / scenario.cost) * 100);

  const cCost = useCountUp(scenario.cost);
  const cEigen = useCountUp(eigenanteil);

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7c3aed] mb-2">Zum Mitrechnen</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e]">Was kostet der Ernstfall?</h2>
          <p className="text-[#666] mt-3">Schieb durch echte OP-Fälle und sieh, was du mit und ohne Versicherung zahlst.</p>
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

        {/* Tarif-Umschalter (zeigt den Monatsbeitrag) */}
        <div className="mb-8">
          <div className="text-sm font-semibold text-[#555] mb-2">Tarif</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1 bg-[#f3f1fb] rounded-xl">
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
                  ab {euro2(t.beitrag)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selbstbeteiligung */}
        <div className="mb-8">
          <div className="text-sm font-semibold text-[#555] mb-2">Selbstbeteiligung</div>
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#f3f1fb] rounded-xl">
            <button
              onClick={() => setSb(false)}
              className={`py-2.5 px-2 rounded-lg text-sm font-semibold transition-all ${
                !sb ? "bg-[#7c3aed] text-white shadow" : "text-[#555] hover:bg-white"
              }`}
            >
              Ohne
              <span className={`block text-[11px] font-medium mt-0.5 ${!sb ? "text-white/80" : "text-[#999]"}`}>
                0 € Eigenanteil
              </span>
            </button>
            <button
              onClick={() => setSb(true)}
              className={`py-2.5 px-2 rounded-lg text-sm font-semibold transition-all ${
                sb ? "bg-[#7c3aed] text-white shadow" : "text-[#555] hover:bg-white"
              }`}
            >
              Mit 20 %
              <span className={`block text-[11px] font-medium mt-0.5 ${sb ? "text-white/80" : "text-[#999]"}`}>
                max. 250 € · spart Beitrag
              </span>
            </button>
          </div>
        </div>

        {/* Ergebnis */}
        <div className="rounded-2xl border border-[#eee] shadow-sm p-6 md:p-8">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-sm font-semibold text-[#666]">Tierarztrechnung</span>
            <span className="text-2xl font-extrabold text-[#1a1a2e] tabular-nums">{euro0(cCost)}</span>
          </div>

          {/* Aufschlüsselungs-Balken */}
          <div className="flex h-7 w-full overflow-hidden rounded-full bg-[#fadbd8] mb-2">
            <div
              className="flex items-center justify-center bg-[#16a34a] transition-all duration-700 ease-out"
              style={{ width: `${erstattetPct}%` }}
            >
              <span className="text-[11px] font-bold text-white px-2 whitespace-nowrap">
                {erstattetPct} % erstattet
              </span>
            </div>
          </div>
          {sb ? (
            <div className="flex justify-between text-xs font-medium mb-6">
              <span className="text-[#16a34a]">Barmenia erstattet</span>
              <span className="text-[#c0392b]">deine Selbstbeteiligung</span>
            </div>
          ) : (
            <div className="text-center text-xs font-medium text-[#888] mb-6">
              OP-Kosten ohne Jahreshöchstgrenze – in jedem Tarif
            </div>
          )}

          {/* Kontrast */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#fdeeee] p-4 text-center">
              <div className="text-xs font-semibold text-[#c0392b] mb-1">Ohne Versicherung</div>
              <div className="text-2xl md:text-3xl font-extrabold text-[#c0392b] tabular-nums">{euro0(cCost)}</div>
            </div>
            <div className="rounded-xl bg-[#e9f7ee] p-4 text-center">
              <div className="text-xs font-semibold text-[#16a34a] mb-1">Mit Barmenia zahlst du</div>
              <div className="text-2xl md:text-3xl font-extrabold text-[#16a34a] tabular-nums">{euro0(cEigen)}</div>
            </div>
          </div>

          <div className="mt-5 text-center text-sm text-[#555]">
            Voller Schutz schon ab <strong className="text-[#1a1a2e]">{euro2(tarif.beitrag)}</strong>/Monat
            <span className="text-[#999]"> ({tarif.name})</span>
            {sb && <span className="block text-xs text-[#999] mt-1">Mit Selbstbeteiligung sinkt der Beitrag.</span>}
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-[#aaa] mt-4 text-center">
          Beispielrechnung. OP-Kosten sind realistische Durchschnittswerte aus der Praxis. Barmenia erstattet 100 % der
          erstattungsfähigen Kosten bis zum 3-fachen GOT-Satz (4-fach im tierärztlichen Notdienst); Operationen ohne
          Jahreshöchstgrenze. Beiträge = Einstiegsbeitrag für junge Katzen (2–11 Monate), altersabhängig, Stand 01/2026.
          Optional ist eine Selbstbeteiligung von 20 % (max. 250 € je Einreichung) gegen geringeren Beitrag wählbar.
        </p>
      </div>
    </section>
  );
}
