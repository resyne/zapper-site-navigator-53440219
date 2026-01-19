import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Home, Factory, ArrowRight } from "lucide-react";

const SectorsSection = () => {
  const sectors = [
    {
      id: "professionale",
      title: "Professionale",
      subtitle: "Ristoranti, pizzerie, bracerie",
      description: "Sistemi per cucine professionali che devono rispettare le normative e garantire un ambiente di lavoro sano.",
      icon: ChefHat,
      href: "/settori/professionale",
      features: ["Pizzerie", "Panifici", "Bracerie", "Cucine professionali"],
      color: "bg-primary",
    },
    {
      id: "domestico",
      title: "Domestico",
      subtitle: "Case, appartamenti, ville",
      description: "Soluzioni per camini, stufe e barbecue domestici. Addio lamentele dei vicini.",
      icon: Home,
      href: "/settori/domestico",
      features: ["Camini", "Stufe a pellet", "Barbecue", "Forni da giardino"],
      color: "bg-zapper-blue-light",
    },
    {
      id: "industriale",
      title: "Industriale",
      subtitle: "Stabilimenti e produzioni",
      description: "Impianti ad alta capacità per industrie alimentari, torrefazioni e processi produttivi.",
      icon: Factory,
      href: "/settori/industriale",
      features: ["Torrefazioni", "Caseifici", "Affumicatori", "Forni industriali"],
      color: "bg-zapper-gray",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Dove si usa uno ZAPPER
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Una soluzione per ogni esigenza
          </h2>
          <p className="text-lg text-muted-foreground">
            Che tu gestisca una pizzeria, abbia un camino in casa o lavori nell'industria alimentare, 
            ZAPPER ha la soluzione giusta per te.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sectors.map((sector, index) => (
            <div
              key={sector.id}
              className={`group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-${(index + 1) * 100}`}
            >
              {/* Card Header */}
              <div className={`${sector.color} p-6 md:p-8`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                    <sector.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-primary-foreground/50 group-hover:text-primary-foreground group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary-foreground mb-1">
                  {sector.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm">
                  {sector.subtitle}
                </p>
              </div>

              {/* Card Content */}
              <div className="p-6 md:p-8">
                <p className="text-muted-foreground mb-6">
                  {sector.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {sector.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button variant="sector-card" asChild>
                  <Link to={sector.href}>
                    Scopri le soluzioni
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsSection;
