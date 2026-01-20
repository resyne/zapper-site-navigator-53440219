import { Thermometer } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";

const data: ApplicazioneData = {
  id: "braci-carbone",
  title: "Braci e Carbone",
  icon: Thermometer,
  heroColor: "bg-gradient-to-br from-primary via-primary/95 to-primary/90",
  subtitle: "Trattamento fumi da combustione di carbone e braci in impianti professionali per grigliate.",
  problemiTipici: [
    "Fumi densi e grassi che si diffondono nel vicinato",
    "Odori intensi di carne e carbone percepibili a distanza",
    "Depositi di grasso su pareti e superfici esterne",
    "Lamentele frequenti da residenti e attività limitrofe",
    "Rischio di chiusura per superamento limiti emissioni"
  ],
  ambitiCoinvolti: [
    { name: "Bracerie", href: "/professionale/bracerie" },
    { name: "Girarrosti", href: "/professionale/girarrosti" },
    { name: "Cucine professionali", href: "/professionale/cucine-professionali" }
  ],
  modelliCompatibili: [
    { name: "ZBR S", descrizione: "Per impianti a braci di media portata (Ø 200–250 mm)", href: "/modelli/zbr-s" },
    { name: "ZBR MAX", descrizione: "Per bracerie ad alta intensità (Ø 300–350 mm)", href: "/modelli/zbr-max" },
    { name: "ZGR", descrizione: "Per girarrosti professionali (Ø 200–250 mm)", href: "/modelli/zgr" }
  ],
  miniInterventi: [
    { 
      titolo: "Braceria Gourmet", 
      citta: "Roma", 
      problema: "Fumi densi e odori che raggiungevano gli appartamenti vicini", 
      risultato: "Nessuna lamentela, attività a pieno regime", 
      modello: "ZBR MAX" 
    },
    { 
      titolo: "Girarrosto Tradizionale", 
      citta: "Firenze", 
      problema: "Depositi di grasso sulle facciate condominiali", 
      risultato: "Emissioni pulite, relazioni di vicinato ristabilite", 
      modello: "ZGR" 
    }
  ]
};

export default function BraciCarbone() {
  return <ApplicazioneTemplate data={data} />;
}
