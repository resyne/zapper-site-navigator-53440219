import { ArrowRight, BadgePercent, Factory, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const IncentivesCarousel = () => {
  const incentives = [
    {
      id: "industria40",
      icon: Factory,
      badge: "2026-2028",
      title: "Industria 4.0",
      highlight: "180%",
      subtitle: "Iperammortamento",
      description:
        "I sistemi ZAPPER® rientrano tra i beni strumentali 4.0. Puoi beneficiare dell'iperammortamento al 180% sull'investimento.",
    },
    {
      id: "inail-isi",
      icon: ShieldCheck,
      badge: "Bando 2026",
      title: "INAIL ISI",
      highlight: "65%",
      subtitle: "Fondo perduto",
      description:
        "Il Bando INAIL ISI finanzia interventi per la sicurezza sul lavoro. I sistemi ZAPPER® sono ammissibili al contributo a fondo perduto.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <BadgePercent className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Agevolazioni attive</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Investi con gli incentivi fiscali
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I sistemi ZAPPER® rientrano nei bandi e nelle agevolazioni nazionali per l'industria e la sicurezza.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {incentives.map((incentive) => (
                <CarouselItem key={incentive.id} className="md:basis-1/2">
                  <div className="h-full p-1">
                    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                      {/* Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
                          {incentive.badge}
                        </span>
                        <incentive.icon className="w-6 h-6 text-muted-foreground" />
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {incentive.title}
                      </h3>

                      {/* Highlight Number */}
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-4xl md:text-5xl font-bold text-primary">
                          {incentive.highlight}
                        </span>
                      </div>
                      <p className="text-lg font-medium text-foreground mb-4">
                        {incentive.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-muted-foreground flex-grow mb-6">
                        {incentive.description}
                      </p>

                      {/* CTA */}
                      <Button variant="outline" className="w-full group" asChild>
                        <Link to="/contatti">
                          Richiedi info
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* Micro CTA */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            Hai bisogno di supporto per la pratica?{" "}
            <Link to="/contatti" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 transition-colors">
              Contattaci
              <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default IncentivesCarousel;
