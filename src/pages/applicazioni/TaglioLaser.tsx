import { Scissors } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";
import heroImage from "@/assets/applicazione-taglio-laser.webp";

const data: ApplicazioneData = {
  id: "taglio-laser",
  title: "Macchine Taglio Laser",
  icon: Scissors,
  heroColor: "bg-gradient-to-br from-primary via-primary/95 to-primary/90",
  heroImage,
  subtitle: "Aspirazione e filtrazione fumi e particolato da lavorazioni con taglio laser industriale.",
  problemiTipici: [
    "Fumi tossici generati dal taglio di metalli e polimeri",
    "Particolato fine (PM2.5) disperso nell'ambiente di lavoro",
    "Odori chimici persistenti nell'officina",
    "Rischio per la salute degli operatori senza adeguata filtrazione",
    "Non conformità alle normative sulla sicurezza sul lavoro"
  ],
  ambitiCoinvolti: [
    { name: "Officine", href: "/industriale/forni-industriali" },
    { name: "Industrie metalmeccaniche", href: "/industriale/forni-industriali" }
  ],
  modelliCompatibili: [
    { name: "ZTGL", descrizione: "Per macchine taglio laser di media potenza (Ø 200–250 mm)", href: "/modelli/ztgl" },
    { name: "ZTGL MAX", descrizione: "Per impianti laser industriali (Ø 300–350 mm)", href: "/modelli/ztgl-max" },
    { name: "ZTGL MAX ULTRA", descrizione: "Massima filtrazione per laser ad alta potenza (Ø 350–400 mm)", href: "/modelli/ztgl-max-ultra" }
  ],
  miniInterventi: [
    {
      titolo: "Officina metalmeccanica",
      citta: "Brescia",
      problema: "Fumi dal taglio laser che invadevano l'ambiente di lavoro",
      risultato: "Aria pulita, ambiente conforme alle norme di sicurezza",
      modello: "ZTGL MAX"
    },
    {
      titolo: "Industria automotive",
      citta: "Torino",
      problema: "Particolato fine da taglio laser di lamiere zincate",
      risultato: "Filtrazione completa, zero esposizione operatori",
      modello: "ZTGL MAX ULTRA"
    }
  ]
};

export default function TaglioLaser() {
  return <ApplicazioneTemplate data={data} />;
}
