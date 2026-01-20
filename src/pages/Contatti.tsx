import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Upload, Phone, Mail, MessageCircle, CheckCircle2, Camera, ArrowRight } from "lucide-react";
import { useState } from "react";

const Contatti = () => {
  const [impiantoFiles, setImpiantoFiles] = useState<FileList | null>(null);
  const [cannaFiles, setCannaFiles] = useState<FileList | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Valutazione tecnica ZAPPER
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Analizziamo il tuo impianto da remoto e ti proponiamo la soluzione ZAPPER più adatta, 
                completa di indicazioni di installazione.
              </p>
              <p className="text-sm text-primary font-medium">
                La valutazione è tecnica, gratuita e senza impegno.
              </p>
            </div>
          </div>
        </section>

        {/* Chiarimento processo */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Non effettuiamo sopralluoghi in loco.</strong><br />
                La valutazione avviene da remoto, sulla base di foto, dati tecnici e configurazione dell'impianto.
              </p>
            </div>
          </div>
        </section>

        {/* Come funziona */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                🔧 Come funziona la valutazione tecnica
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: "1",
                    title: "Compila il modulo",
                    description: "Inserisci le informazioni principali sul tuo impianto"
                  },
                  {
                    step: "2",
                    title: "Carica le foto",
                    description: "Foto dell'impianto e della canna fumaria"
                  },
                  {
                    step: "3",
                    title: "Analisi tecnica",
                    description: "Il nostro team tecnico analizza il caso"
                  },
                  {
                    step: "4",
                    title: "Proposta ZAPPER",
                    description: "Ricevi proposta tecnica con indicazioni di installazione"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-center text-sm text-muted-foreground mt-8">
                Tempi medi di risposta: <strong>24–48 ore lavorative</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Richiedi una valutazione tecnica
              </h2>
              
              <form className="space-y-8 bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm">
                {/* Dati di contatto */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm">1</span>
                    Dati di contatto
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome e Cognome *</Label>
                      <Input id="nome" placeholder="Mario Rossi" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="mario@esempio.it" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Telefono (consigliato)</Label>
                      <Input id="telefono" type="tel" placeholder="+39 333 1234567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="azienda">Azienda (se presente)</Label>
                      <Input id="azienda" placeholder="Nome azienda" />
                    </div>
                  </div>
                </div>

                {/* Informazioni impianto */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm">2</span>
                    Informazioni sull'impianto
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="settore">Settore *</Label>
                      <Select required>
                        <SelectTrigger id="settore">
                          <SelectValue placeholder="Seleziona settore" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professionale">Professionale (ristoranti, pizzerie...)</SelectItem>
                          <SelectItem value="residenziale">Residenziale (casa privata)</SelectItem>
                          <SelectItem value="industriale">Industriale</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipo-impianto">Tipo di impianto *</Label>
                      <Select required>
                        <SelectTrigger id="tipo-impianto">
                          <SelectValue placeholder="Seleziona tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="forno-legna">Forno a legna</SelectItem>
                          <SelectItem value="caldaia-biomassa">Caldaia a biomassa</SelectItem>
                          <SelectItem value="braci-carbone">Braci / Carbone</SelectItem>
                          <SelectItem value="camino">Camino</SelectItem>
                          <SelectItem value="stufa">Stufa</SelectItem>
                          <SelectItem value="griglia">Griglia professionale</SelectItem>
                          <SelectItem value="affumicatore">Affumicatore</SelectItem>
                          <SelectItem value="altro">Altro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diametro">Diametro canna fumaria (mm) *</Label>
                      <Input id="diametro" type="number" placeholder="es. 150" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="citta">Città / Paese *</Label>
                      <Input id="citta" placeholder="Milano, Italia" required />
                    </div>
                  </div>
                </div>

                {/* Upload foto */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm">3</span>
                    Foto dell'impianto
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="foto-impianto" className="flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Foto impianto *
                      </Label>
                      <div className="relative">
                        <Input 
                          id="foto-impianto" 
                          type="file" 
                          accept="image/*" 
                          multiple
                          required
                          onChange={(e) => setImpiantoFiles(e.target.files)}
                          className="cursor-pointer"
                        />
                        {impiantoFiles && impiantoFiles.length > 0 && (
                          <p className="text-xs text-primary mt-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {impiantoFiles.length} file selezionati
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="foto-canna" className="flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Foto canna fumaria *
                      </Label>
                      <div className="relative">
                        <Input 
                          id="foto-canna" 
                          type="file" 
                          accept="image/*" 
                          multiple
                          required
                          onChange={(e) => setCannaFiles(e.target.files)}
                          className="cursor-pointer"
                        />
                        {cannaFiles && cannaFiles.length > 0 && (
                          <p className="text-xs text-primary mt-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {cannaFiles.length} file selezionati
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Formati accettati: JPG, PNG. Puoi caricare più foto per ciascun campo.
                  </p>
                </div>

                {/* Note */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm">4</span>
                    Note aggiuntive
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="note">Descrivi il problema o aggiungi dettagli utili</Label>
                    <Textarea 
                      id="note" 
                      placeholder="Es. Fumi persistenti anche dopo pulizia, odori che arrivano ai vicini, problemi di tiraggio..."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full text-lg py-6">
                    Invia richiesta di valutazione
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Riceverai una risposta dal nostro team tecnico entro 24-48 ore lavorative.
                  </p>
                </div>
              </form>

              {/* Privacy */}
              <p className="text-xs text-muted-foreground text-center mt-6">
                Le informazioni fornite vengono utilizzate esclusivamente per la valutazione tecnica del tuo impianto.
              </p>
            </div>
          </div>
        </section>

        {/* Blocco fiducia */}
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-muted-foreground mb-4">
                Abbiamo già effettuato valutazioni tecniche e installazioni su impianti<br />
                <strong className="text-foreground">professionali, residenziali e industriali in tutta Europa.</strong>
              </p>
              <Link 
                to="/interventi" 
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Vedi alcuni interventi reali
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Contatti diretti */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Preferisci parlare con noi?
              </h3>
              
              <div className="flex flex-wrap justify-center gap-6">
                <a 
                  href="tel:+39XXXXXXXXXX" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Telefono</span>
                </a>
                <a 
                  href="mailto:info@zapper.it" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>
                <a 
                  href="https://wa.me/39XXXXXXXXXX" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Per richieste tecniche consigliamo sempre la valutazione tramite modulo.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contatti;
