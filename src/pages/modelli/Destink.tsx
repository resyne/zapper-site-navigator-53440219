import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "destink",
  name: "DESTINK",
  diameter: "Ø 250–300 mm",
  tagline: "Abbattimento odori da cucina",
  description: "Soluzioni specifiche per il trattamento di fumi, odori e grassi da cucina. Perfetto per ristoranti e cucine professionali.",
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
    { label: "Diametro canna fumaria", value: "250–300 mm" },
    { label: "Tipologia", value: "Odori e grassi" },
    { label: "Filtrazione", value: "Standard" },
  ],
};

export default function Destink() {
  return <ModelloTemplate data={data} />;
}
