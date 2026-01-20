import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Factory,
  Coffee,
  Milk,
  Flame,
  Warehouse,
  MapPin
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Industriale = () => {
  const problemiTipici = [
    "Emissioni fuori norma e rischio sanzioni",
    "Alte portate d'aria da trattare",
    "Fumi complessi con polveri e particolato",
    "Necessità di conformità ambientale",
    "Interventi urgenti per evitare fermi produzione",
  ];

  const ambiti = [
    {
      id: "torrefazioni",
      title: "Torrefazioni",
      description: "Impianti di tostatura caffè con fumi densi e odori intensi da abbattere.",
      icon: Coffee,
      href: "/industriale/torrefazioni",
      interventi: 18,
    },
    {
      id: "caseifici",
      title: "Caseifici",
      description: "Caldaie e forni per la produzione casearia con emissioni da gestire.",
      icon: Milk,
      href: "/industriale/caseifici",
      interventi: 12,
    },
    {
      id: "affumicatori",
      title: "Affumicatori",
      description: "Sistemi di affumicatura industriale con fumi e odori caratteristici.",
      icon: Flame,
      href: "/industriale/affumicatori",
      interventi: 8,
    },
    {
      id: "forni-industriali",
      title: "Forni Industriali",
      description: "Forni di grandi dimensioni per processi produttivi industriali.",
      icon: Warehouse,
      href: "/industriale/forni-industriali",
      interventi: 22,
    },
  ];

  const applicazioniRilevanti = [
    { name: "Forni industriali", href: "/applicazioni/forni-industriali" },
    { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" },
    { name: "Sistemi affumicatura", href: "/applicazioni/affumicatori" },
  ];

  const modelliConsigliati = [
    { 
      name: "ZAPPER M", 
      descrizione: "Per impianti di media portata",
      href: "/modelli/zapper-m" 
    },
    { 
      name: "ZAPPER L", 
      descrizione: "Per alte portate e grandi impianti",
      href: "/modelli/zapper-l" 
    },
  ];

  const miniInterventi = [
    {
      titolo: "Torrefazione Premium",
      citta: "Torino",
      problema: "Emissioni fuori norma",
      risultato: "Conformità normativa raggiunta",
      modello: "ZAPPER L",
    },
    {
      titolo: "Caseificio Tradizionale",
      citta: "Parma",
      problema: "Caldaia con emissioni eccessive",
      risultato: "Riduzione emissioni del 90%",
      modello: "ZAPPER L",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-zapper-gray">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                  <Factory className="w-7 h-7 text-primary-foreground" />
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Soluzioni ZAPPER per il Settore Industriale
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80">
                Impianti industriali con alte portate e emissioni complesse: interveniamo in modo mirato 
                per garantire conformità e continuità operativa.
              </p>
            </div>
          </div>
        </section>

        {/* Problemi Tipici */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-accent" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Problemi tipici del settore
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {problemiTipici.map((problema, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-card rounded-xl shadow-sm"
                  >
                    <span className="w-6 h-6 bg-destructive/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-destructive text-sm">✕</span>
                    </span>
                    <span className="text-foreground">{problema}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ambiti */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Scegli il tuo ambito
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Ogni impianto industriale ha esigenze specifiche. Seleziona la tua tipologia per scoprire le soluzioni dedicate.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {ambiti.map((ambito, index) => (
                <Link
                  key={ambito.id}
                  to={ambito.href}
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-full bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-accent/30">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <ambito.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {ambito.title}
                        </h3>
                        <span className="text-sm text-muted-foreground">{ambito.interventi}+ interventi</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {ambito.description}
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:text-accent transition-colors">
                      <span>Scopri le soluzioni</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Applicazioni Rilevanti */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Applicazioni tecniche
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {applicazioniRilevanti.map((app) => (
                  <Link
                    key={app.name}
                    to={app.href}
                    className="px-6 py-3 bg-card rounded-full shadow-sm hover:shadow-md transition-all border border-border hover:border-primary/30 text-foreground font-medium hover:text-primary"
                  >
                    {app.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Modelli Consigliati */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Modelli consigliati per questo settore
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {modelliConsigliati.map((modello) => (
                  <Link
                    key={modello.name}
                    to={modello.href}
                    className="group block"
                  >
                    <div className="p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all border border-border hover:border-accent/30">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {modello.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">{modello.descrizione}</p>
                      <div className="flex items-center text-accent font-medium">
                        <span>Scopri il modello</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mini Interventi */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Interventi nel settore
                </h2>
                <Link 
                  to="/interventi" 
                  className="text-primary hover:text-accent font-medium flex items-center gap-1 transition-colors"
                >
                  Vedi tutti
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {miniInterventi.map((intervento, index) => (
                  <div 
                    key={index}
                    className="bg-card rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="text-sm text-muted-foreground">{intervento.citta}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-3">
                      {intervento.titolo}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-destructive">⚠</span>
                        <span className="text-muted-foreground">{intervento.problema}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-foreground font-medium">{intervento.risultato}</span>
                      </div>
                    </div>
                    <div className="mt-4 px-3 py-1.5 bg-accent/10 rounded-full inline-block">
                      <span className="text-sm font-semibold text-accent">{intervento.modello}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-zapper-gray">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Hai un impianto industriale con problemi di emissioni?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-2 max-w-2xl mx-auto">
              Richiedi una valutazione tecnica gratuita.
            </p>
            <p className="text-primary-foreground/60 text-sm mb-8 max-w-2xl mx-auto">
              Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER più adatta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/contatti">
                  Richiedi una valutazione tecnica
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/interventi">
                  Vedi gli interventi
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Industriale;
