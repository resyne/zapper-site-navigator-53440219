import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zgr-max",
  name: "ZGR MAX",
  diameter: "Ø 300–350 mm",
  tagline: "Girarrosti grandi dimensioni",
  description: "Per impianti di grandi dimensioni. Ideale per rosticcerie e locali con più girarrosti attivi.",
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
    { label: "Diametro canna fumaria", value: "300–350 mm" },
    { label: "Tipologia", value: "Girarrosto grande" },
    { label: "Ambito", value: "Professionale intensivo" },
  ],
};

export default function ZGRMax() {
  return <ModelloTemplate data={data} />;
}
