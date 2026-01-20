import { UtensilsCrossed } from "lucide-react";
import AmbitoTemplate, { AmbitoData } from "../AmbitoTemplate";

const cucineProfessionaliData: AmbitoData = {
  id: "cucine-professionali",
  title: "Cucine Professionali",
  settore: "professionale",
  settoreLabel: "Professionale",
  settoreHref: "/settori/professionale",
  icon: UtensilsCrossed,
  heroColor: "bg-primary",
  description: "Soluzioni ZAPPER per ristoranti, hotel e cucine professionali con gestione completa di fumi, vapori e odori da cottura intensiva.",
  problemiTipici: [
    "Fumi e vapori da cotture multiple e simultanee",
    "Odori misti che si diffondono nel vicinato",
    "Grasso e condensa nei condotti di aerazione",
    "Problemi di conformità alle normative HACCP",
    "Cappe che non riescono a gestire il carico di lavoro",
  ],
  applicazioni: [
    {
      name: "Cappe professionali",
      href: "/applicazioni/cappe",
      description: "Sistemi di filtrazione avanzati per cappe industriali.",
    },
    {
      name: "Forni a legna",
      href: "/applicazioni/forni-a-legna",
      description: "Abbattimento fumi per forni tradizionali.",
    },
  ],
  modelliConsigliati: [
    {
      name: "ZAPPER M",
      descrizione: "Per cucine di ristoranti standard",
      href: "/modelli/zapper-m",
    },
    {
      name: "ZAPPER L",
      descrizione: "Per grandi cucine di hotel e catering",
      href: "/modelli/zapper-l",
    },
  ],
  miniInterventi: [
    {
      titolo: "Ristorante Stellato",
      citta: "Milano",
      problema: "Odori in sala e lamentele clienti",
      risultato: "Ambiente perfetto, 5 stelle su TripAdvisor",
      modello: "ZAPPER M",
    },
    {
      titolo: "Hotel 4 Stelle",
      citta: "Venezia",
      problema: "Cucina con emissioni fuori norma",
      risultato: "Conformità raggiunta in 2 settimane",
      modello: "ZAPPER L",
    },
  ],
};

const CucineProfessionali = () => {
  return <AmbitoTemplate data={cucineProfessionaliData} />;
};

export default CucineProfessionali;
