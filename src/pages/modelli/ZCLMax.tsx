import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zcl-max",
  name: "ZCL MAX",
  diameter: "Ø 250–300 mm",
  tagline: "Caldaie alta portata",
  description: "Per caldaie domestiche ad alta portata. Ideale per abitazioni grandi o sistemi di riscaldamento centralizzato.",
  ambitiIdeali: [
    { name: "Caldaie biomassa", href: "/domestico/caldaie-biomassa" },
  ],
  applicazioniCompatibili: [
    { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" },
  ],
  settoriUtilizzo: [
    { name: "Domestico", href: "/settori/domestico" },
    { name: "Industriale", href: "/settori/industriale" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "250–300 mm" },
    { label: "Tipologia", value: "Caldaia grande" },
    { label: "Ambito", value: "Residenziale/Industriale" },
  ],
};

export default function ZCLMax() {
  return <ModelloTemplate data={data} />;
}
