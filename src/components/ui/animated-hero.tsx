import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sparkle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0Z" />
  </svg>
);

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["hält, was er verspricht", "bezahlbar bleibt", "persönlich ist", "fair ist"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber(titleNumber === titles.length - 1 ? 0 : titleNumber + 1);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-[#001623]">
      {/* Dunkler Marken-Hintergrund mit sanften Lichtakzenten */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_78%_18%,rgba(0,113,178,0.30),transparent_62%),radial-gradient(45%_60%_at_12%_88%,rgba(12,170,255,0.14),transparent_60%)]" />

      <div className="container mx-auto relative z-10 px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Links: Text + CTAs */}
          <div className="flex flex-col gap-7 items-center md:items-start text-center md:text-left">
            <div>
              <Button asChild variant="secondary" size="sm" className="gap-4">
                <a
                  href="https://www.eisbaumtabelle.de/katze"
                  target="_blank"
                  rel="noopener"
                >
                  EisbaumTabelle Testsieger 2026 <MoveRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
            <div className="flex gap-4 flex-col items-center md:items-start">
              <h1 className="text-4xl md:text-6xl max-w-3xl tracking-tighter font-regular text-white">
                <span>Endlich Katzenschutz, der</span>
                <span className="relative flex w-full items-center justify-center md:justify-start overflow-hidden leading-tight min-h-[2.2em] md:min-h-[1.3em] md:pb-4 md:pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute inset-0 flex items-center justify-center md:justify-start px-2 md:px-0 font-semibold text-[#babaff]"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1 }
                          : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-white/80 max-w-2xl">
                Tierarztkosten steigen, und eine Operation geht schnell ins Geld.
                Ich helfe dir, deine Katze richtig abzusichern – persönlich und
                verständlich, von jemandem, der mit Katzen großgeworden ist.
              </p>
            </div>
            <div className="flex flex-row gap-3 flex-wrap justify-center md:justify-start">
              <Button asChild size="lg" className="gap-4" variant="outline">
                <a href="#kontakt">
                  Lieber erst beraten lassen <PhoneCall className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild size="lg" className="gap-4">
                <a
                  href="https://ssl.barmenia.de/online-versichern/#/tierversicherung/Beitrag?tierart=Katze&versicherung=kv&adm=00011802"
                  target="_blank"
                  rel="noopener"
                >
                  Jetzt Tarif berechnen <MoveRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
            <p className="text-sm md:text-base text-white/70 -mt-3">
              OP-Schutz ab <strong className="text-white">14,84 €</strong> · Krankenversicherung ab{" "}
              <strong className="text-white">22,74 €</strong>/Monat
            </p>
          </div>

          {/* Rechts: Foto im Blob mit schwebenden Badges */}
          <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] md:max-w-[470px]">
            {/* Deko: Funkeln + versetzte Kontur */}
            <Sparkle className="absolute -top-6 left-6 w-6 h-6 text-[#fbbc04] hero-float-slow" />
            <Sparkle className="absolute top-10 -right-2 w-4 h-4 text-[#fbbc04]/80 hero-float" />
            <Sparkle className="absolute bottom-16 -left-5 w-5 h-5 text-[#0caaff]/70 hero-float-slow" />
            <div
              className="absolute inset-0 translate-x-3 translate-y-4 rounded-[46%_54%_58%_42%/52%_44%_56%_48%] border border-white/20"
              aria-hidden
            />

            {/* Blob mit Foto (Ken-Burns-Zoom bleibt, jetzt im Blob) */}
            <div className="relative overflow-hidden rounded-[46%_54%_58%_42%/52%_44%_56%_48%] aspect-[10/11] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <img
                src={`${import.meta.env.BASE_URL}header.jpg`}
                alt="Weiße Katze auf dem Sofa"
                className="hero-ken-burns absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Badge: BarmeniaGothaer-Kreis (oben links) */}
            <div className="absolute -top-4 -left-6 sm:-left-10 hero-float-slow">
              <div className="flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0071b2] text-white text-center shadow-xl -rotate-6 border-2 border-white/20">
                <span className="text-lg sm:text-xl font-extrabold leading-none">8 Mio.+</span>
                <span className="text-[10px] sm:text-[11px] font-semibold leading-tight mt-1 px-2">
                  Kund:innen der BarmeniaGothaer
                </span>
              </div>
            </div>

            {/* Badge: Google 5,0 (unten, überlappt den Blob) */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 hero-float">
              <div className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-xl whitespace-nowrap">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
                  <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                  <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C36.9 40.4 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
                </svg>
                <div className="leading-tight text-left">
                  <div className="text-sm font-bold text-[#1a1a2e]">Google Bewertung</div>
                  <div className="text-sm font-extrabold text-[#1a1a2e]">
                    5,0 <span className="text-amber-400 tracking-tight">★★★★★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge: EisbaumTabelle (rechts) */}
            <div className="absolute top-1/2 -right-3 sm:-right-8 hero-float-slow">
              <div className="flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2 shadow-xl whitespace-nowrap">
                <svg className="w-5 h-5 shrink-0 text-[#fbbc04]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
                <div className="leading-tight text-left">
                  <div className="text-xs font-bold text-[#1a1a2e]">Platz 1 · 2026</div>
                  <div className="text-[10px] font-semibold text-[#888]">EisbaumTabelle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
