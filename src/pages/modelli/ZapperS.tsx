import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zapper-s", name: "ZAPPER S", tagline: "Compatto e potente", description: "La soluzione ideale per impianti domestici e piccole attività professionali. Perfetto per camini, stufe, piccole pizzerie e panifici.",
  ambitiIdeali: [{ name: "Camini", href: "/domestico/camini" }, { name: "Stufe", href: "/domestico/stufe" }, { name: "Pizzerie piccole", href: "/professionale/pizzerie" }],
  applicazioniCompatibili: [{ name: "Camini", href: "/applicazioni/camini" }, { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" }, { name: "Forni a legna", href: "/applicazioni/forni-a-legna" }],
  settoriUtilizzo: [{ name: "Domestico", href: "/settori/domestico" }, { name: "Professionale", href: "/settori/professionale" }],
  specifiche: [{ label: "Portata max", value: "1.500 m³/h" }, { label: "Potenza", value: "0.5 kW" }, { label: "Dimensioni", value: "40x40x60 cm" }, { label: "Peso", value: "25 kg" }],
};

export default function ZapperS() { return <ModelloTemplate data={data} />; }
