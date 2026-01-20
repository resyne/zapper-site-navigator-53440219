import { Milk } from "lucide-react";
import AmbitoTemplate, { AmbitoData } from "../AmbitoTemplate";

const caseificiData: AmbitoData = {
  id: "caseifici",
  title: "Caseifici",
  settore: "industriale",
  settoreLabel: "Industriale",
  settoreHref: "/settori/industriale",
  icon: Milk,
  heroColor: "bg-zapper-gray",
  description: "Soluzioni ZAPPER per caseifici con gestione emissioni da caldaie e forni per la produzione casearia tradizionale e industriale.",
  problemiTipici: [
    "Emissioni eccessive dalle caldaie di processo",
    "Fumi dalla produzione di formaggi affumicati",
    "Odori che disturbano le aree circostanti",
    "Necessità di conformità ambientale",
    "Impianti in zone residenziali o protette",
  ],
  applicazioni: [
    {
      name: "Caldaie biomassa",
      href: "/applicazioni/caldaie-biomassa",
      description: "Abbattimento emissioni da caldaie industriali.",
    },
    {
      name: "Sistemi affumicatura",
      href: "/applicazioni/affumicatori",
      description: "Gestione fumi da processi di affumicatura.",
    },
  ],
  modelliConsigliati: [
    {
      name: "ZAPPER M",
      descrizione: "Per caseifici di medie dimensioni",
      href: "/modelli/zapper-m",
    },
    {
      name: "ZAPPER L",
      descrizione: "Per caseifici industriali",
      href: "/modelli/zapper-l",
    },
  ],
  miniInterventi: [
    {
      titolo: "Caseificio Tradizionale",
      citta: "Parma",
      problema: "Caldaia con emissioni eccessive",
      risultato: "Riduzione emissioni del 90%",
      modello: "ZAPPER L",
    },
    {
      titolo: "Caseificio Artigianale",
      citta: "Reggio Emilia",
      problema: "Odori dalla produzione",
      risultato: "Nessuna lamentela dai vicini",
      modello: "ZAPPER M",
    },
  ],
};

const Caseifici = () => {
  return <AmbitoTemplate data={caseificiData} />;
};

export default Caseifici;
