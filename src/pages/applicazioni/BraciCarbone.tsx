import { Flame } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";

const data: ApplicazioneData = {
  id: "braci-carbone", title: "Braci e Carbonella", icon: Flame, heroColor: "bg-primary",
  description: "Soluzioni ZAPPER per griglie a carbone e bracerie con fumi densi e odori intensi.",
  problemaTecnico: "La combustione del carbone produce fumi densi, grassi e odori intensi di carne che si diffondono rapidamente nel vicinato, causando lamentele e potenziali sanzioni.",
  contestoNormativo: "Le bracerie sono soggette a normative specifiche su emissioni e odori. In zone residenziali i vincoli sono particolarmente stringenti.",
  ambitiCoinvolti: [{ name: "Bracerie", href: "/professionale/bracerie" }, { name: "Cucine professionali", href: "/professionale/cucine-professionali" }],
  modelliCompatibili: [{ name: "ZAPPER M", descrizione: "Per bracerie standard", href: "/modelli/zapper-m" }, { name: "ZAPPER L", descrizione: "Per grandi volumi", href: "/modelli/zapper-l" }],
  miniInterventi: [{ titolo: "Braceria Gourmet", citta: "Roma", problema: "Fumi densi nel vicinato", risultato: "Nessuna lamentela", modello: "ZAPPER M" }],
};

export default function BraciCarbone() { return <ApplicazioneTemplate data={data} />; }
