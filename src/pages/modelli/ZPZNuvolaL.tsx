import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zpz-nuvola-l",
  name: "ZPZ NUVOLA L",
  diameter: "Ø 200–250 mm",
  tagline: "Dedicato ai forni a gas",
  description: "Soluzione dedicata per forni a gas professionali. Progettato per trattare le emissioni specifiche della combustione a gas.",
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
    { label: "Diametro canna fumaria", value: "200–250 mm" },
    { label: "Tipologia forno", value: "Gas" },
    { label: "Ambito", value: "Professionale" },
  ],
};

export default function ZPZNuvolaL() {
  return <ModelloTemplate data={data} />;
}
