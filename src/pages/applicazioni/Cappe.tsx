import { Wind } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";

const data: ApplicazioneData = {
  id: "cappe", title: "Cappe Professionali", icon: Wind, heroColor: "bg-primary",
  description: "Soluzioni ZAPPER per cappe da cucina professionale in ristoranti, hotel e mense.",
  problemaTecnico: "Le cappe professionali devono gestire grandi volumi di fumi, vapori e grassi. Spesso non riescono a filtrare adeguatamente odori e particolato.",
  contestoNormativo: "Le cucine professionali devono rispettare normative HACCP e ambientali, con controlli su emissioni e manutenzione degli impianti.",
  ambitiCoinvolti: [{ name: "Cucine professionali", href: "/professionale/cucine-professionali" }, { name: "Pizzerie", href: "/professionale/pizzerie" }],
  modelliCompatibili: [{ name: "ZAPPER M", descrizione: "Per cucine medie", href: "/modelli/zapper-m" }, { name: "ZAPPER L", descrizione: "Per grandi cucine", href: "/modelli/zapper-l" }],
  miniInterventi: [{ titolo: "Ristorante Stellato", citta: "Milano", problema: "Odori in sala", risultato: "Ambiente perfetto", modello: "ZAPPER M" }],
};

export default function Cappe() { return <ApplicazioneTemplate data={data} />; }
