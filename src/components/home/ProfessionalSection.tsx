import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, Flame, CookingPot, Croissant } from "lucide-react";
import professionalMachine from "@/assets/professional-machine.jpg";
import vincenzoCapuano from "@/assets/clients/vincenzo-capuano.png";
import daMichele from "@/assets/clients/da-michele.png";
import laBaita from "@/assets/clients/la-baita.png";
import daAlfonso from "@/assets/clients/da-alfonso.png";
import pummarolaNcoppa from "@/assets/clients/pummarola-ncoppa.png";
import rossopomodoro from "@/assets/clients/rossopomodoro.png";

const ProfessionalSection = () => {
  const applications = [
    { label: "Pizzerie", icon: Flame },
    { label: "Panifici", icon: Croissant },
    { label: "Bracerie", icon: Flame },
    { label: "Cucine professionali", icon: CookingPot },
  ];

  const proClients = [
    { name: "Vincenzo Capuano", logo: vincenzoCapuano },
    { name: "Da Michele", logo: daMichele },
    { name: "La Baita Ibiza", logo: laBaita },
    { name: "Da Alfonso", logo: daAlfonso },
    { name: "Pummarola 'Ncoppa", logo: pummarolaNcoppa },
    { name: "Rossopomodoro", logo: rossopomodoro },
  ];

  return (
    <section className="py-16 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl" />
              <img
                src={professionalMachine}
                alt="Macchina ZAPPER professionale in acciaio inox per ristorazione"
                className="relative w-full h-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-foreground/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="text-white text-xs sm:text-sm font-medium">
                  🇮🇹 Produzione in serie — Massimo rapporto qualità/prezzo
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary" />
              </div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Settore Professionale
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
              Macchine in serie,{" "}
              <span className="text-primary">standardizzate per ogni esigenza</span>
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg mb-6 leading-relaxed">
              Realizziamo macchine in serie per ottimizzare al meglio il rapporto qualità-prezzo. 
              Ogni modello è standardizzato in base alla portata e alla tipologia di fumi da abbattere: 
              dalla pizzeria al panificio, dalla braceria alla cucina professionale.
            </p>

            {/* Applications Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {applications.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl shadow-sm"
                >
                  <item.icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="default" size="lg" asChild>
                <Link to="/settori/professionale">
                  Scopri le soluzioni professionali
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/modelli">Vedi tutti i modelli</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Social Proof */}
        <div className="mt-14">
          <p className="text-center text-muted-foreground text-xs uppercase tracking-wider mb-6">
            Scelti da ristoranti e attività di riferimento
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {proClients.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-center w-24 h-16 sm:w-28 sm:h-20 opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSection;
