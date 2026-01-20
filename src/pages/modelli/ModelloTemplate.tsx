import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, LucideIcon } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export interface ModelloData {
  id: string; name: string; tagline: string; description: string;
  ambitiIdeali: { name: string; href: string }[];
  applicazioniCompatibili: { name: string; href: string }[];
  settoriUtilizzo: { name: string; href: string }[];
  specifiche: { label: string; value: string }[];
}

interface ModelloTemplateProps { data: ModelloData; }

const ModelloTemplate = ({ data }: ModelloTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
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
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">{data.name}</h1>
              <p className="text-xl text-accent font-semibold mb-4">{data.tagline}</p>
              <p className="text-lg text-primary-foreground/80">{data.description}</p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Ambiti ideali</h3>
                <div className="space-y-2">{data.ambitiIdeali.map((a) => <Link key={a.name} to={a.href} className="block text-primary hover:text-accent transition-colors">{a.name}</Link>)}</div>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Applicazioni</h3>
                <div className="space-y-2">{data.applicazioniCompatibili.map((a) => <Link key={a.name} to={a.href} className="block text-primary hover:text-accent transition-colors">{a.name}</Link>)}</div>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Settori</h3>
                <div className="space-y-2">{data.settoriUtilizzo.map((s) => <Link key={s.name} to={s.href} className="block text-primary hover:text-accent transition-colors">{s.name}</Link>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Specifiche tecniche</h2>
            <div className="max-w-2xl mx-auto bg-card rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">{data.specifiche.map((s, i) => <div key={i} className="flex justify-between py-3 border-b border-border last:border-0"><span className="text-muted-foreground">{s.label}</span><span className="font-semibold text-foreground">{s.value}</span></div>)}</div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-accent">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-accent-foreground mb-4">Conferma la soluzione con un sopralluogo</h2>
            <p className="text-accent-foreground/80 text-lg mb-8 max-w-2xl mx-auto">Il modello non si sceglie, si conferma. Richiedi un sopralluogo gratuito per verificare che {data.name} sia la soluzione giusta per il tuo impianto.</p>
            <Button variant="default" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link to="/contatti">Richiedi sopralluogo gratuito <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ModelloTemplate;
