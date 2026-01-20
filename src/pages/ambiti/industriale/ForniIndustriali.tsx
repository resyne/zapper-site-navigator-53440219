import { Warehouse } from "lucide-react";
import AmbitoTemplate, { AmbitoData } from "../AmbitoTemplate";

const forniIndustrialiData: AmbitoData = {
  id: "forni-industriali",
  title: "Forni Industriali",
  settore: "industriale",
  settoreLabel: "Industriale",
  settoreHref: "/settori/industriale",
  icon: Warehouse,
  heroColor: "bg-zapper-gray",
  description: "Soluzioni ZAPPER per forni industriali di grandi dimensioni utilizzati in processi produttivi con alte portate e emissioni complesse.",
  problemiTipici: [
    "Alte portate d'aria da trattare",
    "Emissioni complesse con particolato e fumi",
    "Necessità di conformità ambientale stringente",
    "Rischio di fermi produzione per sanzioni",
    "Impianti in zone con vincoli ambientali",
  ],
  applicazioni: [
    {
      name: "Forni industriali",
      href: "/applicazioni/forni-industriali",
      description: "Abbattimento emissioni per forni di grandi dimensioni.",
    },
    {
      name: "Caldaie biomassa",
      href: "/applicazioni/caldaie-biomassa",
      description: "Gestione emissioni da caldaie di processo.",
    },
  ],
  modelliConsigliati: [
    {
      name: "ZAPPER L",
      descrizione: "Per forni industriali ad alta portata",
      href: "/modelli/zapper-l",
    },
  ],
  miniInterventi: [
    {
      titolo: "Fonderia Metalli",
      citta: "Brescia",
      problema: "Emissioni fuori norma, rischio fermo",
      risultato: "Conformità raggiunta, produzione continua",
      modello: "ZAPPER L",
    },
    {
      titolo: "Ceramica Industriale",
      citta: "Sassuolo",
      problema: "Fumi densi dai forni di cottura",
      risultato: "Riduzione emissioni del 88%",
      modello: "ZAPPER L",
    },
  ],
};

const ForniIndustriali = () => {
  return <AmbitoTemplate data={forniIndustrialiData} />;
};

export default ForniIndustriali;
