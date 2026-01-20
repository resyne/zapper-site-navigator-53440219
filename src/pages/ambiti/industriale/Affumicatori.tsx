import { Flame } from "lucide-react";
import AmbitoTemplate, { AmbitoData } from "../AmbitoTemplate";

const affumicatoriData: AmbitoData = {
  id: "affumicatori",
  title: "Affumicatori",
  settore: "industriale",
  settoreLabel: "Industriale",
  settoreHref: "/settori/industriale",
  icon: Flame,
  heroColor: "bg-zapper-gray",
  description: "Soluzioni ZAPPER per sistemi di affumicatura industriale con gestione di fumi caratteristici e odori intensi da processi di affumicatura.",
  problemiTipici: [
    "Fumi densi e caratteristici dall'affumicatura",
    "Odori intensi che si diffondono nell'area",
    "Particolato e residui nei condotti",
    "Emissioni da gestire per conformità normativa",
    "Processi continui che richiedono affidabilità",
  ],
  applicazioni: [
    {
      name: "Sistemi affumicatura",
      href: "/applicazioni/affumicatori",
      description: "Abbattimento fumi e odori da affumicatura.",
    },
    {
      name: "Forni industriali",
      href: "/applicazioni/forni-industriali",
      description: "Gestione emissioni da forni di processo.",
    },
  ],
  modelliConsigliati: [
    {
      name: "ZAPPER M",
      descrizione: "Per affumicatori di medie dimensioni",
      href: "/modelli/zapper-m",
    },
    {
      name: "ZAPPER L",
      descrizione: "Per impianti di affumicatura industriale",
      href: "/modelli/zapper-l",
    },
  ],
  miniInterventi: [
    {
      titolo: "Salumificio Premium",
      citta: "Modena",
      problema: "Fumi intensi dall'affumicatura",
      risultato: "Emissioni conformi alle normative",
      modello: "ZAPPER L",
    },
    {
      titolo: "Ittica Artigianale",
      citta: "Chioggia",
      problema: "Odori di pesce affumicato",
      risultato: "Riduzione odori del 92%",
      modello: "ZAPPER M",
    },
  ],
};

const Affumicatori = () => {
  return <AmbitoTemplate data={affumicatoriData} />;
};

export default Affumicatori;
