import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wind, Factory, ChefHat, Coffee, Zap } from "lucide-react";
import utaMachine from "@/assets/uta-carbone-attivo.webp";

const UTASection = () => {
  const applications = [
    { label: "Cucine professionali", icon: ChefHat },
    { label: "Torrefazioni", icon: Coffee },
    { label: "Processi industriali", icon: Factory },
    { label: "Taglio laser", icon: Zap },
  ];

  return (
    <section className="py-16 md:py-28 bg-muted/20 relative overflow-hidden">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-accent/20 rounded-xl flex items-center justify-center">
                <Wind className="w-5 h-5 text-accent" />
              </div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                UTA a Carbone Attivo
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
              Unità di trattamento aria a{" "}
              <span className="text-accent">carbone attivo</span>
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg mb-6 leading-relaxed">
              Le nostre UTA a carbone attivo sono progettate per applicazioni standard 
              nei settori professionale e industriale. Garantiscono l'abbattimento efficace 
              di odori, COV e inquinanti gassosi attraverso filtrazione a carbone attivo 
              ad alta efficienza, in un formato modulare e facilmente integrabile.
            </p>

            {/* Applications Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {applications.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl shadow-sm"
                >
                  <item.icon className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-foreground text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="accent" size="lg" asChild>
                <Link to="/contatti">
                  Richiedi informazioni
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/modelli">Vedi tutti i modelli</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl" />
              <img
                src={utaMachine}
                alt="UTA ZAPPER a carbone attivo per trattamento aria in ambito professionale e industriale"
                className="relative w-full h-auto rounded-2xl"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-foreground/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="text-white text-xs sm:text-sm font-medium">
                  🇮🇹 Filtrazione a carbone attivo — Applicazioni standard professionali e industriali
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UTASection;
