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
      color: "bg-zapper-black",
    },
    {
      id: "domestico",
      title: "Domestico",
      subtitle: "Case, appartamenti, ville",
      description: "Soluzioni per camini, stufe e barbecue domestici. Addio lamentele dei vicini.",
      icon: Home,
      href: "/settori/domestico",
      features: ["Camini", "Stufe a pellet", "Barbecue", "Forni da giardino"],
      color: "bg-zapper-beige",
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
    <section className="py-12 md:py-24 bg-background">
      <div className="container px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <span className="inline-block text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
            Dove si usa uno ZAPPER
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-2">
            Una soluzione per ogni esigenza
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
            Che tu gestisca una pizzeria, abbia un camino in casa o lavori nell'industria alimentare, 
            ZAPPER® ha la soluzione giusta per te.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {sectors.map((sector, index) => (
            <div
              key={sector.id}
              className={`group relative bg-card rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-${(index + 1) * 100}`}
            >
              {/* Card Header */}
              <div className={`${sector.color} p-5 sm:p-6 md:p-8`}>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 ${sector.id === 'domestico' ? 'bg-zapper-black/20' : 'bg-white/20'} rounded-lg sm:rounded-xl flex items-center justify-center`}>
                    <sector.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${sector.id === 'domestico' ? 'text-zapper-black' : 'text-white'}`} />
                  </div>
                  <ArrowRight className={`w-5 h-5 sm:w-6 sm:h-6 ${sector.id === 'domestico' ? 'text-zapper-black/50 group-hover:text-zapper-black' : 'text-white/50 group-hover:text-white'} group-hover:translate-x-1 transition-all duration-300`} />
                </div>
                <h3 className={`font-display text-xl sm:text-2xl font-bold ${sector.id === 'domestico' ? 'text-zapper-black' : 'text-white'} mb-1`}>
                  {sector.title}
                </h3>
                <p className={`${sector.id === 'domestico' ? 'text-zapper-black/70' : 'text-white/70'} text-xs sm:text-sm`}>
                  {sector.subtitle}
                </p>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 md:p-8">
                <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
                  {sector.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {sector.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2.5 py-1 sm:px-3 bg-muted rounded-full text-xs sm:text-sm text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button variant="sector-card" className="w-full sm:w-auto" asChild>
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
