import { Flame } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";

const data: ApplicazioneData = {
  id: "camini", title: "Camini", icon: Flame, heroColor: "bg-zapper-blue-light",
  description: "Soluzioni ZAPPER per camini a legna aperti o chiusi con problemi di tiraggio e fumi.",
  problemaTecnico: "I camini possono soffrire di tiraggio insufficiente o invertito, causando fumo che rientra in casa e disturba gli ambienti interni.",
  contestoNormativo: "In molte regioni l'uso dei camini è regolamentato, con divieti in periodi di alta concentrazione di PM10.",
  ambitiCoinvolti: [{ name: "Camini domestici", href: "/domestico/camini" }, { name: "Stufe", href: "/domestico/stufe" }],
  modelliCompatibili: [{ name: "ZAPPER S", descrizione: "Ideale per camini", href: "/modelli/zapper-s" }],
  miniInterventi: [{ titolo: "Villa Privata", citta: "Firenze", problema: "Fumo che rientra", risultato: "Tiraggio perfetto", modello: "ZAPPER S" }],
};

export default function Camini() { return <ApplicazioneTemplate data={data} />; }
