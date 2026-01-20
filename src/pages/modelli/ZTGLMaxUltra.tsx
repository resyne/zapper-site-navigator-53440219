import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "ztgl-max-ultra",
  name: "ZTGL MAX ULTRA",
  diameter: "Ø 400–450 mm",
  tagline: "Alta complessità industriale",
  description: "Soluzione per applicazioni industriali ad alta complessità. Il top della gamma per impianti laser di massima potenza.",
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
    { label: "Diametro canna fumaria", value: "400–450 mm" },
    { label: "Tipologia", value: "Taglio laser ultra" },
    { label: "Ambito", value: "Industriale heavy-duty" },
  ],
};

export default function ZTGLMaxUltra() {
  return <ModelloTemplate data={data} />;
}
