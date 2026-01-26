import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, ArrowRight, CheckCircle, Shield, Clock, Truck } from "lucide-react";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sector: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const benefits = [
    { icon: Clock, text: "Valutazione entro 48h" },
    { icon: Shield, text: "Preventivo senza impegno" },
    { icon: Truck, text: "Installazione rapida" },
  ];

  return (
    <section className="py-12 md:py-24 bg-zapper-black">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Inizia ora
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Richiedi una{" "}
              <span className="text-primary">valutazione tecnica</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-3 sm:mb-4">
              Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER più adatta.
            </p>
            <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8">
              Un nostro tecnico specializzato ti proporrà la soluzione migliore. Senza impegno, senza costi nascosti.
            </p>

            {/* Benefits */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <span className="text-white text-sm sm:text-base font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Direct Contact */}
            <div className="p-4 sm:p-6 bg-white/10 rounded-lg sm:rounded-xl">
              <p className="text-xs sm:text-sm text-white/70 mb-3 sm:mb-4">
                Preferisci parlare direttamente con noi?
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a href="tel:+390000000000" className="flex items-center gap-2 text-primary hover:underline">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-semibold text-sm sm:text-base">+39 000 000 0000</span>
                </a>
                <a href="mailto:info@zapper.it" className="flex items-center gap-2 text-primary hover:underline">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-semibold text-sm sm:text-base">info@zapper.it</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card text-foreground rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Compila il form
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Nome e Cognome *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Mario Rossi"
                    className="bg-background text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Telefono *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+39 333 123 4567"
                    className="bg-background text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="mario@esempio.it"
                  className="bg-background text-sm"
                />
              </div>

              <div>
                <label htmlFor="sector" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                  Settore
                </label>
                <select
                  id="sector"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                >
                  <option value="">Seleziona un settore</option>
                  <option value="professionale">Professionale (Ristoranti, Pizzerie...)</option>
                  <option value="domestico">Domestico (Casa, Villa...)</option>
                  <option value="industriale">Industriale (Stabilimenti...)</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                  Descrivi la tua situazione
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ho un forno a legna e i vicini si lamentano per il fumo..."
                  rows={3}
                  className="bg-background text-sm"
                />
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full">
                Richiedi una valutazione tecnica
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Inviando il form accetti la nostra{" "}
                <a href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
