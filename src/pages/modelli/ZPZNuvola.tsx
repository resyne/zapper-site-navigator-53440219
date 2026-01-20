import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zpz-nuvola",
  name: "ZPZ NUVOLA",
  diameter: "Ø 80–120 mm",
  tagline: "Compatto per forni elettrici",
  description: "Per forni elettrici compatti. Soluzione discreta e performante per pizzerie con forni elettrici di piccole dimensioni.",
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
    { label: "Diametro canna fumaria", value: "80–120 mm" },
    { label: "Tipologia forno", value: "Elettrico" },
    { label: "Ambito", value: "Professionale compatto" },
  ],
};

export default function ZPZNuvola() {
  return <ModelloTemplate data={data} />;
}
