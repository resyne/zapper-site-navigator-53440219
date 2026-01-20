import { Wind } from "lucide-react";
import AmbitoTemplate, { AmbitoData } from "../AmbitoTemplate";

const stufeData: AmbitoData = {
  id: "stufe",
  title: "Stufe",
  settore: "domestico",
  settoreLabel: "Domestico",
  settoreHref: "/settori/domestico",
  icon: Wind,
  heroColor: "bg-zapper-blue-light",
  description: "Soluzioni ZAPPER per stufe a legna o pellet con problemi di tiraggio, emissioni eccessive e disturbo al vicinato.",
  problemiTipici: [
    "Emissioni eccessive dalla stufa",
    "Odori di fumo che disturbano i vicini",
    "Tiraggio insufficiente",
    "Rendimento basso della stufa",
    "Fuliggine e residui sulla canna fumaria",
  ],
  applicazioni: [
    {
      name: "Camini",
      href: "/applicazioni/camini",
      description: "Soluzioni applicabili anche a stufe a legna.",
    },
    {
      name: "Caldaie biomassa",
      href: "/applicazioni/caldaie-biomassa",
      description: "Per stufe a pellet con problemi simili.",
    },
  ],
  modelliConsigliati: [
    {
      name: "ZAPPER S",
      descrizione: "Ideale per stufe domestiche",
      href: "/modelli/zapper-s",
    },
  ],
  miniInterventi: [
    {
      titolo: "Baita Montana",
      citta: "Cortina",
      problema: "Stufa a legna con tiraggio debole",
      risultato: "Tiraggio ottimale, ambiente caldo",
      modello: "ZAPPER S",
    },
    {
      titolo: "Villetta Collina",
      citta: "Verona",
      problema: "Stufa a pellet con emissioni",
      risultato: "Emissioni ridotte dell'80%",
      modello: "ZAPPER S",
    },
  ],
};

const Stufe = () => {
  return <AmbitoTemplate data={stufeData} />;
};

export default Stufe;
