import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "destink-ultra",
  name: "DESTINK ULTRA",
  diameter: "Ø 250–300 mm",
  tagline: "Doppia filtrazione",
  description: "Doppia filtrazione per odori persistenti. Ideale per cucine con fritture, grigliate e cotture che generano odori intensi.",
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
    { label: "Tipologia", value: "Odori intensi" },
    { label: "Filtrazione", value: "Doppia" },
  ],
};

export default function DestinkUltra() {
  return <ModelloTemplate data={data} />;
}
