import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Factory, Shield, Wind, Zap } from "lucide-react";
import industrialMachine from "@/assets/industrial-machine.jpg";
import barilla from "@/assets/clients/barilla.png";
import leonardo from "@/assets/clients/leonardo.png";
import modelleriaReggiana from "@/assets/clients/modelleria-reggiana.png";

const IndustrialSection = () => {
  const pollutants = [
    { label: "Polveri sottili", icon: Wind },
    { label: "NOx", icon: Zap },
    { label: "CO₂", icon: Shield },
    { label: "SOx e COV", icon: Shield },
  ];

  return (
    <section className="py-16 md:py-28 bg-zapper-black relative overflow-hidden">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-accent/20 rounded-xl flex items-center justify-center">
                <Factory className="w-5 h-5 text-accent" />
              </div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Settore Industriale
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Macchine progettate su misura per{" "}
              <span className="text-accent">alte portate</span>
            </h2>

            <p className="text-white/75 text-base sm:text-lg mb-6 leading-relaxed">
              Progettiamo e costruiamo sistemi di abbattimento personalizzati per impianti industriali 
              ad alta portata. Ogni macchina è dimensionata sulle esigenze specifiche del tuo processo 
              produttivo, intervenendo efficacemente su polveri, NO<sub>x</sub>, CO<sub>2</sub>, SO<sub>x</sub>, 
              COV e altri inquinanti specifici.
            </p>

            {/* Pollutants Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {pollutants.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl"
                >
                  <item.icon className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-white/90 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="accent" size="lg" asChild>
                <Link to="/settori/industriale">
                  Scopri le soluzioni industriali
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contatti">Richiedi un progetto su misura</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />
              <img
                src={industrialMachine}
                alt="Macchina ZAPPER industriale per abbattimento inquinanti ad alta portata"
                className="relative w-full h-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-zapper-black/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="text-white/90 text-xs sm:text-sm font-medium">
                  🇮🇹 Progettata e costruita interamente in Italia — Made in Italy
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Social Proof */}
        <div className="mt-14">
          <p className="text-center text-white/50 text-xs uppercase tracking-wider mb-6">
            Scelti da aziende leader nel settore industriale
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {[
              { name: "Barilla", logo: barilla },
              { name: "Leonardo", logo: leonardo },
              { name: "Modelleria Reggiana", logo: modelleriaReggiana },
            ].map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-center w-24 h-16 sm:w-32 sm:h-20 opacity-50 hover:opacity-90 transition-opacity duration-300"
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

export default IndustrialSection;
