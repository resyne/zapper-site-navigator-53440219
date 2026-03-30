import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, UserPlus, Trash2, Upload, FileText, Video, DollarSign, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Profile } from '@/types/admin';
import { Badge } from '@/components/ui/badge';
import { z } from 'zod';

const newPartnerSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(6, 'La password deve avere almeno 6 caratteri'),
  fullName: z.string().min(2, 'Il nome deve avere almeno 2 caratteri'),
});

interface PartnerDocument {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  sort_order: number;
  created_at: string;
}

interface PartnerPriceList {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  sort_order: number;
  created_at: string;
}

export default function AdminPartners() {
  const [partners, setPartners] = useState<Profile[]>([]);
  const [documents, setDocuments] = useState<PartnerDocument[]>([]);
  const [priceLists, setPriceLists] = useState<PartnerPriceList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [isDocDialogOpen, setIsDocDialogOpen] = useState(false);
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newPartner, setNewPartner] = useState({ email: '', password: '', fullName: '' });
  const [newDoc, setNewDoc] = useState({ title: '', description: '', category: 'scheda_tecnica', file_url: '' });
  const [newPrice, setNewPrice] = useState({ title: '', description: '', file_url: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [uploadingFile, setUploadingFile] = useState(false);
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    fetchAll();
  }, [isAdmin, navigate]);

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const [partnersRes, docsRes, pricesRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('role', 'partner').order('created_at', { ascending: false }),
        supabase.from('partner_documents').select('*').order('sort_order'),
        supabase.from('partner_price_lists').select('*').order('sort_order'),
      ]);

      if (partnersRes.data) setPartners(partnersRes.data as Profile[]);
      if (docsRes.data) setDocuments(docsRes.data as PartnerDocument[]);
      if (pricesRes.data) setPriceLists(pricesRes.data as PartnerPriceList[]);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePartner = async () => {
    setFormErrors({});
    try {
      const validated = newPartnerSchema.parse(newPartner);
      setIsCreating(true);

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: validated.email,
        password: validated.password,
        options: { data: { full_name: validated.fullName } },
      });

      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          toast({ title: 'Utente già registrato', description: 'Esiste già un account con questa email.', variant: 'destructive' });
        } else {
          throw signUpError;
        }
        return;
      }

      if (authData.user) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await supabase.from('profiles').update({ role: 'partner' }).eq('user_id', authData.user.id);
      }

      toast({ title: 'Partner creato!', description: `${validated.fullName} è stato aggiunto come partner.` });
      setNewPartner({ email: '', password: '', fullName: '' });
      setIsPartnerDialogOpen(false);
      setTimeout(fetchAll, 1500);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((e) => { if (e.path[0]) errors[e.path[0] as string] = e.message; });
        setFormErrors(errors);
      } else {
        toast({ title: 'Errore', description: 'Impossibile creare il partner.', variant: 'destructive' });
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeletePartner = async (partner: Profile) => {
    if (!confirm(`Sei sicuro di voler eliminare il partner "${partner.full_name}"?`)) return;
    try {
      await supabase.from('profiles').delete().eq('id', partner.id);
      toast({ title: 'Partner eliminato' });
      fetchAll();
    } catch {
      toast({ title: 'Errore', description: 'Impossibile eliminare il partner.', variant: 'destructive' });
    }
  };

  const handleFileUpload = async (file: File, path: string): Promise<string | null> => {
    setUploadingFile(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${path}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('media').upload(fileName, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(fileName);
      return urlData.publicUrl;
    } catch (err) {
      console.error('Upload error:', err);
      toast({ title: 'Errore upload', description: 'Impossibile caricare il file.', variant: 'destructive' });
      return null;
    } finally {
      setUploadingFile(false);
    }
  };

  const handleAddDocument = async () => {
    if (!newDoc.title || !newDoc.file_url) {
      toast({ title: 'Campi obbligatori', description: 'Titolo e file sono obbligatori.', variant: 'destructive' });
      return;
    }
    try {
      const { error } = await supabase.from('partner_documents').insert({
        title: newDoc.title,
        description: newDoc.description || null,
        category: newDoc.category,
        file_url: newDoc.file_url,
      });
      if (error) throw error;
      toast({ title: 'Documento aggiunto!' });
      setNewDoc({ title: '', description: '', category: 'scheda_tecnica', file_url: '' });
      setIsDocDialogOpen(false);
      fetchAll();
    } catch {
      toast({ title: 'Errore', variant: 'destructive' });
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Eliminare questo documento?')) return;
    try {
      await supabase.from('partner_documents').delete().eq('id', id);
      toast({ title: 'Documento eliminato' });
      fetchAll();
    } catch {
      toast({ title: 'Errore', variant: 'destructive' });
    }
  };

  const handleAddPriceList = async () => {
    if (!newPrice.title || !newPrice.file_url) {
      toast({ title: 'Campi obbligatori', description: 'Titolo e file sono obbligatori.', variant: 'destructive' });
      return;
    }
    try {
      const { error } = await supabase.from('partner_price_lists').insert({
        title: newPrice.title,
        description: newPrice.description || null,
        file_url: newPrice.file_url,
      });
      if (error) throw error;
      toast({ title: 'Listino aggiunto!' });
      setNewPrice({ title: '', description: '', file_url: '' });
      setIsPriceDialogOpen(false);
      fetchAll();
    } catch {
      toast({ title: 'Errore', variant: 'destructive' });
    }
  };

  const handleDeletePriceList = async (id: string) => {
    if (!confirm('Eliminare questo listino?')) return;
    try {
      await supabase.from('partner_price_lists').delete().eq('id', id);
      toast({ title: 'Listino eliminato' });
      fetchAll();
    } catch {
      toast({ title: 'Errore', variant: 'destructive' });
    }
  };

  if (!isAdmin) return null;

  const filteredPartners = partners.filter(
    (p) => p.email?.toLowerCase().includes(searchQuery.toLowerCase()) || p.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Gestione Partner">
      <Tabs defaultValue="partners" className="space-y-4">
        <TabsList>
          <TabsTrigger value="partners">
            <Users className="h-4 w-4 mr-2" />
            Partner
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Documenti
          </TabsTrigger>
          <TabsTrigger value="pricelists">
            <DollarSign className="h-4 w-4 mr-2" />
            Listini
          </TabsTrigger>
        </TabsList>

        {/* Partners Tab */}
        <TabsContent value="partners">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cerca partner..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
              <Dialog open={isPartnerDialogOpen} onOpenChange={setIsPartnerDialogOpen}>
                <DialogTrigger asChild>
                  <Button><UserPlus className="h-4 w-4 mr-2" />Nuovo Partner</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crea account Partner</DialogTitle>
                    <DialogDescription>Il partner potrà accedere alla propria area dedicata con listini e documentazione.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Nome azienda / Referente</Label>
                      <Input placeholder="Azienda SRL" value={newPartner.fullName} onChange={(e) => setNewPartner({ ...newPartner, fullName: e.target.value })} />
                      {formErrors.fullName && <p className="text-sm text-destructive">{formErrors.fullName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="partner@azienda.com" value={newPartner.email} onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })} />
                      {formErrors.email && <p className="text-sm text-destructive">{formErrors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input type="password" placeholder="••••••••" value={newPartner.password} onChange={(e) => setNewPartner({ ...newPartner, password: e.target.value })} />
                      {formErrors.password && <p className="text-sm text-destructive">{formErrors.password}</p>}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsPartnerDialogOpen(false)}>Annulla</Button>
                    <Button onClick={handleCreatePartner} disabled={isCreating}>{isCreating ? 'Creazione...' : 'Crea Partner'}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : filteredPartners.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">Nessun partner trovato.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Partner</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registrato il</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPartners.map((partner) => (
                        <TableRow key={partner.id}>
                          <TableCell className="font-medium">{partner.full_name || 'Senza nome'}</TableCell>
                          <TableCell className="text-muted-foreground">{partner.email}</TableCell>
                          <TableCell className="text-muted-foreground">{new Date(partner.created_at).toLocaleDateString('it-IT')}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeletePartner(partner)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={isDocDialogOpen} onOpenChange={setIsDocDialogOpen}>
                <DialogTrigger asChild>
                  <Button><Upload className="h-4 w-4 mr-2" />Aggiungi Documento</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Aggiungi documento partner</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Titolo</Label>
                      <Input placeholder="Scheda tecnica ZPZ" value={newDoc.title} onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Descrizione (opzionale)</Label>
                      <Textarea placeholder="Descrizione del documento" value={newDoc.description} onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <Select value={newDoc.category} onValueChange={(v) => setNewDoc({ ...newDoc, category: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheda_tecnica">Scheda Tecnica</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>File</Label>
                      <Input
                        type="file"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleFileUpload(file, 'partner-docs');
                            if (url) setNewDoc({ ...newDoc, file_url: url });
                          }
                        }}
                        disabled={uploadingFile}
                      />
                      {uploadingFile && <p className="text-sm text-muted-foreground">Caricamento in corso...</p>}
                      {newDoc.file_url && <p className="text-sm text-green-600">✓ File caricato</p>}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDocDialogOpen(false)}>Annulla</Button>
                    <Button onClick={handleAddDocument} disabled={uploadingFile}>Aggiungi</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                {documents.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">Nessun documento. Aggiungi schede tecniche e video per i partner.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titolo</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {doc.category === 'scheda_tecnica' ? 'Scheda Tecnica' : 'Video'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{new Date(doc.created_at).toLocaleDateString('it-IT')}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteDocument(doc.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Price Lists Tab */}
        <TabsContent value="pricelists">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={isPriceDialogOpen} onOpenChange={setIsPriceDialogOpen}>
                <DialogTrigger asChild>
                  <Button><Upload className="h-4 w-4 mr-2" />Aggiungi Listino</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Aggiungi listino prezzi</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Titolo</Label>
                      <Input placeholder="Listino 2026" value={newPrice.title} onChange={(e) => setNewPrice({ ...newPrice, title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Descrizione (opzionale)</Label>
                      <Textarea placeholder="Descrizione del listino" value={newPrice.description} onChange={(e) => setNewPrice({ ...newPrice, description: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>File PDF</Label>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleFileUpload(file, 'partner-pricelists');
                            if (url) setNewPrice({ ...newPrice, file_url: url });
                          }
                        }}
                        disabled={uploadingFile}
                      />
                      {uploadingFile && <p className="text-sm text-muted-foreground">Caricamento in corso...</p>}
                      {newPrice.file_url && <p className="text-sm text-green-600">✓ File caricato</p>}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsPriceDialogOpen(false)}>Annulla</Button>
                    <Button onClick={handleAddPriceList} disabled={uploadingFile}>Aggiungi</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                {priceLists.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">Nessun listino. Carica i listini prezzi per i partner.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titolo</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {priceLists.map((list) => (
                        <TableRow key={list.id}>
                          <TableCell className="font-medium">{list.title}</TableCell>
                          <TableCell className="text-muted-foreground">{new Date(list.created_at).toLocaleDateString('it-IT')}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeletePriceList(list.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
