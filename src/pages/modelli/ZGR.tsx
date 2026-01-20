import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zgr",
  name: "ZGR",
  diameter: "Ø 200–250 mm",
  tagline: "Girarrosti professionali",
  description: "Per girarrosti professionali standard. Soluzione efficace per trattare i fumi di cottura allo spiedo.",
  ambitiIdeali: [
    { name: "Bracerie", href: "/professionale/bracerie" },
    { name: "Cucine professionali", href: "/professionale/cucine-professionali" },
  ],
  applicazioniCompatibili: [
    { name: "Braci e carbonella", href: "/applicazioni/braci-carbone" },
  ],
  settoriUtilizzo: [
    { name: "Professionale", href: "/settori/professionale" },
  ],
  specifiche: [
    { label: "Diametro canna fumaria", value: "200–250 mm" },
    { label: "Tipologia", value: "Girarrosto" },
    { label: "Ambito", value: "Professionale" },
  ],
};

export default function ZGR() {
  return <ModelloTemplate data={data} />;
}
