import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "ztrf",
  name: "ZTRF",
  diameter: "Ø 200–250 mm",
  tagline: "Per torrefazioni",
  description: "Per torrefazioni standard. Gestisce efficacemente i fumi della tostatura del caffè.",
  ambitiIdeali: [
    { name: "Torrefazioni", href: "/industriale/torrefazioni" },
  ],
  applicazioniCompatibili: [
    { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" },
  ],
  settoriUtilizzo: [
    { name: "Industriale", href: "/settori/industriale" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "200–250 mm" },
    { label: "Tipologia", value: "Torrefazione" },
    { label: "Ambito", value: "Industriale" },
  ],
};

export default function ZTRF() {
  return <ModelloTemplate data={data} />;
}
