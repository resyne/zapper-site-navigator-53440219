import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "destink-ultra-max",
  name: "DESTINK ULTRA MAX",
  diameter: "Ø 300–350 mm",
  tagline: "Doppia filtrazione grande",
  description: "Doppia filtrazione per grandi cucine. La soluzione più potente per abbattere odori e grassi in contesti di ristorazione intensiva.",
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
    { label: "Tipologia", value: "Odori intensi grande volume" },
    { label: "Filtrazione", value: "Doppia alta capacità" },
  ],
};

export default function DestinkUltraMax() {
  return <ModelloTemplate data={data} />;
}
