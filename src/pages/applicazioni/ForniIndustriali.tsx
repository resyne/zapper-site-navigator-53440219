import { Factory } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";
import heroImage from "@/assets/applicazione-forni-industriali.webp";

const data: ApplicazioneData = {
  id: "forni-industriali",
  title: "Forni Industriali",
  icon: Factory,
  heroColor: "bg-gradient-to-br from-primary via-primary/95 to-primary/90",
  heroImage,
  subtitle: "Abbattimento fumi e particolato da forni industriali per processi produttivi ad alta temperatura.",
  problemiTipici: [
    "Emissioni di fumi densi e particolato dalle ciminiere",
    "Superamento dei limiti normativi per le emissioni industriali",
    "Depositi di polveri e residui sulle strutture circostanti",
    "Segnalazioni da enti di controllo ambientale (ARPA)",
    "Rischio di sanzioni e fermi produttivi per non conformità"
  ],
  ambitiCoinvolti: [
    { name: "Industrie alimentari", href: "/industriale/forni-industriali" },
    { name: "Ceramiche", href: "/industriale/forni-industriali" },
    { name: "Fonderie", href: "/industriale/forni-industriali" }
  ],
  modelliCompatibili: [
    { name: "Z-MAX", descrizione: "Per impianti industriali ad altissima portata (Ø 400–500 mm)", href: "/modelli/z-max" },
    { name: "ZCL MAX", descrizione: "Per forni industriali di media portata (Ø 250–300 mm)", href: "/modelli/zcl-max" },
    { name: "ZTGL MAX", descrizione: "Per forni industriali con taglio laser (Ø 300–400 mm)", href: "/modelli/ztgl-max" }
  ],
  miniInterventi: [
    {
      titolo: "Ceramica industriale",
      citta: "Sassuolo",
      problema: "Emissioni eccessive dal forno di cottura, segnalazione ARPA",
      risultato: "Emissioni conformi, produzione ripresa senza vincoli",
      modello: "Z-MAX"
    },
    {
      titolo: "Industria alimentare",
      citta: "Parma",
      problema: "Fumi visibili dal camino durante i cicli di cottura",
      risultato: "Abbattimento 90% particolato, zero segnalazioni",
      modello: "ZCL MAX"
    }
  ]
};

export default function ForniIndustriali() {
  return <ApplicazioneTemplate data={data} />;
}
