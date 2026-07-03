"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface Props {
  action: string;
  dankeUrl: string;
  subject: string;
}

interface Option {
  value: string;
  emoji: string;
  label: string;
  sub?: string;
}

const HALTUNG: Option[] = [
  { value: "Wohnungskatze", emoji: "🏠", label: "Wohnungskatze", sub: "Lebt drinnen" },
  { value: "Freigänger", emoji: "🌳", label: "Freigänger", sub: "Ist auch draußen unterwegs" },
  { value: "Beides", emoji: "🐾", label: "Beides", sub: "Mal drinnen, mal draußen" },
];

const ALTER: Option[] = [
  { value: "Unter 1 Jahr", emoji: "🐱", label: "Unter 1 Jahr", sub: "Jetzt am günstigsten" },
  { value: "1–4 Jahre", emoji: "😺", label: "1–4 Jahre" },
  { value: "5–8 Jahre", emoji: "🐈", label: "5–8 Jahre" },
  { value: "9 Jahre oder älter", emoji: "🐈‍⬛", label: "9 Jahre oder älter" },
];

const INTERESSE: Option[] = [
  { value: "Katzenkrankenversicherung (Vollschutz)", emoji: "🛡️", label: "Rundum-Schutz", sub: "OPs, Behandlungen, Zähne & mehr" },
  { value: "Katzen-OP-Schutz", emoji: "🩺", label: "OP-Schutz", sub: "Absicherung für Operationen" },
  { value: "Unsicher – bitte beraten", emoji: "💬", label: "Weiß ich noch nicht", sub: "Luca berät mich einfach" },
];

const STEPS = ["Deine Katze", "Alter", "Dein Wunsch", "Fast geschafft"];

