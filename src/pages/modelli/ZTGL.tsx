import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "ztgl",
  name: "ZTGL",
  diameter: "Ø 200–250 mm",
  tagline: "Taglio laser standard",
  description: "Per macchine taglio laser standard. Gestisce i fumi generati dal taglio laser industriale.",
  ambitiIdeali: [
    { name: "Forni industriali", href: "/industriale/forni-industriali" },
  ],
  applicazioniCompatibili: [
    { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" },
  ],
  settoriUtilizzo: [
    { name: "Industriale", href: "/settori/industriale" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "200–250 mm" },
    { label: "Tipologia", value: "Taglio laser" },
    { label: "Ambito", value: "Industriale" },
  ],
};

export default function ZTGL() {
  return <ModelloTemplate data={data} />;
}
