import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, ArrowRight, Info, Flame, Wind, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

/* ───────── TYPES ───────── */
interface SimplifiedInputs {
  applicationType: string;
  width: string;
  depth: string;
  height: string;
  fuelType: string;
}

interface AdvancedInputs {
  applicationType: string;
  width: string;
  depth: string;
  height: string;
  fuelType: string;
  ambientTemp: string;
  exhaustTemp: string;
  altitude: string;
  ductLength: string;
  ductDiameter: string;
  numBends90: string;
  numBends45: string;
  filterType: string;
  chimneyHeight: string;
}

interface CalcResult {
  portata: number;        // m³/h
  prevalenza: number;     // Pa
  diametroCanna: number;  // mm
  velocita: number;       // m/s
  modelloConsigliato: string;
  modelloHref: string;
}

/* ───────── CONSTANTS ───────── */
const APPLICATION_TYPES = [
  { value: "forno-legna", label: "Forno a legna" },
  { value: "cappa-cucina", label: "Cappa cucina professionale" },
  { value: "caldaia-biomassa", label: "Caldaia a biomassa" },
  { value: "camino", label: "Camino / Stufa" },
  { value: "braciere", label: "Braciere / Griglia" },
  { value: "forno-industriale", label: "Forno industriale" },
  { value: "affumicatore", label: "Affumicatore" },
  { value: "torrefazione", label: "Torrefazione" },
];

const FUEL_TYPES = [
  { value: "legna", label: "Legna" },
  { value: "pellet", label: "Pellet" },
  { value: "carbone", label: "Carbone" },
  { value: "gas", label: "Gas" },
  { value: "gasolio", label: "Gasolio" },
];

const FILTER_TYPES = [
  { value: "nessuno", label: "Nessun filtro" },
  { value: "ciclone", label: "Ciclone" },
  { value: "elettrostatico", label: "Elettrostatico" },
  { value: "tessuto", label: "Filtro a tessuto" },
];

/*
 * ───────── PORTATA CALCULATION LOGIC ─────────
 * 
 * Cappe cucina (UNI EN 16282-1): perimeter method
 *   Q = perimetro_esposto × Δh × v_cattura × 3600
 *   v_cattura tipica = 0.25–0.4 m/s, usiamo 0.3 m/s a parete, 0.35 isola
 *   Δh = distanza bordo cappa – piano cottura, default 0.9 m
 * 
 * Forni a legna / bracieri: opening velocity method
 *   Q = A_bocca × v_aspirazione × 3600
 *   v_aspirazione = 0.8–1.5 m/s (dipende da combustibile)
 * 
 * Caldaie / camini: potenza termica approssimata da volume camera
 *   Q = Volume × ricambi/h (tipico 15-25)
 * 
 * Industriali: area × fattore specifico più contenuto
 */

/* Capture velocity by application [m/s] */
const CAPTURE_VELOCITY: Record<string, number> = {
  "forno-legna": 1.0,
  "cappa-cucina": 0.30,    // UNI EN 16282 — cappa a parete
  "caldaia-biomassa": 0.6,
  "camino": 0.8,
  "braciere": 1.2,
  "forno-industriale": 0.9,
  "affumicatore": 0.5,
  "torrefazione": 0.7,
};

/* Whether app uses perimeter method (cappe) vs opening area method */
const USES_PERIMETER_METHOD = new Set(["cappa-cucina"]);

/* Default overhang height for cappe [m] */
const CAPPA_DH = 0.9;

/* Clamp a numeric value */
function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

/* Calculate portata based on application type */
function calcPortata(appType: string, wM: number, dM: number, _hM: number): number {
  const v = CAPTURE_VELOCITY[appType] || 0.8;

  if (USES_PERIMETER_METHOD.has(appType)) {
    // UNI EN 16282: Q = perimetro_esposto × Δh × v × 3600
    // Assume cappa a parete → 3 lati esposti: fronte + 2 lati
    const perimetro = wM + 2 * dM; // m (parete sul lato lungo)
    return Math.round(perimetro * CAPPA_DH * v * 3600);
  }

  // Opening area method
  const area = wM * dM; // m²
  return Math.round(area * v * 3600);
}

/* Simplified pressure drop estimate based on typical installation */
function calcPrevalenzaSimplified(portata: number): number {
  // Typical duct: 3m length, Ø from portata, 1 curva 90°, no filter
  const portataMs = portata / 3600;
  const vTarget = 8; // m/s target
  const ductArea = portataMs / vTarget;
  const ductD = Math.sqrt(4 * ductArea / Math.PI); // m
  const rho = 1.2;
  const pDyn = 0.5 * rho * vTarget * vTarget; // ~38 Pa

  // Friction: λ·L/D · pDyn, λ≈0.02, L≈3m
  const friction = 0.02 * (3 / Math.max(ductD, 0.1)) * pDyn;
  // 1 curva 90° ξ=1.1
  const bends = 1.1 * pDyn;
  // Uscita ξ=1.0
  const exit = 1.0 * pDyn;

  return Math.round(friction + bends + exit);
}

