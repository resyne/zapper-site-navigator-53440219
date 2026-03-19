import { Coffee } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";
import heroImage from "@/assets/applicazione-torrefazioni.jpg";

const data: ApplicazioneData = {
  id: "torrefazioni",
  title: "Torrefazioni Caffè",
  icon: Coffee,
  heroColor: "bg-gradient-to-br from-accent via-accent/95 to-accent/90",
  heroImage,
  subtitle: "Gestione fumi e odori intensi generati dal processo di tostatura del caffè in impianti artigianali e industriali.",
  problemiTipici: [
    "Odori intensi di caffè tostato percepibili nel vicinato",
    "Fumi visibili durante le fasi di tostatura",
    "Lamentele da residenti e attività limitrofe",
    "Depositi oleosi sulle superfici esterne",
    "Difficoltà nel rispettare i limiti olfattometrici regionali"
  ],
  ambitiCoinvolti: [
    { name: "Torrefazioni", href: "/industriale/torrefazioni" },
    { name: "Caffetterie artigianali", href: "/industriale/torrefazioni" }
  ],
  modelliCompatibili: [
    { name: "ZTRF", descrizione: "Per torrefazioni artigianali (Ø 200–250 mm)", href: "/modelli/ztrf" },
    { name: "ZTRF MAX", descrizione: "Per torrefazioni industriali (Ø 300–350 mm)", href: "/modelli/ztrf-max" },
    { name: "ZTRF MAX DESK", descrizione: "Versione compatta per micro-torrefazioni (Ø 150–200 mm)", href: "/modelli/ztrf-max-desk" }
  ],
  miniInterventi: [
    {
      titolo: "Torrefazione artigianale",
      citta: "Trieste",
      problema: "Odori intensi di tostatura con lamentele dal condominio adiacente",
      risultato: "Odori abbattuti del 95%, nessuna segnalazione",
      modello: "ZTRF"
    },
    {
      titolo: "Torrefazione industriale",
      citta: "Napoli",
      problema: "Fumi visibili e depositi oleosi su edifici vicini",
      risultato: "Emissioni pulite, conformità normativa garantita",
      modello: "ZTRF MAX"
    }
  ]
};

export default function TorrefazioniApp() {
  return <ApplicazioneTemplate data={data} />;
}
