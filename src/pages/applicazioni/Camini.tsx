import { Home } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";
import heroImage from "@/assets/applicazione-camini.jpg";

const data: ApplicazioneData = {
  id: "camini",
  title: "Camini e Stufe a Legna",
  icon: Home,
  heroColor: "bg-gradient-to-br from-accent via-accent/95 to-accent/90",
  heroImage,
  subtitle: "Riduzione fumi visibili e particolato da camini aperti, termocamini e stufe a legna domestiche.",
  problemiTipici: [
    "Tiraggio insufficiente con fumo che rientra in casa",
    "Fumi visibili che disturbano il vicinato",
    "Divieti d'uso in periodi di alta concentrazione PM10",
    "Odori persistenti nell'ambiente domestico",
    "Difficoltà nell'accensione e mantenimento della fiamma"
  ],
  ambitiCoinvolti: [
    { name: "Camini domestici", href: "/domestico/camini" },
    { name: "Stufe a legna", href: "/domestico/stufe" },
    { name: "Agriturismi", href: "/professionale/agriturismi" }
  ],
  modelliCompatibili: [
    { name: "ZCM", descrizione: "Per camini e stufe domestiche (Ø 200–250 mm)", href: "/modelli/zcm" },
    { name: "ZCL", descrizione: "Per termocamini con caldaia integrata (Ø 200–250 mm)", href: "/modelli/zcl" }
  ],
  miniInterventi: [
    { 
      titolo: "Villa storica con camino", 
      citta: "Firenze", 
      problema: "Fumo che rientrava in salotto durante l'accensione", 
      risultato: "Tiraggio perfetto, utilizzo senza problemi", 
      modello: "ZCM" 
    },
    { 
      titolo: "Appartamento con stufa", 
      citta: "Trento", 
      problema: "Divieto d'uso per superamento limiti PM10 comunali", 
      risultato: "Stufa autorizzata, emissioni conformi", 
      modello: "ZCM" 
    }
  ]
};

export default function Camini() {
  return <ApplicazioneTemplate data={data} />;
}
