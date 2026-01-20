import { Thermometer } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";

const data: ApplicazioneData = {
  id: "caldaie-biomassa", title: "Caldaie a Biomassa", icon: Thermometer, heroColor: "bg-zapper-blue-light",
  description: "Soluzioni ZAPPER per caldaie a pellet, cippato e legna in ambito domestico e industriale.",
  problemaTecnico: "Le caldaie a biomassa possono presentare problemi di tiraggio, emissioni eccessive e odori durante l'accensione o in caso di combustione incompleta.",
  contestoNormativo: "Le caldaie a biomassa devono rispettare limiti di emissione sempre più stringenti, specialmente in zone urbane e Pianura Padana.",
  ambitiCoinvolti: [{ name: "Caldaie domestiche", href: "/domestico/caldaie-biomassa" }, { name: "Caseifici", href: "/industriale/caseifici" }, { name: "Torrefazioni", href: "/industriale/torrefazioni" }],
  modelliCompatibili: [{ name: "ZAPPER S", descrizione: "Per uso domestico", href: "/modelli/zapper-s" }, { name: "ZAPPER L", descrizione: "Per uso industriale", href: "/modelli/zapper-l" }],
  miniInterventi: [{ titolo: "Villa Privata", citta: "Treviso", problema: "Emissioni eccessive", risultato: "Riduzione 85%", modello: "ZAPPER S" }],
};

export default function CaldaieBiomassa() { return <ApplicazioneTemplate data={data} />; }
