import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Filter, MapPin, Wrench, CheckCircle } from "lucide-react";

const Interventi = () => {
  const [activeFilter, setActiveFilter] = useState({
    settore: "tutti",
    ambito: "tutti",
    applicazione: "tutti",
  });

  const settori = ["tutti", "Professionale", "Domestico", "Industriale"];
  const ambiti = ["tutti", "Pizzeria", "Panificio", "Braceria", "Torrefazione", "Caseificio"];
  const applicazioni = ["tutti", "Forno a legna", "Biomassa", "Braci", "Caldaia", "Camino"];

  const interventi = [
    {
      id: "pizzeria-napoli",
      titolo: "Pizzeria Napoletana - Centro Storico",
      ambito: "Pizzeria",
      settore: "Professionale",
      applicazione: "Forno a legna",
      problema: "Fumi neri e segnalazioni dei vicini",
      soluzione: "Installazione ZAPPER M",
      risultato: "Fumi abbattuti del 95%",
      citta: "Napoli",
      thumbnail: "/placeholder.svg",
    },
    {
      id: "panificio-milano",
      titolo: "Panificio Artigianale",
      ambito: "Panificio",
      settore: "Professionale",
      applicazione: "Forno a legna",
      problema: "Odori persistenti e lamentele",
      soluzione: "Installazione ZAPPER S",
      risultato: "Zero segnalazioni in 6 mesi",
      citta: "Milano",
      thumbnail: "/placeholder.svg",
    },
    {
      id: "torrefazione-torino",
      titolo: "Torrefazione Premium",
      ambito: "Torrefazione",
      settore: "Industriale",
      applicazione: "Biomassa",
      problema: "Emissioni fuori norma",
      soluzione: "Installazione ZAPPER L",
      risultato: "Conformità normativa raggiunta",
      citta: "Torino",
      thumbnail: "/placeholder.svg",
    },
    {
      id: "braceria-roma",
      titolo: "Braceria Gourmet",
      ambito: "Braceria",
      settore: "Professionale",
      applicazione: "Braci",
      problema: "Fumi densi e odore di carbone",
      soluzione: "Installazione ZAPPER M",
      risultato: "Ambiente pulito e clienti soddisfatti",
      citta: "Roma",
      thumbnail: "/placeholder.svg",
    },
    {
      id: "villa-toscana",
      titolo: "Villa Privata",
      ambito: "Residenziale",
      settore: "Domestico",
      applicazione: "Camino",
      problema: "Fumo che rientra in casa",
      soluzione: "Installazione ZAPPER S",
      risultato: "Tiraggio perfetto, niente fumo",
      citta: "Firenze",
      thumbnail: "/placeholder.svg",
    },
    {
      id: "caseificio-parma",
      titolo: "Caseificio Tradizionale",
      ambito: "Caseificio",
      settore: "Industriale",
      applicazione: "Caldaia",
      problema: "Emissioni eccessive dalla caldaia",
      soluzione: "Installazione ZAPPER L",
      risultato: "Riduzione emissioni del 90%",
      citta: "Parma",
      thumbnail: "/placeholder.svg",
    },
  ];

  const filteredInterventi = interventi.filter((intervento) => {
    const matchSettore = activeFilter.settore === "tutti" || intervento.settore === activeFilter.settore;
    const matchAmbito = activeFilter.ambito === "tutti" || intervento.ambito === activeFilter.ambito;
    const matchApplicazione = activeFilter.applicazione === "tutti" || intervento.applicazione === activeFilter.applicazione;
    return matchSettore && matchAmbito && matchApplicazione;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section - Sobria */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Interventi reali su impianti a combustione
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Sopralluoghi, installazioni e risoluzione di problemi concreti su forni, caldaie e impianti industriali.
              </p>
            </div>
          </div>
        </section>

        {/* Filtri UX */}
        <section className="py-6 border-b border-border bg-background sticky top-16 md:top-20 z-40">
          <div className="container">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filtra interventi:</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {/* Settore Filter */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider self-center mr-2">Settore:</span>
                {settori.map((settore) => (
                  <button
                    key={settore}
                    onClick={() => setActiveFilter({ ...activeFilter, settore })}
                    className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                      activeFilter.settore === settore
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {settore === "tutti" ? "Tutti" : settore}
                  </button>
                ))}
              </div>

              {/* Ambito Filter */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider self-center mr-2">Ambito:</span>
                {ambiti.slice(0, 4).map((ambito) => (
                  <button
                    key={ambito}
                    onClick={() => setActiveFilter({ ...activeFilter, ambito })}
                    className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                      activeFilter.ambito === ambito
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {ambito === "tutti" ? "Tutti" : ambito}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interventi Grid */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredInterventi.map((intervento, index) => (
                <article
                  key={intervento.id}
                  className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-[9/16] md:aspect-video bg-muted">
                    <img
                      src={intervento.thumbnail}
                      alt={intervento.titolo}
                      className="w-full h-full object-cover"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
                      <button className="w-16 h-16 bg-accent/90 hover:bg-accent rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                        <Play className="w-8 h-8 text-accent-foreground ml-1" fill="currentColor" />
                      </button>
                    </div>
                    {/* Location Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
                      <MapPin className="w-3 h-3 text-accent" />
                      <span className="text-xs font-medium text-foreground">{intervento.citta}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {intervento.settore}
                      </span>
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                        {intervento.ambito}
                      </span>
                    </div>

                    {/* Scheda Sintetica */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Wrench className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground">Applicazione: </span>
                          <span className="text-foreground font-medium">{intervento.applicazione}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 text-destructive mt-0.5 shrink-0 text-center">⚠</span>
                        <div>
                          <span className="text-muted-foreground">Problema: </span>
                          <span className="text-foreground">{intervento.problema}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground">Risultato: </span>
                          <span className="text-foreground font-medium">{intervento.risultato}</span>
                        </div>
                      </div>
                    </div>

                    {/* Solution Badge */}
                    <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                      <span className="text-sm font-semibold text-accent">{intervento.soluzione}</span>
                    </div>

                    {/* CTA */}
                    <Button variant="outline" className="w-full mt-4 group/btn" asChild>
                      <Link to="/contatti">
                        Hai un problema simile?
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {filteredInterventi.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nessun intervento corrisponde ai filtri selezionati.</p>
                <Button
                  variant="ghost"
                  className="mt-4"
                  onClick={() => setActiveFilter({ settore: "tutti", ambito: "tutti", applicazione: "tutti" })}
                >
                  Resetta filtri
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-zapper-black">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Hai un problema simile?
            </h2>
            <p className="text-white/80 text-lg mb-2 max-w-2xl mx-auto">
              Richiedi una valutazione tecnica gratuita.
            </p>
            <p className="text-white/60 text-sm mb-8 max-w-2xl mx-auto">
              Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER® più adatta.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti">
                Richiedi una valutazione tecnica
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Interventi;
