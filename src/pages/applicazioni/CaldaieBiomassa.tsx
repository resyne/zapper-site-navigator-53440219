import { Flame } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";
import heroImage from "@/assets/applicazione-caldaie.webp";

const data: ApplicazioneData = {
  id: "caldaie-biomassa",
  title: "Caldaie a Biomassa",
  icon: Flame,
  heroColor: "bg-gradient-to-br from-accent via-accent/95 to-accent/90",
  heroImage,
  subtitle: "Abbattimento particolato e fumi da caldaie alimentate a pellet, legna, cippato o altri combustibili solidi.",
  problemiTipici: [
    "Fumo visibile durante accensione e spegnimento",
    "Emissioni eccessive di particolato fine (PM10, PM2.5)",
    "Odori sgradevoli percepiti dal vicinato",
    "Non conformità ai limiti regionali sempre più stringenti",
    "Problemi di tiraggio con rientro di fumo in ambiente"
  ],
  ambitiCoinvolti: [
    { name: "Caldaie domestiche", href: "/domestico/caldaie-biomassa" },
    { name: "Stufe a legna", href: "/domestico/stufe" },
    { name: "Caseifici", href: "/industriale/caseifici" }
  ],
  modelliCompatibili: [
    { name: "ZCL", descrizione: "Per caldaie domestiche e piccole (Ø 200–250 mm)", href: "/modelli/zcl" },
    { name: "ZCL MAX", descrizione: "Per caldaie medie e industriali (Ø 250–300 mm)", href: "/modelli/zcl-max" },
    { name: "Z-MAX", descrizione: "Per impianti industriali ad altissima portata (Ø 400–500 mm)", href: "/modelli/z-max" }
  ],
  miniInterventi: [
    { 
      titolo: "Villa con caldaia a pellet", 
      citta: "Treviso", 
      problema: "Emissioni eccessive durante l'accensione mattutina", 
      risultato: "Riduzione 85% particolato, nessun fumo visibile", 
      modello: "ZCL" 
    },
    { 
      titolo: "Azienda agricola", 
      citta: "Mantova", 
      problema: "Caldaia a cippato non conforme ai nuovi limiti regionali", 
      risultato: "Impianto a norma, autorizzazione rinnovata", 
      modello: "ZCL MAX" 
    }
  ]
};

export default function CaldaieBiomassa() {
  return <ApplicazioneTemplate data={data} />;
}
