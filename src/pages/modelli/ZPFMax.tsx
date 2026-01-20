import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zpf-max",
  name: "ZPF MAX",
  diameter: "Ø 300–350 mm",
  tagline: "Panifici ad alta produzione",
  description: "Per panifici con elevata produzione. Gestisce grandi volumi di fumi garantendo il rispetto delle normative.",
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
    { label: "Diametro canna fumaria", value: "300–350 mm" },
    { label: "Tipologia", value: "Panificazione intensiva" },
    { label: "Ambito", value: "Professionale" },
  ],
};

export default function ZPFMax() {
  return <ModelloTemplate data={data} />;
}
