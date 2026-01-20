import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Play, AlertTriangle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export interface ModelloData {
  id: string;
  name: string;
  diameter: string;
  tagline: string;
  description: string;
  ambitiIdeali: { name: string; href: string }[];
  applicazioniCompatibili: { name: string; href: string }[];
  settoriUtilizzo: { name: string; href: string }[];
  specifiche: { label: string; value: string }[];
  // New fields
  inAzione?: {
    videoPlaceholder?: boolean;
    contestoBreve: string;
    interventoLink?: string;
  };
  quandoNon?: {
    casi: string[];
    alternativa: string;
    alternativaLink?: string;
  };
}

interface ModelloTemplateProps {
  data: ModelloData;
}

const ModelloTemplate = ({ data }: ModelloTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-primary">
          <div className="container">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
              <Link to="/modelli" className="hover:text-primary-foreground">Modelli</Link>
              <span>/</span>
              <span className="text-primary-foreground">{data.name}</span>
            </nav>
            <div className="max-w-3xl">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-accent-foreground" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
                {data.name}
              </h1>
              <p className="text-xl text-accent font-semibold mb-2">{data.tagline}</p>
              <p className="text-lg text-primary-foreground/70 mb-4">{data.diameter}</p>
              <p className="text-lg text-primary-foreground/80 mb-8">{data.description}</p>
              
              {/* CTA Primaria in Hero */}
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link to="/contatti">
                  Verifica se {data.name} è adatto al tuo impianto
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <p className="text-sm text-primary-foreground/60 mt-3">Valutazione tecnica gratuita e senza impegno</p>
              
            </div>
          </div>
        </section>

        {/* Correlazioni */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Ambiti ideali</h3>
                <div className="space-y-2">
                  {data.ambitiIdeali.map((a) => (
                    <Link
                      key={a.name}
                      to={a.href}
                      className="block text-primary hover:text-accent transition-colors"
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Applicazioni</h3>
                <div className="space-y-2">
                  {data.applicazioniCompatibili.map((a) => (
                    <Link
                      key={a.name}
                      to={a.href}
                      className="block text-primary hover:text-accent transition-colors"
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Settori</h3>
                <div className="space-y-2">
                  {data.settoriUtilizzo.map((s) => (
                    <Link
                      key={s.name}
                      to={s.href}
                      className="block text-primary hover:text-accent transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifiche tecniche */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Specifiche tecniche
            </h2>
            <div className="max-w-2xl mx-auto bg-card rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                {data.specifiche.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-3 border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-semibold text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* In Azione */}
        {data.inAzione && (
          <section className="py-12 md:py-16">
            <div className="container">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                🔥 {data.name} in azione
              </h2>
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Video placeholder */}
                <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center z-10">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                  <span className="absolute bottom-4 left-4 text-sm text-muted-foreground">Video intervento</span>
                </div>
                
                {/* Foto placeholder */}
                <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
                  <div className="text-center p-6">
                    <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <span className="text-sm text-muted-foreground">Foto installazione</span>
                  </div>
                </div>
              </div>
              
              {/* Contesto */}
              <div className="max-w-2xl mx-auto mt-8 text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  {data.inAzione.contestoBreve}
                </p>
                <Link 
                  to={data.inAzione.interventoLink || "/interventi"}
                  className="inline-flex items-center text-primary hover:text-accent font-medium transition-colors"
                >
                  Vedi altri interventi simili
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Quando NON è questo modello */}
        {data.quandoNon && (
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Quando {data.name} non è la soluzione ideale
                  </h2>
                </div>
                <ul className="space-y-3 mb-6">
                  {data.quandoNon.casi.map((caso, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{caso}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-foreground">
                  👉 In questi casi viene valutato{" "}
                  {data.quandoNon.alternativaLink ? (
                    <Link 
                      to={data.quandoNon.alternativaLink}
                      className="text-primary hover:text-accent font-semibold transition-colors"
                    >
                      {data.quandoNon.alternativa}
                    </Link>
                  ) : (
                    <span className="font-semibold">{data.quandoNon.alternativa}</span>
                  )}
                  .
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Come funziona la valutazione */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                🔧 Come funziona la valutazione tecnica
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                  <p className="text-muted-foreground pt-1">Ci invii alcune foto dell'impianto</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                  <p className="text-muted-foreground pt-1">Analizziamo configurazione e diametri</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
                  <p className="text-muted-foreground pt-1">Ti proponiamo il modello ZAPPER più adatto</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">4</span>
                  <p className="text-muted-foreground pt-1">Ricevi indicazioni di installazione e offerta</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6 italic">
                La valutazione è da remoto e senza impegno.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Finale */}
        <section className="py-16 md:py-24 bg-accent">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-accent-foreground mb-4">
              Conferma la soluzione con una valutazione
            </h2>
            <p className="text-accent-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Il modello non si sceglie, si conferma. Richiedi una valutazione tecnica gratuita per verificare
              che {data.name} sia la soluzione giusta per il tuo impianto.
            </p>
            <Button
              variant="default"
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
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

export default ModelloTemplate;
