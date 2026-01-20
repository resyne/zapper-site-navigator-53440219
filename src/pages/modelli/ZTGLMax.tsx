import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "ztgl-max",
  name: "ZTGL MAX",
  diameter: "Ø 300–350 mm",
  tagline: "Laser alta potenza",
  description: "Per macchine laser ad alta potenza. Ideale per stabilimenti con macchinari laser di grandi dimensioni.",
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
    { label: "Diametro canna fumaria", value: "300–350 mm" },
    { label: "Tipologia", value: "Taglio laser grande" },
    { label: "Ambito", value: "Industriale" },
  ],
};

export default function ZTGLMax() {
  return <ModelloTemplate data={data} />;
}