/* Recommended model mapping by airflow range */
function getRecommendedModel(portata: number, appType: string): { name: string; href: string } {
  if (appType === "forno-legna") {
    if (portata <= 2000) return { name: "ZPZ", href: "/modelli/zpz" };
    if (portata <= 4000) return { name: "ZPZ MAX", href: "/modelli/zpz-max" };
    return { name: "ZPZ Nuvola L", href: "/modelli/zpz-nuvola-l" };
  }
  if (appType === "cappa-cucina") {
    if (portata <= 1500) return { name: "ZCM", href: "/modelli/zcm" };
    if (portata <= 3000) return { name: "ZCL", href: "/modelli/zcl" };
    return { name: "ZCL MAX", href: "/modelli/zcl-max" };
  }
  if (appType === "caldaia-biomassa") {
    if (portata <= 1500) return { name: "ZCL", href: "/modelli/zcl" };
    return { name: "ZCL MAX", href: "/modelli/zcl-max" };
  }
  if (appType === "camino") {
    if (portata <= 1200) return { name: "ZCM", href: "/modelli/zcm" };
    return { name: "ZCL", href: "/modelli/zcl" };
  }
  if (appType === "braciere") {
    if (portata <= 2000) return { name: "ZBR S", href: "/modelli/zbr-s" };
    return { name: "ZBR MAX", href: "/modelli/zbr-max" };
  }
  if (appType === "forno-industriale") {
    if (portata <= 3000) return { name: "ZTGL", href: "/modelli/ztgl" };
    if (portata <= 6000) return { name: "ZTGL MAX", href: "/modelli/ztgl-max" };
    return { name: "ZTGL MAX Ultra", href: "/modelli/ztgl-max-ultra" };
  }
  if (appType === "affumicatore") {
    if (portata <= 1500) return { name: "ZAF", href: "/modelli/zaf" };
    return { name: "ZAF MAX", href: "/modelli/zaf-max" };
  }
  if (appType === "torrefazione") {
    if (portata <= 2000) return { name: "ZTRF", href: "/modelli/ztrf" };
    if (portata <= 4000) return { name: "ZTRF MAX", href: "/modelli/ztrf-max" };
    return { name: "ZTRF MAX Desk", href: "/modelli/ztrf-max-desk" };
  }
  if (portata <= 2000) return { name: "Destink", href: "/modelli/destink" };
  if (portata <= 4000) return { name: "Destink MAX", href: "/modelli/destink-max" };
  return { name: "Destink Ultra MAX", href: "/modelli/destink-ultra-max" };
}

/* ───────── SIMPLIFIED CALCULATION ───────── */
function calcSimplified(inputs: SimplifiedInputs): CalcResult | null {
  const wCm = clamp(parseFloat(inputs.width) || 0, 0, 1000);   // max 10m
  const dCm = clamp(parseFloat(inputs.depth) || 0, 0, 1000);
  const hCm = clamp(parseFloat(inputs.height) || 0, 0, 500);
  const wM = wCm / 100;
  const dM = dCm / 100;
  const hM = hCm / 100;
  if (!wM || !dM || !inputs.applicationType) return null;

  const portata = calcPortata(inputs.applicationType, wM, dM, hM);
  const prevalenza = calcPrevalenzaSimplified(portata);

  // Chimney diameter from target velocity 7-8 m/s
  const vTarget = 8;
  const portataMs = portata / 3600;
  const areaSezione = portataMs / vTarget;
  const diametro = Math.round(Math.sqrt(4 * areaSezione / Math.PI) * 1000);
  // Round to nearest standard size (100, 120, 150, 180, 200, 250, 300, 350, 400, 450, 500)
  const stdSizes = [100, 120, 150, 180, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800];
  const diametroStd = stdSizes.find(s => s >= diametro) || diametro;

  const model = getRecommendedModel(portata, inputs.applicationType);

  return {
    portata,
    prevalenza,
    diametroCanna: diametroStd,
    velocita: Math.round((portataMs / (Math.PI * Math.pow(diametroStd / 2000, 2))) * 10) / 10,
    modelloConsigliato: model.name,
    modelloHref: model.href,
  };
}

