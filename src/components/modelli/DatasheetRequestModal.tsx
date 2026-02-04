import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, FileDown, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DatasheetRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelId: string;
  modelName: string;
  datasheetUrl: string;
}

export default function DatasheetRequestModal({
  isOpen,
  onClose,
  modelId,
  modelName,
  datasheetUrl,
}: DatasheetRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: 'Campi obbligatori',
        description: 'Compila tutti i campi per procedere.',
        variant: 'destructive',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Email non valida',
        description: 'Inserisci un indirizzo email valido.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save lead to database
      const { error } = await supabase.from('datasheet_requests').insert({
        model_id: modelId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      });

      if (error) throw error;

      setIsSuccess(true);

      // Trigger download
      const link = document.createElement('a');
      link.href = datasheetUrl;
      link.download = `Scheda-Tecnica-${modelName}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile inviare la richiesta. Riprova.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({ firstName: '', lastName: '', email: '', phone: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5 text-primary" />
            Scarica scheda tecnica
          </DialogTitle>
          <DialogDescription>
            {isSuccess 
              ? 'Grazie! Il download è iniziato.'
              : `Inserisci i tuoi dati per scaricare la scheda tecnica di ${modelName}.`
            }
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Download avviato!</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Se il download non parte automaticamente,{' '}
              <a 
                href={datasheetUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                clicca qui
              </a>.
            </p>
            <Button onClick={handleClose} className="w-full">
              Chiudi
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Mario"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Cognome *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Rossi"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="mario.rossi@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefono *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+39 333 1234567"
                required
              />
            </div>

            <p className="text-xs text-muted-foreground">
              I tuoi dati saranno trattati secondo la nostra privacy policy.
            </p>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Annulla
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Invio...
                  </>
                ) : (
                  <>
                    <FileDown className="h-4 w-4 mr-2" />
                    Scarica PDF
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
