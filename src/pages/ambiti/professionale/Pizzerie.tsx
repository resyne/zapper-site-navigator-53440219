import { Pizza } from "lucide-react";
import AmbitoTemplate, { AmbitoData } from "../AmbitoTemplate";

const pizzerieData: AmbitoData = {
  id: "pizzerie",
  title: "Pizzerie",
  settore: "professionale",
  settoreLabel: "Professionale",
  settoreHref: "/settori/professionale",
  icon: Pizza,
  heroColor: "bg-primary",
  description: "Soluzioni ZAPPER per pizzerie con forni a legna, forni elettrici ad alta temperatura e problemi di fumi, odori e segnalazioni dai vicini o dall'ASL.",
  problemiTipici: [
    "Fumi neri che escono dalla canna fumaria",
    "Odori di bruciato che disturbano i vicini",
    "Segnalazioni ASL e rischio sanzioni",
    "Tiraggio insufficiente del forno",
    "Residui e fuliggine su tetto e pareti esterne",
  ],
  applicazioni: [
    {
      name: "Forni a legna",
      href: "/applicazioni/forni-a-legna",
      description: "Abbattimento fumi e odori per forni a legna tradizionali.",
    },
    {
      name: "Cappe professionali",
      href: "/applicazioni/cappe",
      description: "Sistemi di filtrazione per cappe da cucina professionale.",
    },
  ],
  modelliConsigliati: [
    {
      name: "ZAPPER S",
      descrizione: "Ideale per pizzerie di piccole dimensioni",
      href: "/modelli/zapper-s",
    },
    {
      name: "ZAPPER M",
      descrizione: "Perfetto per pizzerie di medie dimensioni",
      href: "/modelli/zapper-m",
    },
  ],
  miniInterventi: [
    {
      titolo: "Pizzeria Centro Storico",
      citta: "Napoli",
      problema: "Fumi neri e segnalazioni ASL",
      risultato: "Zero segnalazioni in 8 mesi",
      modello: "ZAPPER M",
    },
    {
      titolo: "Pizzeria da Asporto",
      citta: "Milano",
      problema: "Odori forti nel condominio",
      risultato: "Nessuna lamentela dai vicini",
      modello: "ZAPPER S",
    },
  ],
};

const Pizzerie = () => {
  return <AmbitoTemplate data={pizzerieData} />;
};

export default Pizzerie;