export default function MultiStepForm({ action, dankeUrl, subject }: Props) {
  const [step, setStep] = useState(0);
  const [haltung, setHaltung] = useState("");
  const [alter, setAlter] = useState("");
  const [interesse, setInteresse] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const pick = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setStep((s) => s + 1);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const data = new FormData(e.currentTarget);
      data.set("Haltung", haltung);
      data.set("Alter", alter);
      data.set("Interesse", interesse);
      // Leere Felder nicht mitsenden
      const empty: string[] = [];
      data.forEach((v, k) => {
        if (typeof v === "string" && v.trim() === "") empty.push(k);
      });
      empty.forEach((k) => data.delete(k));
      const res = await fetch(action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("bad status");
      window.location.href = dankeUrl;
    } catch {
      setError(true);
      setSending(false);
    }
  }

  const OptionGrid = ({ options, onPick }: { options: Option[]; onPick: (v: string) => void }) => (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onPick(o.value)}
          className="group flex flex-col items-center gap-1.5 rounded-2xl border-2 border-[#e3ebf2] bg-white px-4 py-6 text-center transition-all hover:-translate-y-0.5 hover:border-[#0071b2] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071b2]"
        >
          <span className="text-4xl" aria-hidden>
            {o.emoji}
          </span>
          <span className="font-extrabold text-[#002641]">{o.label}</span>
          {o.sub && <span className="text-xs text-[#888] leading-snug">{o.sub}</span>}
        </button>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 sm:p-9 shadow-xl">
      {/* Fortschritt */}
      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#888]">
          <span className="text-[#0071b2]">{STEPS[step]}</span>
          <span>
            Schritt {step + 1} von {STEPS.length}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#eef4fa]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0071b2] to-[#0caaff] transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <div>
          <h3 className="mb-1 text-center text-xl font-extrabold text-[#002641]">
            Ist deine Katze drinnen oder draußen unterwegs?
          </h3>
          <p className="mb-6 text-center text-sm text-[#777]">Ein Klick genügt – dauert keine Minute.</p>
          <OptionGrid options={HALTUNG} onPick={pick(setHaltung)} />
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="mb-1 text-center text-xl font-extrabold text-[#002641]">Wie alt ist deine Katze?</h3>
          <p className="mb-6 text-center text-sm text-[#777]">Grobe Angabe reicht völlig.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {ALTER.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => pick(setAlter)(o.value)}
                className="group flex items-center gap-3 rounded-2xl border-2 border-[#e3ebf2] bg-white px-5 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#0071b2] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071b2]"
              >
                <span className="text-3xl" aria-hidden>
                  {o.emoji}
                </span>
                <span>
                  <span className="block font-extrabold text-[#002641]">{o.label}</span>
                  {o.sub && <span className="block text-xs font-semibold text-[#16a34a]">{o.sub}</span>}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="mb-1 text-center text-xl font-extrabold text-[#002641]">Was interessiert dich?</h3>
          <p className="mb-6 text-center text-sm text-[#777]">Keine Sorge – festlegen musst du dich noch nicht.</p>
          <OptionGrid options={INTERESSE} onPick={pick(setInteresse)} />
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <h3 className="mb-1 text-center text-xl font-extrabold text-[#002641]">
            Super – wohin darf ich mich melden?
          </h3>
          <p className="mb-6 text-center text-sm text-[#777]">
            Deine Auswahl: {haltung} · {alter} · {interesse.startsWith("Unsicher") ? "Beratung" : interesse.includes("OP") ? "OP-Schutz" : "Vollschutz"}
          </p>

          <input type="hidden" name="_subject" value={subject} />
          {/* Honeypot gegen Spam-Bots */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="msf-vorname" className="mb-1 block text-sm font-bold text-[#333]">
                Dein Vorname *
              </label>
              <input
                id="msf-vorname"
                name="Vorname"
                type="text"
                required
                autoComplete="given-name"
                className="w-full rounded-xl border border-[#ddd] bg-white px-4 py-3 text-[#002641] focus:outline-none focus:ring-2 focus:ring-[#0071b2]"
              />
            </div>
            <div>
              <label htmlFor="msf-telefon" className="mb-1 block text-sm font-bold text-[#333]">
                Telefon / WhatsApp *
              </label>
              <input
                id="msf-telefon"
                name="Telefon"
                type="tel"
                required
                autoComplete="tel"
                className="w-full rounded-xl border border-[#ddd] bg-white px-4 py-3 text-[#002641] focus:outline-none focus:ring-2 focus:ring-[#0071b2]"
              />
            </div>
            <div>
              <label htmlFor="msf-email" className="mb-1 block text-sm font-bold text-[#333]">
                E-Mail <span className="font-normal text-[#999]">(optional)</span>
              </label>
              <input
                id="msf-email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-xl border border-[#ddd] bg-white px-4 py-3 text-[#002641] focus:outline-none focus:ring-2 focus:ring-[#0071b2]"
              />
            </div>
            <div>
              <label htmlFor="msf-katze" className="mb-1 block text-sm font-bold text-[#333]">
                Name deiner Katze <span className="font-normal text-[#999]">(optional)</span>
              </label>
              <input
                id="msf-katze"
                name="Katze"
                type="text"
                className="w-full rounded-xl border border-[#ddd] bg-white px-4 py-3 text-[#002641] focus:outline-none focus:ring-2 focus:ring-[#0071b2]"
              />
            </div>
          </div>

          {/* Vertrauens-Block */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f2f7fb] p-4">
            <img
              src="https://katzenschutz-miez.de/katz_luca.jpg"
              alt="Luca Ambos"
              loading="lazy"
              className="h-12 w-12 rounded-full object-cover"
            />
            <p className="text-sm leading-snug text-[#555]">
              <strong className="text-[#002641]">Du sprichst direkt mit mir.</strong> Ich melde mich innerhalb von
              24 Stunden persönlich – kostenlos &amp; unverbindlich.
            </p>
          </div>

          {error && (
            <p className="mt-4 rounded-xl bg-[#fdeeee] p-3 text-center text-sm font-semibold text-[#c0392b]">
              Das Senden hat nicht geklappt. Versuch es bitte noch einmal – oder schreib mir direkt per{" "}
              <a href="https://wa.me/4917679552698" target="_blank" rel="noopener" className="underline">
                WhatsApp
              </a>
              .
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#0071b2] py-4 text-base font-extrabold text-white transition-colors hover:bg-[#005a8f] disabled:opacity-60"
          >
            {sending ? "Wird gesendet …" : "Beratung starten – kostenlos & unverbindlich"}
            {!sending && <Check className="h-5 w-5" />}
          </button>
          <p className="mt-3 text-center text-xs text-[#888]">
            Deine Daten werden ausschließlich zur Bearbeitung deiner Anfrage verwendet.
          </p>
        </form>
      )}

      {/* Zurück */}
      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#888] transition-colors hover:text-[#0071b2]"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück
        </button>
      )}
      {step === 0 && (
        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-[#999]">
          <ArrowRight className="h-3.5 w-3.5" /> 3 Klicks, dann nur noch Name &amp; Nummer
        </p>
      )}
    </div>
  );
}
