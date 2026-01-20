import { Flame } from "lucide-react";
import AmbitoTemplate, { AmbitoData } from "../AmbitoTemplate";

const bracerieData: AmbitoData = {
  id: "bracerie",
  title: "Bracerie",
  settore: "professionale",
  settoreLabel: "Professionale",
  settoreHref: "/settori/professionale",
  icon: Flame,
  heroColor: "bg-primary",
  description: "Soluzioni ZAPPER per bracerie con griglie a carbone e braci, gestione fumi densi e odori intensi tipici della cottura alla brace.",
  problemiTipici: [
    "Fumi densi e scuri dalla combustione del carbone",
    "Odore intenso di carne e carbone nel vicinato",
    "Grasso e particolato che sporcano le superfici",
    "Segnalazioni frequenti da vicini e condomini",
    "Difficoltà nel rispettare le normative sulle emissioni",
  ],
  applicazioni: [
    {
      name: "Braci e carbonella",
      href: "/applicazioni/braci-carbone",
      description: "Abbattimento fumi e odori da griglie a carbone.",
    },
    {
      name: "Cappe professionali",
      href: "/applicazioni/cappe",
      description: "Sistemi di filtrazione per cappe da cucina.",
    },
  ],
  modelliConsigliati: [
    {
      name: "ZAPPER M",
      descrizione: "Ideale per bracerie standard",
      href: "/modelli/zapper-m",
    },
    {
      name: "ZAPPER L",
      descrizione: "Per bracerie ad alto volume",
      href: "/modelli/zapper-l",
    },
  ],
  miniInterventi: [
    {
      titolo: "Braceria Gourmet",
      citta: "Roma",
      problema: "Fumi densi e odore di carbone",
      risultato: "Ambiente pulito, clienti soddisfatti",
      modello: "ZAPPER M",
    },
    {
      titolo: "Steakhouse Centro",
      citta: "Firenze",
      problema: "Lamentele continue dei vicini",
      risultato: "Nessuna segnalazione da 1 anno",
      modello: "ZAPPER M",
    },
  ],
};

const Bracerie = () => {
  return <AmbitoTemplate data={bracerieData} />;
};

export default Bracerie;
