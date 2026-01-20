import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zaf-max",
  name: "ZAF MAX",
  diameter: "Ø 300–350 mm",
  tagline: "Affumicatori industriali",
  description: "Per affumicatori industriali. La soluzione per grandi impianti di affumicatura.",
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
    { label: "Diametro canna fumaria", value: "300–350 mm" },
    { label: "Tipologia", value: "Affumicatore grande" },
    { label: "Ambito", value: "Industriale" },
  ],
};

export default function ZAFMax() {
  return <ModelloTemplate data={data} />;
}
