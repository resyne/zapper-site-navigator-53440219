import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VideoUploadProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  maxVideos?: number;
  bucket?: string;
  folder?: string;
}

export default function VideoUpload({
  label,
  value = [],
  onChange,
  maxVideos = 3,
  bucket = 'media',
  folder = 'models',
}: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (value.length + files.length > maxVideos) {
      toast({
        title: 'Limite raggiunto',
        description: `Puoi caricare massimo ${maxVideos} video.`,
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      const newUrls: string[] = [];

      for (const file of Array.from(files)) {
        if (!file.type.startsWith('video/')) {
          toast({
            title: 'File non valido',
            description: `${file.name} non è un video.`,
            variant: 'destructive',
          });
          continue;
        }

        // Max 50MB per video
        if (file.size > 50 * 1024 * 1024) {
          toast({
            title: 'File troppo grande',
            description: `${file.name} supera i 50MB.`,
            variant: 'destructive',
          });
          continue;
        }

        const ext = file.name.split('.').pop();
        const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

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
            description: `Impossibile caricare ${file.name}.`,
            variant: 'destructive',
          });
          continue;
        }

        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filename);

        newUrls.push(urlData.publicUrl);
      }

      if (newUrls.length > 0) {
        onChange([...value, ...newUrls]);
        toast({
          title: 'Upload completato',
          description: `${newUrls.length} video caricato/i.`,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Errore',
        description: "Impossibile completare l'upload.",
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((url, index) => (
            <div
              key={url}
              className="relative flex items-center gap-3 p-3 bg-muted rounded-lg group"
            >
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Play className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Video {index + 1}</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline truncate block"
                >
                  Apri video
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length < maxVideos && (
        <div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="video-upload"
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
                Caricamento video...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Carica video ({value.length}/{maxVideos})
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-1">
            MP4, MOV o WebM. Max 50MB per file.
          </p>
        </div>
      )}
    </div>
  );
}
