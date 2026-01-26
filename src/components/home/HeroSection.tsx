import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";

const HeroSection = () => {
  const benefits = [
    "Abbattimento fino al 95% dei fumi",
    "Nessuna segnalazione dei vicini",
    "Conformità normativa garantita",
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-zapper-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10 pt-24 pb-12 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left px-4 sm:px-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 rounded-full mb-4 sm:mb-6 animate-fade-in">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-white/90 text-xs sm:text-sm font-medium">
                Tecnologia italiana certificata
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 animate-fade-in-up leading-tight">
              Fumi e odori?{" "}
              <span className="text-primary block sm:inline">Problema risolto.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-100">
              ZAPPER è il sistema di abbattimento fumi che elimina il problema alla fonte. 
              Niente più segnalazioni, niente più multe. Solo aria pulita.
            </p>

            {/* Benefits List */}
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 animate-fade-in-up animation-delay-200">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-white/90 text-sm sm:text-base">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:gap-4 animate-fade-in-up animation-delay-300">
              <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/contatti">
                  Richiedi una valutazione tecnica
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Guarda come funziona
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-white/60 mt-3 animate-fade-in-up animation-delay-300">
              Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER più adatta.
            </p>

            {/* Trust Badge */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 animate-fade-in animation-delay-400">
              <div className="flex items-center gap-4 sm:gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 border-2 border-zapper-black flex items-center justify-center text-xs font-bold text-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-primary">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm">
                    <strong className="text-white">500+</strong> clienti soddisfatti
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image - Hidden on mobile for cleaner experience */}
          <div className="relative animate-fade-in-up animation-delay-200 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl"></div>
              <img
                src={heroImage}
                alt="Sistema ZAPPER per abbattimento fumi"
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-primary">95%</span>
                  </div>
                  <div>
                    <p className="text-sm text-zapper-gray">Efficienza</p>
                    <p className="font-display font-semibold text-zapper-black">Abbattimento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
