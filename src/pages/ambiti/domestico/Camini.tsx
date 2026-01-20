import { Flame } from "lucide-react";
import AmbitoTemplate, { AmbitoData } from "../AmbitoTemplate";

const caminiData: AmbitoData = {
  id: "camini",
  title: "Camini a Legna",
  settore: "domestico",
  settoreLabel: "Domestico",
  settoreHref: "/settori/domestico",
  icon: Flame,
  heroColor: "bg-zapper-blue-light",
  description: "Soluzioni ZAPPER per camini a legna aperti o chiusi con problemi di fumo che rientra in casa, tiraggio insufficiente o disturbo al vicinato.",
  problemiTipici: [
    "Fumo che rientra in casa durante l'uso",
    "Tiraggio insufficiente o invertito",
    "Odori di fumo che disturbano i vicini",
    "Difficoltà di accensione",
    "Fuliggine su pareti e mobili interni",
  ],
  applicazioni: [
    {
      name: "Camini",
      href: "/applicazioni/camini",
      description: "Miglioramento tiraggio e abbattimento fumi.",
    },
  ],
  modelliConsigliati: [
    {
      name: "ZAPPER S",
      descrizione: "Perfetto per camini domestici",
      href: "/modelli/zapper-s",
    },
  ],
  miniInterventi: [
    {
      titolo: "Villa Privata",
      citta: "Firenze",
      problema: "Fumo che rientra dal camino",
      risultato: "Tiraggio perfetto, zero fumo in casa",
      modello: "ZAPPER S",
    },
    {
      titolo: "Appartamento Centro",
      citta: "Roma",
      problema: "Camino con tiraggio invertito",
      risultato: "Problema risolto definitivamente",
      modello: "ZAPPER S",
    },
  ],
};

const Camini = () => {
  return <AmbitoTemplate data={caminiData} />;
};

export default Camini;
