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
    { icon: Clock, text: "Sopralluogo entro 48h" },
    { icon: Shield, text: "Preventivo senza impegno" },
    { icon: Truck, text: "Installazione rapida" },
  ];

  return (
    <section className="py-16 md:py-24 bg-hero-gradient text-primary-foreground">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              Inizia ora
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Richiedi un{" "}
              <span className="text-accent">sopralluogo gratuito</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Un nostro tecnico specializzato valuterà la tua situazione e ti proporrà 
              la soluzione migliore. Senza impegno, senza costi nascosti.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Direct Contact */}
            <div className="p-6 bg-primary-foreground/10 rounded-xl">
              <p className="text-sm text-primary-foreground/70 mb-4">
                Preferisci parlare direttamente con noi?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+390000000000" className="flex items-center gap-2 text-accent hover:underline">
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">+39 000 000 0000</span>
                </a>
                <a href="mailto:info@zapper.it" className="flex items-center gap-2 text-accent hover:underline">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">info@zapper.it</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card text-foreground rounded-2xl p-6 md:p-8 shadow-2xl">
            <h3 className="font-display text-2xl font-bold mb-6">
              Compila il form
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome e Cognome *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Mario Rossi"
                    className="bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefono *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+39 333 123 4567"
                    className="bg-background"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="mario@esempio.it"
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="sector" className="block text-sm font-medium mb-2">
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
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Descrivi la tua situazione
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ho un forno a legna e i vicini si lamentano per il fumo..."
                  rows={4}
                  className="bg-background"
                />
              </div>

              <Button type="submit" variant="accent" size="xl" className="w-full">
                Richiedi sopralluogo gratuito
                <ArrowRight className="w-5 h-5" />
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
