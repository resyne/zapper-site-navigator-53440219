import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zcl",
  name: "ZCL",
  diameter: "Ø 200–250 mm",
  tagline: "Per caldaie residenziali",
  description: "Per caldaie domestiche standard. Soluzione compatta ed efficiente per abitazioni con caldaia a biomassa.",
  ambitiIdeali: [
    { name: "Caldaie biomassa", href: "/domestico/caldaie-biomassa" },
  ],
  applicazioniCompatibili: [
    { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" },
  ],
  settoriUtilizzo: [
    { name: "Domestico", href: "/settori/domestico" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "200–250 mm" },
    { label: "Tipologia", value: "Caldaia" },
    { label: "Ambito", value: "Residenziale" },
  ],
};

export default function ZCL() {
  return <ModelloTemplate data={data} />;
}
