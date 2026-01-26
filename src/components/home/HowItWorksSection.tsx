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
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Come funziona
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tecnologia semplice,{" "}
            <span className="text-primary">risultati straordinari</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            ZAPPER utilizza un processo in tre fasi per garantire aria pulita 
            e conformità normativa senza compromessi.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative animate-fade-in-up animation-delay-${(index + 1) * 100}`}
              >
                {/* Card */}
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zapper-black mb-6 relative">
                    <step.icon className="w-8 h-8 text-white" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Bar */}
        <div className="mt-12 md:mt-16 p-6 md:p-8 bg-zapper-black rounded-2xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Installazione in 1 giorno",
              "Manutenzione minima",
              "Garanzia 5 anni",
              "Assistenza 24/7",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
