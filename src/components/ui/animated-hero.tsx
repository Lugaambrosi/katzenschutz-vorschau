import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="relative w-full min-h-[92vh] flex items-center overflow-hidden">
      {/* Hintergrund-Header */}
      <img
        src={`${import.meta.env.BASE_URL}header.jpg`}
        alt="Weiße Katze auf dem Sofa"
        className="hero-ken-burns absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />

      <div className="container mx-auto relative z-10 px-4">
        <div className="flex gap-8 py-20 items-center justify-center flex-col">
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
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl max-w-3xl tracking-tighter text-center font-regular text-white">
              <span>Endlich Katzenschutz, der</span>
              <span className="relative flex w-full items-center justify-center overflow-hidden text-center leading-tight min-h-[2.2em] md:min-h-[1.3em] md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute inset-0 flex items-center justify-center px-2 font-semibold text-[#babaff]"
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

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-white/80 max-w-2xl text-center">
              Tierarztkosten steigen, und eine Operation geht schnell ins Geld.
              Ich helfe dir, deine Katze richtig abzusichern – persönlich und
              verständlich, von jemandem, der mit Katzen großgeworden ist.
            </p>
          </div>
          <div className="flex flex-row gap-3 flex-wrap justify-center">
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
        </div>
      </div>
    </div>
  );
}

export { Hero };