/* ───────── ADVANCED CALCULATION (UNI EN 16282) ───────── */
function calcAdvanced(inputs: AdvancedInputs): CalcResult | null {
  const wCm = clamp(parseFloat(inputs.width) || 0, 0, 1000);
  const dCm = clamp(parseFloat(inputs.depth) || 0, 0, 1000);
  const hCm = clamp(parseFloat(inputs.height) || 0, 0, 500);
  const wM = wCm / 100;
  const dM = dCm / 100;
  const hM = hCm / 100;
  if (!wM || !dM || !inputs.applicationType) return null;

  const ambientTemp = parseFloat(inputs.ambientTemp) || 20;
  const exhaustTemp = parseFloat(inputs.exhaustTemp) || 200;
  const altitude = parseFloat(inputs.altitude) || 0;
  const ductLength = parseFloat(inputs.ductLength) || 3;
  const ductDiameter = parseFloat(inputs.ductDiameter) || 250;
  const bends90 = parseInt(inputs.numBends90) || 0;
  const bends45 = parseInt(inputs.numBends45) || 0;
  const chimneyH = parseFloat(inputs.chimneyHeight) || 5;

  // Base portata from application method
  let portata = calcPortata(inputs.applicationType, wM, dM, hM);

  // Temperature correction factor (UNI EN 16282)
  const tempFactor = (exhaustTemp + 273) / (ambientTemp + 273);
  
  // Altitude correction (air density decreases ~12% per 1000m)
  const altFactor = 1 + altitude * 0.00012;
  
  portata = Math.round(portata * Math.sqrt(tempFactor) * altFactor);
  const portataMs = portata / 3600;

  // Duct velocity
  const ductAreaM2 = Math.PI * Math.pow(ductDiameter / 2000, 2);
  const velocita = portataMs / ductAreaM2;

  // Corrected air density
  const rhoAmb = 1.225 * (1 - altitude * 0.0001); // approx
  const rho = rhoAmb / tempFactor;
  const pDyn = 0.5 * rho * velocita * velocita;

  // Pressure loss: Darcy-Weisbach
  const lambda = 0.02; // galvanized steel
  const straightLoss = lambda * (ductLength / (ductDiameter / 1000)) * pDyn;
  
  // Bend losses (ξ = 1.1 for 90°, 0.5 for 45°)
  const bendLoss = (bends90 * 1.1 + bends45 * 0.5) * pDyn;
  
  // Exit loss ξ=1.0
  const exitLoss = 1.0 * pDyn;
  
  // Filter loss (Pa)
  const filterLosses: Record<string, number> = {
    nessuno: 0,
    ciclone: 150,
    elettrostatico: 250,
    tessuto: 400,
  };
  const filterLoss = filterLosses[inputs.filterType] || 0;

  // Chimney natural draft (negative = helps)
  const chimneyDraft = chimneyH * 9.81 * (rhoAmb - rho);

  const prevalenza = Math.round(Math.max(straightLoss + bendLoss + exitLoss + filterLoss - chimneyDraft, 30));

  // Recommended chimney diameter (target 8 m/s)
  const vTarget = 8;
  const idealArea = portataMs / vTarget;
  const diametroCanna = Math.round(Math.sqrt(4 * idealArea / Math.PI) * 1000);
  const stdSizes = [100, 120, 150, 180, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800];
  const diametroStd = stdSizes.find(s => s >= diametroCanna) || diametroCanna;

  const model = getRecommendedModel(portata, inputs.applicationType);

  return {
    portata,
    prevalenza,
    diametroCanna: diametroStd,
    velocita: Math.round(velocita * 10) / 10,
    modelloConsigliato: model.name,
    modelloHref: model.href,
  };
}

