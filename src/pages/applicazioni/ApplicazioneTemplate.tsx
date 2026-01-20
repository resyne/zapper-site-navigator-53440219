import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertTriangle, MapPin, LucideIcon } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export interface ApplicazioneData {
  id: string;
  title: string;
  icon: LucideIcon;
  heroColor: string;
  description: string;
  problemaTecnico: string;
  contestoNormativo: string;
  ambitiCoinvolti: { name: string; href: string }[];
  modelliCompatibili: { name: string; descrizione: string; href: string }[];
  miniInterventi: { titolo: string; citta: string; problema: string; risultato: string; modello: string }[];
}

interface ApplicazioneTemplateProps {
  data: ApplicazioneData;
}

const ApplicazioneTemplate = ({ data }: ApplicazioneTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className={`pt-24 pb-12 md:pt-32 md:pb-16 ${data.heroColor}`}>
          <div className="container">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
              <Link to="/applicazioni" className="hover:text-primary-foreground transition-colors">Applicazioni</Link>
              <span>/</span>
              <span className="text-primary-foreground">{data.title}</span>
            </nav>
            <div className="max-w-3xl">
              <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center mb-6">
                <data.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">{data.title}</h1>
              <p className="text-lg md:text-xl text-primary-foreground/80">{data.description}</p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <h2 className="font-display text-xl font-bold text-foreground">Problema tecnico</h2>
                </div>
                <p className="text-muted-foreground">{data.problemaTecnico}</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-xl font-bold text-foreground">Contesto normativo</h2>
                </div>
                <p className="text-muted-foreground">{data.contestoNormativo}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Ambiti coinvolti</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.ambitiCoinvolti.map((a) => (
                <Link key={a.name} to={a.href} className="px-6 py-3 bg-card rounded-full shadow-sm hover:shadow-md border border-border hover:border-primary/30 text-foreground font-medium hover:text-primary transition-all">{a.name}</Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Modelli compatibili</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {data.modelliCompatibili.map((m) => (
                <Link key={m.name} to={m.href} className="group block">
                  <div className="p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl border border-border hover:border-accent/30 transition-all">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{m.name}</h3>
                    <p className="text-muted-foreground mb-4">{m.descrizione}</p>
                    <div className="flex items-center text-accent font-medium">Scopri <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground">Interventi reali</h2>
              <Link to="/interventi" className="text-primary hover:text-accent font-medium flex items-center gap-1">Vedi tutti <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {data.miniInterventi.map((i, idx) => (
                <div key={idx} className="bg-card rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-3"><MapPin className="w-4 h-4 text-accent" /><span className="text-sm text-muted-foreground">{i.citta}</span></div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">{i.titolo}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2"><span className="text-destructive">⚠</span><span className="text-muted-foreground">{i.problema}</span></div>
                    <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /><span className="text-foreground font-medium">{i.risultato}</span></div>
                  </div>
                  <div className="mt-4 px-3 py-1.5 bg-accent/10 rounded-full inline-block"><span className="text-sm font-semibold text-accent">{i.modello}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-16 md:py-24 ${data.heroColor}`}>
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Hai questo problema?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">Richiedi un sopralluogo gratuito per valutare la soluzione migliore.</p>
            <Button variant="accent" size="lg" asChild><Link to="/contatti">Richiedi sopralluogo gratuito <ArrowRight className="w-5 h-5 ml-2" /></Link></Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicazioneTemplate;
