import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "ztrf-max",
  name: "ZTRF MAX",
  diameter: "Ø 300–350 mm",
  tagline: "Torrefazioni alta capacità",
  description: "Per torrefazioni ad alta capacità. Ideale per stabilimenti con grandi volumi di produzione.",
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
    { label: "Diametro canna fumaria", value: "300–350 mm" },
    { label: "Tipologia", value: "Torrefazione intensiva" },
    { label: "Ambito", value: "Industriale" },
  ],
};

export default function ZTRFMax() {
  return <ModelloTemplate data={data} />;
}
