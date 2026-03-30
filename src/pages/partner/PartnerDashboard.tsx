import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Video, Download, LogOut, DollarSign, ExternalLink } from 'lucide-react';
import logoVerde from '@/assets/logo-zapper-verde.svg';
import { useToast } from '@/hooks/use-toast';

interface PartnerDocument {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  thumbnail_url: string | null;
  sort_order: number;
}

interface PartnerPriceList {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  sort_order: number;
}

export default function PartnerDashboard() {
  const { user, profile, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<PartnerDocument[]>([]);
  const [priceLists, setPriceLists] = useState<PartnerPriceList[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/partner');
    }
    if (!isLoading && profile && profile.role !== 'partner') {
      navigate('/partner');
      toast({
        title: 'Accesso negato',
        description: 'Questa area è riservata ai partner.',
        variant: 'destructive',
      });
    }
  }, [user, profile, isLoading, navigate, toast]);

  useEffect(() => {
    if (user && profile?.role === 'partner') {
      fetchData();
    }
  }, [user, profile]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [docsRes, priceRes] = await Promise.all([
        supabase.from('partner_documents').select('*').order('sort_order'),
        supabase.from('partner_price_lists').select('*').order('sort_order'),
      ]);

      if (docsRes.data) setDocuments(docsRes.data as PartnerDocument[]);
      if (priceRes.data) setPriceLists(priceRes.data as PartnerPriceList[]);
    } catch (err) {
      console.error('Error fetching partner data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/partner');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || profile?.role !== 'partner') return null;

  const technicalSheets = documents.filter(d => d.category === 'scheda_tecnica');
  const videos = documents.filter(d => d.category === 'video');

  const getCategoryIcon = (cat: string) => {
    if (cat === 'video') return <Video className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logoVerde} alt="Zapper" className="h-8" />
            </Link>
            <Badge variant="outline" className="text-zapper-green border-zapper-green">
              Area Partner
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {profile?.full_name || profile?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Esci
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Benvenuto, {profile?.full_name || 'Partner'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Accedi ai tuoi listini, sconti dedicati e documentazione tecnica.
          </p>
        </div>

        <Tabs defaultValue="listini" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="listini">
              <DollarSign className="h-4 w-4 mr-2" />
              Listini
            </TabsTrigger>
            <TabsTrigger value="schede">
              <FileText className="h-4 w-4 mr-2" />
              Schede Tecniche
            </TabsTrigger>
            <TabsTrigger value="video">
              <Video className="h-4 w-4 mr-2" />
              Video
            </TabsTrigger>
          </TabsList>

          {/* Listini Tab */}
          <TabsContent value="listini">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loadingData ? (
                <div className="col-span-full flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : priceLists.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nessun listino disponibile al momento.</p>
                  </CardContent>
                </Card>
              ) : (
                priceLists.map((list) => (
                  <Card key={list.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{list.title}</CardTitle>
                      {list.description && (
                        <CardDescription>{list.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <a href={list.file_url} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Scarica PDF
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Schede Tecniche Tab */}
          <TabsContent value="schede">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loadingData ? (
                <div className="col-span-full flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : technicalSheets.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nessuna scheda tecnica disponibile al momento.</p>
                  </CardContent>
                </Card>
              ) : (
                technicalSheets.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(doc.category)}
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                      </div>
                      {doc.description && (
                        <CardDescription>{doc.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Scarica
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Video Tab */}
          <TabsContent value="video">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loadingData ? (
                <div className="col-span-full flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : videos.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nessun video disponibile al momento.</p>
                  </CardContent>
                </Card>
              ) : (
                videos.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Video className="h-5 w-5" />
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                      </div>
                      {doc.description && (
                        <CardDescription>{doc.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Guarda video
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
