import { AlertTriangle, CloudOff, Users, FileWarning, TrendingDown, Ban } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: CloudOff,
      title: "Fumi visibili",
      description: "Il fumo che esce dalla canna fumaria attira segnalazioni e lamentele dei vicini.",
    },
    {
      icon: Users,
      title: "Proteste dei vicini",
      description: "Odori sgradevoli che invadono le abitazioni circostanti creano tensioni nel quartiere.",
    },
    {
      icon: FileWarning,
      title: "Controlli ASL",
      description: "Ispezioni sempre più frequenti con rischio di multe e chiusure temporanee.",
    },
    {
      icon: TrendingDown,
      title: "Danni alla reputazione",
      description: "Recensioni negative online che parlano di 'puzza' e 'fumo' danneggiano il business.",
    },
    {
      icon: Ban,
      title: "Sanzioni e multe",
      description: "Multe fino a €5.000 per mancato rispetto delle normative sulle emissioni.",
    },
    {
      icon: AlertTriangle,
      title: "Rischio chiusura",
      description: "In casi gravi, le autorità possono ordinare la cessazione dell'attività.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-zapper-dark text-primary-foreground overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              Il problema
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Fumi, odori e polveri:{" "}
              <span className="text-accent">un problema serio</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Ogni giorno, centinaia di attività in Italia ricevono segnalazioni, multe e richiami 
              per problemi legati alle emissioni. Questo significa stress, costi imprevisti e, 
              nei casi peggiori, la chiusura dell'attività.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-primary-foreground/5 rounded-xl">
              <div className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-accent">70%</p>
                <p className="text-sm text-primary-foreground/60">Attività con problemi di fumi</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-accent">€5k</p>
                <p className="text-sm text-primary-foreground/60">Multa media per violazione</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-accent">30%</p>
                <p className="text-sm text-primary-foreground/60">Rischiano la chiusura</p>
              </div>
            </div>
          </div>

          {/* Problems Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {problems.map((problem, index) => (
              <div
                key={problem.title}
                className={`group p-5 bg-primary-foreground/5 rounded-xl border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-accent/30 transition-all duration-300 animate-fade-in-up animation-delay-${(index + 1) * 100}`}
              >
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <problem.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{problem.title}</h3>
                <p className="text-sm text-primary-foreground/60">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
