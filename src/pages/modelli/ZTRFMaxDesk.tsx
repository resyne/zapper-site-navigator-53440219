import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "ztrf-max-desk",
  name: "ZTRF MAX DESK",
  diameter: "Ø 200–250 mm",
  tagline: "Compatto per spazi ridotti",
  description: "Configurazione compatta per spazi ridotti. Perfetto per micro-torrefazioni in ambiente urbano.",
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
    { label: "Tipologia", value: "Torrefazione compatta" },
    { label: "Ambito", value: "Industriale/Artigianale" },
  ],
};

export default function ZTRFMaxDesk() {
  return <ModelloTemplate data={data} />;
}
