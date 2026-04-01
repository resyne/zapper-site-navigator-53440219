import { Flame } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";
import heroImage from "@/assets/applicazione-forni.webp";

const data: ApplicazioneData = {
  id: "forni-a-legna",
  title: "Forni a Legna",
  icon: Flame,
  heroColor: "bg-gradient-to-br from-primary via-primary/95 to-primary/90",
  heroImage,
  subtitle: "Problemi di fumi, fuliggine e polveri derivanti dalla combustione del legno.",
  problemiTipici: [
    "Fumi neri persistenti dalla canna fumaria",
    "Depositi di fuliggine su superfici esterne e interne",
    "Segnalazioni da vicini o enti per disturbo olfattivo",
    "Difficoltà di tiraggio e fumo che rientra nell'ambiente",
    "Rischio di sanzioni amministrative per emissioni non conformi"
  ],
  ambitiCoinvolti: [
    { name: "Pizzerie", href: "/professionale/pizzerie" },
    { name: "Panifici", href: "/professionale/panifici" },
    { name: "Bracerie", href: "/professionale/bracerie" }
  ],
  modelliCompatibili: [
    { name: "ZPZ", descrizione: "Per forni a legna di media portata (Ø 200–250 mm)", href: "/modelli/zpz" },
    { name: "ZPZ MAX", descrizione: "Per forni ad alta portata e utilizzo intensivo (Ø 300–350 mm)", href: "/modelli/zpz-max" },
    { name: "ZPF", descrizione: "Per forni da panificazione (Ø 200–250 mm)", href: "/modelli/zpf" }
  ],
  miniInterventi: [
    { 
      titolo: "Pizzeria Napoletana", 
      citta: "Napoli", 
      problema: "Fumi neri visibili dalla canna fumaria con lamentele dal vicinato", 
      risultato: "Emissioni abbattute del 95%, zero segnalazioni", 
      modello: "ZPZ MAX" 
    },
    { 
      titolo: "Panificio Artigianale", 
      citta: "Bologna", 
      problema: "Odori intensi durante la produzione notturna", 
      risultato: "Nessuna lamentela, produzione senza vincoli orari", 
      modello: "ZPF" 
    }
  ]
};

export default function ForniALegna() {
  return <ApplicazioneTemplate data={data} />;
}
