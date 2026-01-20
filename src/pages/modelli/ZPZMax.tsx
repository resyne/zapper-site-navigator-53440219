import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zpz-max",
  name: "ZPZ MAX",
  diameter: "Ø 300–350 mm",
  tagline: "Alta portata per forni intensivi",
  description: "Per forni a legna ad alta portata e utilizzo intensivo. Ideale per pizzerie con grandi volumi di produzione.",
  ambitiIdeali: [
    { name: "Pizzerie", href: "/professionale/pizzerie" },
  ],
  applicazioniCompatibili: [
    { name: "Forni a legna", href: "/applicazioni/forni-a-legna" },
  ],
  settoriUtilizzo: [
    { name: "Professionale", href: "/settori/professionale" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "300–350 mm" },
    { label: "Tipologia forno", value: "Legna" },
    { label: "Ambito", value: "Professionale intensivo" },
  ],
};

export default function ZPZMax() {
  return <ModelloTemplate data={data} />;
}
