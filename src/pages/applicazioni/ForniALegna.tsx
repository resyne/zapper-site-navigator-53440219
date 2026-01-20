import { Flame } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";

const data: ApplicazioneData = {
  id: "forni-a-legna", title: "Forni a Legna", icon: Flame, heroColor: "bg-primary",
  description: "Soluzioni ZAPPER per forni a legna tradizionali in pizzerie, panifici e abitazioni private.",
  problemaTecnico: "I forni a legna producono fumi densi, particolato e odori intensi. Il tiraggio può essere insufficiente, causando fumo che rientra o esce dalla canna fumaria disturbando il vicinato.",
  contestoNormativo: "Le emissioni da forni a legna sono regolate da normative locali e nazionali. In molte regioni sono previsti limiti stringenti per particolato e odori, con rischio di sanzioni e ordini di chiusura.",
  ambitiCoinvolti: [{ name: "Pizzerie", href: "/professionale/pizzerie" }, { name: "Panifici", href: "/professionale/panifici" }, { name: "Camini domestici", href: "/domestico/camini" }],
  modelliCompatibili: [{ name: "ZAPPER S", descrizione: "Per forni piccoli", href: "/modelli/zapper-s" }, { name: "ZAPPER M", descrizione: "Per forni medi", href: "/modelli/zapper-m" }],
  miniInterventi: [{ titolo: "Pizzeria Napoletana", citta: "Napoli", problema: "Fumi neri dalla canna fumaria", risultato: "Emissioni abbattute del 95%", modello: "ZAPPER M" }, { titolo: "Panificio Artigianale", citta: "Bologna", problema: "Odori notturni", risultato: "Zero lamentele", modello: "ZAPPER S" }],
};

export default function ForniALegna() { return <ApplicazioneTemplate data={data} />; }
