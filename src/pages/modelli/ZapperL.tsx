import ModelloTemplate, { ModelloData } from "./ModelloTemplate";

const data: ModelloData = {
  id: "zapper-l", name: "ZAPPER L", tagline: "Potenza industriale", description: "La soluzione per impianti industriali ad alta portata. Perfetto per torrefazioni, caseifici, forni industriali e grandi impianti produttivi.",
  ambitiIdeali: [{ name: "Torrefazioni", href: "/industriale/torrefazioni" }, { name: "Caseifici", href: "/industriale/caseifici" }, { name: "Forni industriali", href: "/industriale/forni-industriali" }],
  applicazioniCompatibili: [{ name: "Forni industriali", href: "/applicazioni/forni-industriali" }, { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" }, { name: "Sistemi affumicatura", href: "/applicazioni/affumicatori" }],
  settoriUtilizzo: [{ name: "Industriale", href: "/settori/industriale" }],
  specifiche: [{ label: "Portata max", value: "12.000 m³/h" }, { label: "Potenza", value: "4 kW" }, { label: "Dimensioni", value: "100x100x180 cm" }, { label: "Peso", value: "180 kg" }],
};

export default function ZapperL() { return <ModelloTemplate data={data} />; }
