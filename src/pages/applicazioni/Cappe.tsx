import { ChefHat } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";
import heroImage from "@/assets/applicazione-cappe.jpg";

const data: ApplicazioneData = {
  id: "cappe",
  title: "Cappe da Cucina Professionale",
  icon: ChefHat,
  heroColor: "bg-gradient-to-br from-primary via-primary/95 to-primary/90",
  heroImage,
  subtitle: "Trattamento fumi, odori e grassi da cucine professionali con sistemi di captazione e filtrazione avanzata.",
  problemiTipici: [
    "Odori di cucina percepibili all'esterno e nei piani superiori",
    "Depositi di grasso su pareti esterne e condotti",
    "Fumi visibili dall'uscita della canna fumaria",
    "Lamentele da clienti in sala o da residenti",
    "Manutenzione frequente e costi elevati di pulizia"
  ],
  ambitiCoinvolti: [
    { name: "Cucine professionali", href: "/professionale/cucine-professionali" },
    { name: "Pizzerie", href: "/professionale/pizzerie" },
    { name: "Bracerie", href: "/professionale/bracerie" }
  ],
  modelliCompatibili: [
    { name: "DESTINK", descrizione: "Trattamento odori e grassi (Ø 250–300 mm)", href: "/modelli/destink" },
    { name: "DESTINK MAX", descrizione: "Per cucine ad alto volume (Ø 300–350 mm)", href: "/modelli/destink-max" },
    { name: "DESTINK ULTRA", descrizione: "Doppia filtrazione per situazioni critiche (Ø 250–300 mm)", href: "/modelli/destink-ultra" },
    { name: "DESTINK ULTRA MAX", descrizione: "Massima filtrazione per grandi cucine (Ø 300–350 mm)", href: "/modelli/destink-ultra-max" }
  ],
  miniInterventi: [
    { 
      titolo: "Ristorante Stellato", 
      citta: "Milano", 
      problema: "Odori di cucina percepibili in sala e disturbanti per i clienti", 
      risultato: "Ambiente perfetto, nessun odore residuo", 
      modello: "DESTINK ULTRA" 
    },
    { 
      titolo: "Hotel 4 stelle", 
      citta: "Venezia", 
      problema: "Lamentele dai piani superiori per odori dalla cucina", 
      risultato: "Zero segnalazioni, ospiti soddisfatti", 
      modello: "DESTINK MAX" 
    }
  ]
};

export default function Cappe() {
  return <ApplicazioneTemplate data={data} />;
}
