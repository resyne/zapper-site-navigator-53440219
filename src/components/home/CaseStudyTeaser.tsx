import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";

const CaseStudyTeaser = () => {
  const caseStudy = {
    name: "Pizzeria da Mario",
    location: "Milano, Centro",
    sector: "Professionale",
    application: "Forno a legna",
    model: "ZAPPER M",
    quote: "Dopo l'installazione di ZAPPER, le lamentele dei vicini sono scomparse completamente. Ora possiamo lavorare in tranquillità e concentrarci sulla qualità delle nostre pizze.",
    author: "Mario Rossi",
    role: "Titolare",
    results: [
      { label: "Riduzione fumi", value: "95%" },
      { label: "Tempo installazione", value: "4 ore" },
      { label: "Segnalazioni dopo", value: "0" },
    ],
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              Case study
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {caseStudy.name}
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {caseStudy.sector}
              </span>
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                {caseStudy.application}
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                {caseStudy.model}
              </span>
            </div>

            {/* Quote */}
            <div className="relative bg-muted/50 rounded-xl p-6 mb-8">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-accent/30" />
              <p className="text-lg text-foreground italic pl-8">
                "{caseStudy.quote}"
              </p>
              <div className="mt-4 pl-8">
                <p className="font-semibold text-foreground">{caseStudy.author}</p>
                <p className="text-sm text-muted-foreground">{caseStudy.role}</p>
              </div>
            </div>

            <Button variant="outline" asChild>
              <Link to="/interventi">
                Vedi tutti gli interventi
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Results Card */}
          <div className="bg-primary rounded-2xl p-8 md:p-10">
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-8">
              I risultati
            </h3>
            <div className="space-y-6">
              {caseStudy.results.map((result) => (
                <div key={result.label} className="flex items-center justify-between border-b border-primary-foreground/10 pb-4">
                  <span className="text-primary-foreground/70">{result.label}</span>
                  <span className="font-display text-3xl font-bold text-accent">{result.value}</span>
                </div>
              ))}
            </div>

            {/* Before/After placeholder */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="aspect-video bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                <span className="text-sm text-primary-foreground/50">Prima</span>
              </div>
              <div className="aspect-video bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                <span className="text-sm text-primary-foreground/50">Dopo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyTeaser;
