import { Thermometer } from "lucide-react";
import AmbitoTemplate, { AmbitoData } from "../AmbitoTemplate";

const caldaieBiomassaData: AmbitoData = {
  id: "caldaie-biomassa",
  title: "Caldaie a Biomassa",
  settore: "domestico",
  settoreLabel: "Domestico",
  settoreHref: "/settori/domestico",
  icon: Thermometer,
  heroColor: "bg-zapper-blue-light",
  description: "Soluzioni ZAPPER per caldaie domestiche a pellet, cippato o legna con problemi di tiraggio, emissioni e disturbo al vicinato.",
  problemiTipici: [
    "Tiraggio insufficiente della caldaia",
    "Fumi che disturbano i vicini",
    "Emissioni eccessive da combustione incompleta",
    "Odori sgradevoli durante l'accensione",
    "Residui e fuliggine sul tetto e pareti",
  ],
  applicazioni: [
    {
      name: "Caldaie biomassa",
      href: "/applicazioni/caldaie-biomassa",
      description: "Miglioramento tiraggio e abbattimento emissioni.",
    },
  ],
  modelliConsigliati: [
    {
      name: "ZAPPER S",
      descrizione: "Perfetto per caldaie domestiche",
      href: "/modelli/zapper-s",
    },
  ],
  miniInterventi: [
    {
      titolo: "Casa di Campagna",
      citta: "Treviso",
      problema: "Caldaia biomassa con emissioni eccessive",
      risultato: "Emissioni ridotte dell'85%",
      modello: "ZAPPER S",
    },
    {
      titolo: "Villa Bifamiliare",
      citta: "Belluno",
      problema: "Fumi che disturbano i vicini",
      risultato: "Zero lamentele in 10 mesi",
      modello: "ZAPPER S",
    },
  ],
};

const CaldaieBiomassa = () => {
  return <AmbitoTemplate data={caldaieBiomassaData} />;
};

export default CaldaieBiomassa;
