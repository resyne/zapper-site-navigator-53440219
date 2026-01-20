import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "z-max",
  name: "Z-MAX",
  diameter: "Ø 400–500 mm",
  tagline: "Altissima portata industriale",
  description: "Per impianti industriali ad altissima portata. La soluzione più potente per grandi stabilimenti produttivi.",
  ambitiIdeali: [
    { name: "Forni industriali", href: "/industriale/forni-industriali" },
    { name: "Torrefazioni", href: "/industriale/torrefazioni" },
  ],
  applicazioniCompatibili: [
    { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" },
  ],
  settoriUtilizzo: [
    { name: "Industriale", href: "/settori/industriale" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "400–500 mm" },
    { label: "Tipologia", value: "Industriale heavy-duty" },
    { label: "Ambito", value: "Industriale" },
  ],
};

export default function ZMax() {
  return <ModelloTemplate data={data} />;
}
