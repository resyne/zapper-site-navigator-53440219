import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Home, Factory, ArrowRight, ArrowLeft, Flame, Wind, Loader2, CheckCircle } from "lucide-react";

type Step = "sector" | "application" | "result";

interface Option {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

const SelfDiscoverySection = () => {
  const [currentStep, setCurrentStep] = useState<Step>("sector");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [selectedApplication, setSelectedApplication] = useState<string>("");

  const sectors: Option[] = [
    { id: "professionale", label: "Professionale", icon: ChefHat, description: "Ristoranti, pizzerie, bracerie" },
    { id: "domestico", label: "Domestico", icon: Home, description: "Case, ville, appartamenti" },
    { id: "industriale", label: "Industriale", icon: Factory, description: "Stabilimenti, produzioni" },
  ];

  const applicationsBySection: Record<string, Option[]> = {
    professionale: [
      { id: "forno-legna", label: "Forno a legna", description: "Pizzerie e panifici" },
      { id: "brace-carbone", label: "Brace/Carbone", description: "Bracerie e grill" },
      { id: "cappa-cucina", label: "Cappa cucina", description: "Cucine professionali" },
      { id: "forno-gas", label: "Forno a gas", description: "Ristoranti" },
    ],
    domestico: [
      { id: "camino", label: "Camino", description: "Camini aperti o chiusi" },
      { id: "stufa-pellet", label: "Stufa a pellet", description: "Riscaldamento" },
      { id: "barbecue", label: "Barbecue", description: "Uso esterno" },
      { id: "forno-giardino", label: "Forno da giardino", description: "Pizza e pane" },
    ],
    industriale: [
      { id: "torrefazione", label: "Torrefazione", description: "Caffè e cacao" },
      { id: "affumicatore", label: "Affumicatore", description: "Salumi e formaggi" },
      { id: "caldaia-biomassa", label: "Caldaia biomassa", description: "Riscaldamento" },
      { id: "forno-industriale", label: "Forno industriale", description: "Produzioni" },
    ],
  };

  const recommendations: Record<string, string[]> = {
    "forno-legna": ["ZAPPER M", "ZAPPER L"],
    "brace-carbone": ["ZAPPER S", "ZAPPER M"],
    "cappa-cucina": ["ZAPPER M", "ZAPPER L"],
    "forno-gas": ["ZAPPER S", "ZAPPER M"],
    camino: ["ZAPPER S"],
    "stufa-pellet": ["ZAPPER S"],
    barbecue: ["ZAPPER S"],
    "forno-giardino": ["ZAPPER S", "ZAPPER M"],
    torrefazione: ["ZAPPER L"],
    affumicatore: ["ZAPPER M", "ZAPPER L"],
    "caldaia-biomassa": ["ZAPPER L"],
    "forno-industriale": ["ZAPPER L"],
  };

  const handleSectorSelect = (sectorId: string) => {
    setSelectedSector(sectorId);
    setCurrentStep("application");
  };

  const handleApplicationSelect = (appId: string) => {
    setSelectedApplication(appId);
    setCurrentStep("result");
  };

  const handleBack = () => {
    if (currentStep === "application") {
      setCurrentStep("sector");
      setSelectedApplication("");
    } else if (currentStep === "result") {
      setCurrentStep("application");
    }
  };

  const handleReset = () => {
    setCurrentStep("sector");
    setSelectedSector("");
    setSelectedApplication("");
  };

  const getRecommendedModels = () => {
    return recommendations[selectedApplication] || ["ZAPPER M"];
  };

  return (
    <section className="py-12 md:py-24 bg-muted/50">
      <div className="container px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Trova il tuo ZAPPER®
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-2">
              Qual è la soluzione giusta per te?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Rispondi a 2 semplici domande e ti consiglieremo il modello ideale.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-10">
            {["sector", "application", "result"].map((step, index) => (
              <div key={step} className="flex items-center gap-2 sm:gap-4">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-colors ${
                    currentStep === step || 
                    (step === "sector" && currentStep !== "sector") ||
                    (step === "application" && currentStep === "result")
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className={`w-8 sm:w-12 md:w-20 h-1 rounded ${
                    (step === "sector" && currentStep !== "sector") ||
                    (step === "application" && currentStep === "result")
                      ? "bg-primary"
                      : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Wizard Card */}
          <div className="bg-card rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-10 border border-border">
            {/* Step 1: Sector Selection */}
            {currentStep === "sector" && (
              <div className="animate-fade-in">
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 sm:mb-8">
                  In quale settore operi?
                </h3>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
                  {sectors.map((sector) => (
                    <button
                      key={sector.id}
                      onClick={() => handleSectorSelect(sector.id)}
                      className="group p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left"
                    >
                      {sector.icon && (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                          <sector.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                      )}
                      <h4 className="font-display font-bold text-base sm:text-lg mb-0.5 sm:mb-1">{sector.label}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{sector.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Application Selection */}
            {currentStep === "application" && selectedSector && (
              <div className="animate-fade-in">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Indietro</span>
                </button>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 sm:mb-8">
                  Che tipo di impianto hai?
                </h3>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  {applicationsBySection[selectedSector]?.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleApplicationSelect(app.id)}
                      className="group p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left"
                    >
                      <h4 className="font-display font-bold text-base sm:text-lg mb-0.5 sm:mb-1">{app.label}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{app.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {currentStep === "result" && (
              <div className="animate-fade-in">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Indietro</span>
                </button>
                
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-2">
                    Ecco i modelli consigliati
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    In base alle tue risposte, ti consigliamo:
                  </p>
                </div>

                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 mb-6 sm:mb-8">
                  {getRecommendedModels().map((model, index) => (
                    <div
                      key={model}
                      className={`p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 ${
                        index === 0 ? "border-accent bg-accent/5" : "border-border"
                      }`}
                    >
                      {index === 0 && (
                        <span className="text-xs font-bold text-accent uppercase mb-1 sm:mb-2 block">
                          Consigliato
                        </span>
                      )}
                      <h4 className="font-display text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{model}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Ideale per il tuo tipo di impianto e settore.
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <Button variant="accent" size="lg" className="w-full" asChild>
                    <Link to="/contatti">
                      Richiedi una valutazione tecnica
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Link>
                  </Button>
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">
                    Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER® più adatta.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfDiscoverySection;
