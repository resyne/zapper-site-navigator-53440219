import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zapper-m", name: "ZAPPER M", tagline: "Versatile e affidabile", description: "Il modello più richiesto per attività professionali. Ideale per pizzerie, bracerie, ristoranti e cucine professionali di medie dimensioni.",
  ambitiIdeali: [{ name: "Pizzerie", href: "/professionale/pizzerie" }, { name: "Bracerie", href: "/professionale/bracerie" }, { name: "Cucine professionali", href: "/professionale/cucine-professionali" }],
  applicazioniCompatibili: [{ name: "Forni a legna", href: "/applicazioni/forni-a-legna" }, { name: "Braci e carbonella", href: "/applicazioni/braci-carbone" }, { name: "Cappe professionali", href: "/applicazioni/cappe" }],
  settoriUtilizzo: [{ name: "Professionale", href: "/settori/professionale" }, { name: "Industriale", href: "/settori/industriale" }],
  specifiche: [{ label: "Portata max", value: "4.000 m³/h" }, { label: "Potenza", value: "1.5 kW" }, { label: "Dimensioni", value: "60x60x100 cm" }, { label: "Peso", value: "65 kg" }],
};

export default function ZapperM() { return <ModelloTemplate data={data} />; }
