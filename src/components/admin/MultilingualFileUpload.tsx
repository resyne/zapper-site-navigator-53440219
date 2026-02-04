import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, FileText, Loader2, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DatasheetUrls, DatasheetLanguage } from '@/types/admin';

const LANGUAGES: { code: DatasheetLanguage; label: string; flag: string }[] = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

interface MultilingualFileUploadProps {
  label: string;
  value: DatasheetUrls;
  onChange: (urls: DatasheetUrls) => void;
  bucket?: string;
  folder?: string;
}

export default function MultilingualFileUpload({
  label,
  value = {},
  onChange,
  bucket = 'media',
  folder = 'datasheets',
}: MultilingualFileUploadProps) {
  const [uploadingLang, setUploadingLang] = useState<DatasheetLanguage | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const { toast } = useToast();

  const handleFileSelect = async (lang: DatasheetLanguage, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast({
        title: 'File non valido',
        description: 'Seleziona un file PDF.',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File troppo grande',
        description: 'Il file supera i 10MB.',
        variant: 'destructive',
      });
      return;
    }

    setUploadingLang(lang);

    try {
      const ext = file.name.split('.').pop();
      const filename = `${folder}/${lang}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast({
          title: 'Errore upload',
          description: 'Impossibile caricare il file.',
          variant: 'destructive',
        });
        return;
      }

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filename);

      onChange({ ...value, [lang]: urlData.publicUrl });
      
      toast({
        title: 'Upload completato',
        description: `Scheda tecnica ${LANGUAGES.find(l => l.code === lang)?.label} caricata.`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile completare l\'upload.',
        variant: 'destructive',
      });
    } finally {
      setUploadingLang(null);
      const input = fileInputRefs.current[lang];
      if (input) input.value = '';
    }
  };

  const handleRemove = (lang: DatasheetLanguage) => {
    const newValue = { ...value };
    delete newValue[lang];
    onChange(newValue);
  };

  const getFileName = (url: string) => {
    try {
      const parts = url.split('/');
      return parts[parts.length - 1];
    } catch {
      return 'File';
    }
  };

  const uploadedCount = Object.values(value).filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <Label>{label}</Label>
        <span className="text-xs text-muted-foreground">
          ({uploadedCount}/{LANGUAGES.length} lingue)
        </span>
      </div>
      
      <div className="space-y-2">
        {LANGUAGES.map((lang) => {
          const url = value[lang.code];
          const isUploading = uploadingLang === lang.code;

          return (
            <div 
              key={lang.code}
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <span className="text-lg" title={lang.label}>{lang.flag}</span>
              <span className="text-sm font-medium w-20">{lang.label}</span>
              
              {url ? (
                <div className="flex items-center gap-2 flex-1">
                  <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline truncate flex-1"
                  >
                    {getFileName(url)}
                  </a>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(lang.code)}
                    className="text-destructive hover:text-destructive h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex-1">
                  <Input
                    ref={(el) => { fileInputRefs.current[lang.code] = el; }}
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileSelect(lang.code, e)}
                    className="hidden"
                    id={`file-upload-${lang.code}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRefs.current[lang.code]?.click()}
                    disabled={isUploading}
                    className="h-8"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                        Caricamento...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3 w-3 mr-2" />
                        Carica PDF
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <p className="text-xs text-muted-foreground">
        PDF, max 10MB per file. Carica le schede nelle lingue desiderate.
      </p>
    </div>
  );
}
