import { Flame, Wind, Sparkles, Check } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: Flame,
      title: "Cattura",
      description: "I fumi vengono aspirati direttamente dalla fonte, prima che possano disperdersi nell'ambiente.",
    },
    {
      number: "02",
      icon: Wind,
      title: "Filtraggio",
      description: "Un sistema di filtri a più stadi trattiene particelle, grassi e odori con efficienza del 95%.",
    },
    {
      number: "03",
      icon: Sparkles,
      title: "Emissione pulita",
      description: "L'aria purificata viene rilasciata nell'atmosfera, rispettando tutte le normative vigenti.",
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <span className="inline-block text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
            Come funziona
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-2">
            Tecnologia semplice,{" "}
            <span className="text-primary">risultati straordinari</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
            ZAPPER utilizza un processo in tre fasi per garantire aria pulita 
            e conformità normativa senza compromessi.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3 md:gap-12 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative animate-fade-in-up animation-delay-${(index + 1) * 100}`}
              >
                {/* Card */}
                <div className="bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zapper-black mb-4 sm:mb-6 relative">
                    <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Bar */}
        <div className="mt-10 md:mt-16 p-4 sm:p-6 md:p-8 bg-zapper-black rounded-xl sm:rounded-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              "Installazione in 1 giorno",
              "Manutenzione minima",
              "Garanzia 5 anni",
              "Assistenza 24/7",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-white text-xs sm:text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
