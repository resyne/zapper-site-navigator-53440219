import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  accept?: string;
  maxSizeMB?: number;
  bucket?: string;
  folder?: string;
  hint?: string;
}

export default function FileUpload({
  label,
  value,
  onChange,
  accept = 'application/pdf',
  maxSizeMB = 10,
  bucket = 'media',
  folder = 'datasheets',
  hint = 'PDF, max 10MB',
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: 'File troppo grande',
        description: `Il file supera i ${maxSizeMB}MB.`,
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const ext = file.name.split('.').pop();
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

      // Upload to Supabase Storage
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

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filename);

      onChange(urlData.publicUrl);
      toast({
        title: 'Upload completato',
        description: 'File caricato con successo.',
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile completare l\'upload.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange(null);
  };

  const getFileName = (url: string) => {
    try {
      const parts = url.split('/');
      return parts[parts.length - 1];
    } catch {
      return 'File';
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {value ? (
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <FileText className="h-8 w-8 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{getFileName(value)}</p>
            <a 
              href={value} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              Apri file
            </a>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="text-destructive hover:text-destructive flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div>
          <Input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Caricamento...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Carica file
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-1">{hint}</p>
        </div>
      )}
    </div>
  );
}
