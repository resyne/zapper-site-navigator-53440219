import { Coffee } from "lucide-react";
import AmbitoTemplate, { AmbitoData } from "../AmbitoTemplate";

const torrefazioniData: AmbitoData = {
  id: "torrefazioni",
  title: "Torrefazioni",
  settore: "industriale",
  settoreLabel: "Industriale",
  settoreHref: "/settori/industriale",
  icon: Coffee,
  heroColor: "bg-zapper-gray",
  description: "Soluzioni ZAPPER per impianti di tostatura caffè con gestione di fumi densi, odori intensi e alte portate d'aria da trattare.",
  problemiTipici: [
    "Fumi densi dalla tostatura del caffè",
    "Odori intensi che si diffondono per chilometri",
    "Emissioni fuori norma e rischio sanzioni",
    "Alte portate d'aria da trattare",
    "Necessità di continuità operativa senza fermi",
  ],
  applicazioni: [
    {
      name: "Forni industriali",
      href: "/applicazioni/forni-industriali",
      description: "Abbattimento emissioni per tostatrici industriali.",
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
      descrizione: "Per torrefazioni industriali",
      href: "/modelli/zapper-l",
    },
  ],
  miniInterventi: [
    {
      titolo: "Torrefazione Premium",
      citta: "Torino",
      problema: "Emissioni fuori norma, rischio chiusura",
      risultato: "Conformità normativa raggiunta",
      modello: "ZAPPER L",
    },
    {
      titolo: "Caffè Artigianale",
      citta: "Trieste",
      problema: "Odori intensi nel quartiere",
      risultato: "Riduzione odori del 95%",
      modello: "ZAPPER L",
    },
  ],
};

const Torrefazioni = () => {
  return <AmbitoTemplate data={torrefazioniData} />;
};

export default Torrefazioni;
