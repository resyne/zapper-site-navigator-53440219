import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "destink-max",
  name: "DESTINK MAX",
  diameter: "Ø 300–350 mm",
  tagline: "Cucine ad alto volume",
  description: "Per cucine ad alto volume. Gestisce grandi quantità di fumi, odori e grassi in ambienti di ristorazione intensiva.",
  ambitiIdeali: [
    { name: "Cucine professionali", href: "/professionale/cucine-professionali" },
  ],
  applicazioniCompatibili: [
    { name: "Cappe professionali", href: "/applicazioni/cappe" },
  ],
  settoriUtilizzo: [
    { name: "Professionale", href: "/settori/professionale" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "300–350 mm" },
    { label: "Tipologia", value: "Odori e grassi" },
    { label: "Filtrazione", value: "Standard alta capacità" },
  ],
};

export default function DestinkMax() {
  return <ModelloTemplate data={data} />;
}
