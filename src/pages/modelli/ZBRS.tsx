import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zbr-s",
  name: "ZBR S",
  diameter: "Ø 200–250 mm",
  tagline: "Per bracerie standard",
  description: "Per impianti a braci e carbone di media portata. Ideale per ristoranti con griglia e bracerie tradizionali.",
  ambitiIdeali: [
    { name: "Bracerie", href: "/professionale/bracerie" },
  ],
  applicazioniCompatibili: [
    { name: "Braci e carbonella", href: "/applicazioni/braci-carbone" },
  ],
  settoriUtilizzo: [
    { name: "Professionale", href: "/settori/professionale" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "200–250 mm" },
    { label: "Tipologia", value: "Braci e carbone" },
    { label: "Ambito", value: "Professionale" },
  ],
};

export default function ZBRS() {
  return <ModelloTemplate data={data} />;
}
