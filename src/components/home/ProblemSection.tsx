import { CloudOff, Users, FileWarning } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: CloudOff,
      title: "Fumi visibili",
      description: "Segnalazioni e lamentele dei vicini",
    },
    {
      icon: Users,
      title: "Proteste",
      description: "Tensioni nel quartiere per gli odori",
    },
    {
      icon: FileWarning,
      title: "Controlli ASL",
      description: "Rischio multe fino a €5.000",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fumi, odori e polveri?{" "}
            <span className="text-primary">Problema risolto.</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Ogni giorno centinaia di attività ricevono segnalazioni per emissioni. 
            Con ZAPPER® elimini il problema alla fonte.
          </p>

          {/* Problems - Horizontal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <div
                key={problem.title}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                  <problem.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {problem.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