/* ───────── RESULTS CARD ───────── */
const ResultsCard = ({ result }: { result: CalcResult }) => (
  <Card className="border-primary/30 bg-primary/5">
    <CardHeader className="pb-4">
      <CardTitle className="text-xl flex items-center gap-2">
        <Wind className="w-5 h-5 text-primary" />
        Risultati orientativi
      </CardTitle>
      <CardDescription>
        Valori indicativi — per un dimensionamento preciso contattaci
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-background rounded-lg p-4 text-center border">
          <p className="text-sm text-muted-foreground mb-1">Portata</p>
          <p className="text-2xl font-bold text-foreground">{result.portata.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">m³/h</p>
        </div>
        <div className="bg-background rounded-lg p-4 text-center border">
          <p className="text-sm text-muted-foreground mb-1">Prevalenza</p>
          <p className="text-2xl font-bold text-foreground">{result.prevalenza}</p>
          <p className="text-xs text-muted-foreground">Pa</p>
        </div>
        <div className="bg-background rounded-lg p-4 text-center border">
          <p className="text-sm text-muted-foreground mb-1">Ø Canna fumaria</p>
          <p className="text-2xl font-bold text-foreground">{result.diametroCanna}</p>
          <p className="text-xs text-muted-foreground">mm</p>
        </div>
        <div className="bg-background rounded-lg p-4 text-center border">
          <p className="text-sm text-muted-foreground mb-1">Velocità fumi</p>
          <p className="text-2xl font-bold text-foreground">{result.velocita}</p>
          <p className="text-xs text-muted-foreground">m/s</p>
        </div>
      </div>

      <div className="bg-primary/10 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Modello ZAPPER® consigliato</p>
          <p className="text-xl font-bold text-foreground">{result.modelloConsigliato}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="accent" asChild>
            <Link to={result.modelloHref}>
              Scopri {result.modelloConsigliato}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contatti">Richiedi consulenza</Link>
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 flex items-start gap-1">
        <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
        I risultati sono puramente orientativi. Per un dimensionamento conforme alla UNI EN 16282, contatta il nostro ufficio tecnico.
      </p>
    </CardContent>
  </Card>
);

/* ───────── PAGE COMPONENT ───────── */
const Calcolatore = () => {
  const [simplified, setSimplified] = useState<SimplifiedInputs>({
    applicationType: "",
    width: "",
    depth: "",
    height: "",
    fuelType: "legna",
  });

  const [advanced, setAdvanced] = useState<AdvancedInputs>({
    applicationType: "",
    width: "",
    depth: "",
    height: "",
    fuelType: "legna",
    ambientTemp: "20",
    exhaustTemp: "200",
    altitude: "0",
    ductLength: "3",
    ductDiameter: "250",
    numBends90: "1",
    numBends45: "0",
    filterType: "nessuno",
    chimneyHeight: "5",
  });

  const [showSimplifiedResult, setShowSimplifiedResult] = useState(false);
  const [showAdvancedResult, setShowAdvancedResult] = useState(false);

  const simplifiedResult = useMemo(() => showSimplifiedResult ? calcSimplified(simplified) : null, [simplified, showSimplifiedResult]);
  const advancedResult = useMemo(() => showAdvancedResult ? calcAdvanced(advanced) : null, [advanced, showAdvancedResult]);

  const updateSimplified = (key: keyof SimplifiedInputs, value: string) => {
    setSimplified(prev => ({ ...prev, [key]: value }));
    setShowSimplifiedResult(false);
  };

  const updateAdvanced = (key: keyof AdvancedInputs, value: string) => {
    setAdvanced(prev => ({ ...prev, [key]: value }));
    setShowAdvancedResult(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="bg-muted/50 py-12 md:py-20">
          <div className="container px-4 sm:px-6 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              Strumento di calcolo
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 break-words">
              Calcolatore portata & prevalenza
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calcola i dati orientativi di portata, prevalenza e diametro canna fumaria per il tuo impianto. Modalità semplificata per dati rapidi o avanzata secondo la UNI EN 16282.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 md:py-16">
          <div className="container px-4 sm:px-6 max-w-4xl mx-auto">
            <Tabs defaultValue="semplificato" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-8">
                <TabsTrigger value="semplificato" className="text-sm md:text-base">
                  <Flame className="w-4 h-4 mr-2" />
                  Semplificato
                </TabsTrigger>
                <TabsTrigger value="avanzato" className="text-sm md:text-base">
                  <Ruler className="w-4 h-4 mr-2" />
                  Avanzato (UNI EN 16282)
                </TabsTrigger>
              </TabsList>

              {/* ─── SEMPLIFICATO ─── */}
              <TabsContent value="semplificato">
                <Card>
                  <CardHeader>
                    <CardTitle>Calcolo semplificato</CardTitle>
                    <CardDescription>
                      Inserisci i dati principali per ottenere valori orientativi di portata e prevalenza.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tipo di applicazione *</Label>
                        <Select value={simplified.applicationType} onValueChange={v => updateSimplified("applicationType", v)}>
                          <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                          <SelectContent>
                            {APPLICATION_TYPES.map(t => (
                              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Combustibile</Label>
                        <Select value={simplified.fuelType} onValueChange={v => updateSimplified("fuelType", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {FUEL_TYPES.map(t => (
                              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Larghezza (cm) *</Label>
                        <Input type="number" placeholder="es. 120" value={simplified.width} onChange={e => updateSimplified("width", e.target.value)} min="1" max="5000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Profondità (cm) *</Label>
                        <Input type="number" placeholder="es. 120" value={simplified.depth} onChange={e => updateSimplified("depth", e.target.value)} min="1" max="5000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Altezza bocca (cm)</Label>
                        <Input type="number" placeholder="es. 40" value={simplified.height} onChange={e => updateSimplified("height", e.target.value)} min="1" max="5000" />
                      </div>
                    </div>

                    <Button
                      variant="accent"
                      size="lg"
                      className="w-full sm:w-auto"
                      onClick={() => setShowSimplifiedResult(true)}
                      disabled={!simplified.applicationType || !simplified.width || !simplified.depth}
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Calcola
                    </Button>

                    {simplifiedResult && <ResultsCard result={simplifiedResult} />}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ─── AVANZATO ─── */}
              <TabsContent value="avanzato">
                <Card>
                  <CardHeader>
                    <CardTitle>Calcolo avanzato — UNI EN 16282</CardTitle>
                    <CardDescription>
                      Per tecnici e progettisti. Parametri completi per portata, prevalenza e dimensionamento condotto.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Applicazione */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Applicazione</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Tipo di applicazione *</Label>
                          <Select value={advanced.applicationType} onValueChange={v => updateAdvanced("applicationType", v)}>
                            <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                            <SelectContent>
                              {APPLICATION_TYPES.map(t => (
                                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Combustibile</Label>
                          <Select value={advanced.fuelType} onValueChange={v => updateAdvanced("fuelType", v)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {FUEL_TYPES.map(t => (
                                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Dimensioni */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Dimensioni apparecchio</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Larghezza (cm) *</Label>
                          <Input type="number" placeholder="es. 120" value={advanced.width} onChange={e => updateAdvanced("width", e.target.value)} min="1" max="5000" />
                        </div>
                        <div className="space-y-2">
                          <Label>Profondità (cm) *</Label>
                          <Input type="number" placeholder="es. 120" value={advanced.depth} onChange={e => updateAdvanced("depth", e.target.value)} min="1" max="5000" />
                        </div>
                        <div className="space-y-2">
                          <Label>Altezza bocca (cm)</Label>
                          <Input type="number" placeholder="es. 40" value={advanced.height} onChange={e => updateAdvanced("height", e.target.value)} min="1" max="5000" />
                        </div>
                      </div>
                    </div>

                    {/* Condizioni ambientali */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Condizioni ambientali</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Temperatura ambiente (°C)</Label>
                          <Input type="number" value={advanced.ambientTemp} onChange={e => updateAdvanced("ambientTemp", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Temperatura fumi (°C)</Label>
                          <Input type="number" value={advanced.exhaustTemp} onChange={e => updateAdvanced("exhaustTemp", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Altitudine (m s.l.m.)</Label>
                          <Input type="number" value={advanced.altitude} onChange={e => updateAdvanced("altitude", e.target.value)} />
                        </div>
                      </div>
                    </div>

                    {/* Condotto */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Condotto e canna fumaria</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Lunghezza condotto (m)</Label>
                          <Input type="number" value={advanced.ductLength} onChange={e => updateAdvanced("ductLength", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Diametro condotto (mm)</Label>
                          <Input type="number" value={advanced.ductDiameter} onChange={e => updateAdvanced("ductDiameter", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Altezza canna fumaria (m)</Label>
                          <Input type="number" value={advanced.chimneyHeight} onChange={e => updateAdvanced("chimneyHeight", e.target.value)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label>Curve a 90°</Label>
                          <Input type="number" value={advanced.numBends90} onChange={e => updateAdvanced("numBends90", e.target.value)} min="0" />
                        </div>
                        <div className="space-y-2">
                          <Label>Curve a 45°</Label>
                          <Input type="number" value={advanced.numBends45} onChange={e => updateAdvanced("numBends45", e.target.value)} min="0" />
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo di filtro</Label>
                          <Select value={advanced.filterType} onValueChange={v => updateAdvanced("filterType", v)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {FILTER_TYPES.map(t => (
                                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="accent"
                      size="lg"
                      className="w-full sm:w-auto"
                      onClick={() => setShowAdvancedResult(true)}
                      disabled={!advanced.applicationType || !advanced.width || !advanced.depth}
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Calcola (UNI EN 16282)
                    </Button>

                    {advancedResult && <ResultsCard result={advancedResult} />}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 sm:px-6 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Hai bisogno di un dimensionamento preciso?
            </h2>
            <p className="text-muted-foreground mb-6">
              Il nostro ufficio tecnico può fornirti un calcolo dettagliato conforme alla UNI EN 16282, con sopralluogo e relazione tecnica.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti">
                Richiedi valutazione tecnica gratuita
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Calcolatore;
