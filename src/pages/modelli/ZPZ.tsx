import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zpz",
  name: "ZPZ",
  diameter: "Ø 200–250 mm",
  tagline: "Il classico per forni a legna",
  description: "Per forni a legna di media portata in ambito professionale. Soluzione affidabile per pizzerie che cercano abbattimento fumi efficace senza compromessi.",
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
    { label: "Tipologia forno", value: "Legna" },
    { label: "Ambito", value: "Professionale" },
  ],
};

export default function ZPZ() {
  return <ModelloTemplate data={data} />;
}
