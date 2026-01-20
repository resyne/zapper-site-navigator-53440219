import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zcm",
  name: "ZCM",
  diameter: "Ø 200–250 mm",
  tagline: "Stufe e camini domestici",
  description: "Per stufe a legna e camini residenziali. Risolve problemi di tiraggio, odori e disturbo al vicinato.",
  ambitiIdeali: [
    { name: "Camini", href: "/domestico/camini" },
    { name: "Stufe", href: "/domestico/stufe" },
  ],
  applicazioniCompatibili: [
    { name: "Camini", href: "/applicazioni/camini" },
  ],
  settoriUtilizzo: [
    { name: "Domestico", href: "/settori/domestico" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "200–250 mm" },
    { label: "Tipologia", value: "Stufa/Camino" },
    { label: "Ambito", value: "Residenziale" },
  ],
};

export default function ZCM() {
  return <ModelloTemplate data={data} />;
}
