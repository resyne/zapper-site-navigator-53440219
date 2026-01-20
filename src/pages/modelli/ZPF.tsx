import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zpf",
  name: "ZPF",
  diameter: "Ø 200–250 mm",
  tagline: "Per forni da panificazione",
  description: "Per forni da panificazione di media capacità. Ottimizzato per gestire le emissioni tipiche della cottura del pane.",
  ambitiIdeali: [
    { name: "Panifici", href: "/professionale/panifici" },
  ],
  applicazioniCompatibili: [
    { name: "Forni a legna", href: "/applicazioni/forni-a-legna" },
  ],
  settoriUtilizzo: [
    { name: "Professionale", href: "/settori/professionale" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "200–250 mm" },
    { label: "Tipologia", value: "Panificazione" },
    { label: "Ambito", value: "Professionale" },
  ],
};

export default function ZPF() {
  return <ModelloTemplate data={data} />;
}
