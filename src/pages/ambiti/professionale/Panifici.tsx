import { Croissant } from "lucide-react";
import AmbitoTemplate, { AmbitoData } from "../AmbitoTemplate";

const panificiData: AmbitoData = {
  id: "panifici",
  title: "Panifici",
  settore: "professionale",
  settoreLabel: "Professionale",
  settoreHref: "/settori/professionale",
  icon: Croissant,
  heroColor: "bg-primary",
  description: "Soluzioni ZAPPER per panifici con forni professionali per la panificazione, gestione fumi e odori da cottura intensiva.",
  problemiTipici: [
    "Fumi da cottura continua durante la notte",
    "Odori persistenti che disturbano il vicinato",
    "Segnalazioni per emissioni fuori norma",
    "Residui di fuliggine su superfici esterne",
    "Problemi di tiraggio con forni multipli",
  ],
  applicazioni: [
    {
      name: "Forni a legna",
      href: "/applicazioni/forni-a-legna",
      description: "Abbattimento fumi per forni a legna tradizionali.",
    },
    {
      name: "Cappe professionali",
      href: "/applicazioni/cappe",
      description: "Sistemi di filtrazione per cappe industriali.",
    },
  ],
  modelliConsigliati: [
    {
      name: "ZAPPER S",
      descrizione: "Per panifici di piccole dimensioni",
      href: "/modelli/zapper-s",
    },
    {
      name: "ZAPPER M",
      descrizione: "Per panifici con produzione media",
      href: "/modelli/zapper-m",
    },
  ],
  miniInterventi: [
    {
      titolo: "Panificio Artigianale",
      citta: "Milano",
      problema: "Odori persistenti e lamentele notturne",
      risultato: "Zero segnalazioni in 6 mesi",
      modello: "ZAPPER S",
    },
    {
      titolo: "Panificio Tradizionale",
      citta: "Bologna",
      problema: "Fumi eccessivi dal forno a legna",
      risultato: "Emissioni ridotte del 90%",
      modello: "ZAPPER M",
    },
  ],
};

const Panifici = () => {
  return <AmbitoTemplate data={panificiData} />;
};

export default Panifici;
