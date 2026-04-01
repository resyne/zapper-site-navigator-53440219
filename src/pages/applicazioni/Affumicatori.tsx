import { Beef } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";
import heroImage from "@/assets/applicazione-affumicatori.webp";

const data: ApplicazioneData = {
  id: "affumicatori",
  title: "Affumicatori",
  icon: Beef,
  heroColor: "bg-gradient-to-br from-primary via-primary/95 to-primary/90",
  heroImage,
  subtitle: "Trattamento fumi densi e aromatici da processi di affumicatura alimentare professionale.",
  problemiTipici: [
    "Fumi densi e persistenti durante il processo di affumicatura",
    "Odori intensi di fumo percepibili a lunga distanza",
    "Depositi di fuliggine e residui grassi sulle strutture",
    "Lamentele frequenti da residenti e attività limitrofe",
    "Non conformità ai limiti emissivi per impianti alimentari"
  ],
  ambitiCoinvolti: [
    { name: "Salumifici", href: "/industriale/affumicatori" },
    { name: "Caseifici", href: "/industriale/caseifici" },
    { name: "Industrie ittiche", href: "/industriale/affumicatori" }
  ],
  modelliCompatibili: [
    { name: "ZAF", descrizione: "Per affumicatori di media portata (Ø 200–250 mm)", href: "/modelli/zaf" },
    { name: "ZAF MAX", descrizione: "Per affumicatori industriali (Ø 300–350 mm)", href: "/modelli/zaf-max" },
    { name: "Z-MAX", descrizione: "Per impianti ad altissima portata (Ø 400–500 mm)", href: "/modelli/z-max" }
  ],
  miniInterventi: [
    {
      titolo: "Salumificio tradizionale",
      citta: "Norcia",
      problema: "Fumi densi dall'affumicatoio con lamentele dai residenti",
      risultato: "Emissioni abbattute del 92%, nessuna segnalazione",
      modello: "ZAF MAX"
    },
    {
      titolo: "Industria ittica",
      citta: "Chioggia",
      problema: "Odori intensi di pesce affumicato nel centro abitato",
      risultato: "Odori neutralizzati, attività a pieno regime",
      modello: "ZAF"
    }
  ]
};

export default function AffumicatoriApp() {
  return <ApplicazioneTemplate data={data} />;
}
