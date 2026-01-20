import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zaf",
  name: "ZAF",
  diameter: "Ø 250–300 mm",
  tagline: "Affumicatori standard",
  description: "Per affumicatori standard. Gestisce i fumi tipici dei processi di affumicatura alimentare.",
  ambitiIdeali: [
    { name: "Affumicatori", href: "/industriale/affumicatori" },
  ],
  applicazioniCompatibili: [
    { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" },
  ],
  settoriUtilizzo: [
    { name: "Industriale", href: "/settori/industriale" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "250–300 mm" },
    { label: "Tipologia", value: "Affumicatore" },
    { label: "Ambito", value: "Industriale" },
  ],
};

export default function ZAF() {
  return <ModelloTemplate data={data} />;
}
