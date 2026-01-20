import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zbr-max",
  name: "ZBR MAX",
  diameter: "Ø 300–350 mm",
  tagline: "Bracerie ad alta intensità",
  description: "Per bracerie ad alta intensità. Progettato per locali con elevato volume di cottura alla griglia.",
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
    { label: "Diametro canna fumaria", value: "300–350 mm" },
    { label: "Tipologia", value: "Braci e carbone intensivo" },
    { label: "Ambito", value: "Professionale" },
  ],
};

export default function ZBRMax() {
  return <ModelloTemplate data={data} />;
}
