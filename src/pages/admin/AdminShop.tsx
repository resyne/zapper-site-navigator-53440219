import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Package, Filter, Droplets, Wrench, Loader2, ExternalLink } from 'lucide-react';

interface ShopifyAdminProduct {
  id: number;
  title: string;
  body_html: string | null;
  product_type: string;
  status: string;
  handle: string;
  images: Array<{ id: number; src: string }>;
  variants: Array<{
    id: number;
    title: string;
    price: string;
    inventory_quantity: number;
  }>;
  created_at: string;
  updated_at: string;
}

const categoryOptions = [
  { value: 'Ricambio', label: 'Ricambi', icon: Wrench },
  { value: 'Consumabile', label: 'Consumabili', icon: Droplets },
  { value: 'Filtro', label: 'Filtri', icon: Filter },
];

export default function AdminShop() {
  const [products, setProducts] = useState<ShopifyAdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const { toast } = useToast();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('shopify-admin-products', {
        method: 'GET',
      });
      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      toast({ title: 'Errore', description: 'Impossibile caricare i prodotti da Shopify.', variant: 'destructive' });
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (product: ShopifyAdminProduct) => {
    if (!confirm(`Eliminare "${product.title}" da Shopify? Questa azione è irreversibile.`)) return;
    try {
      const { error } = await supabase.functions.invoke(`shopify-admin-products?product_id=${product.id}`, {
        method: 'DELETE',
      });
      if (error) throw error;
      toast({ title: 'Prodotto eliminato da Shopify' });
      fetchProducts();
    } catch (err: any) {
      toast({ title: 'Errore', description: err.message, variant: 'destructive' });
    }
  };

  const toggleStatus = async (product: ShopifyAdminProduct) => {
    const newStatus = product.status === 'active' ? 'draft' : 'active';
    try {
      const { error } = await supabase.functions.invoke(`shopify-admin-products?product_id=${product.id}`, {
        method: 'PUT',
        body: { status: newStatus },
      });
      if (error) throw error;
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, status: newStatus } : p))
      );
    } catch (err: any) {
      toast({ title: 'Errore', description: err.message, variant: 'destructive' });
    }
  };

  const filtered = filterCategory === 'all'
    ? products
    : products.filter((p) => p.product_type === filterCategory);

  const formatPrice = (price: string) => `€ ${parseFloat(price).toFixed(2).replace('.', ',')}`;

  const getCategoryIcon = (type: string) => {
    const opt = categoryOptions.find((c) => c.value === type);
    if (!opt) return <Package className="h-4 w-4" />;
    const Icon = opt.icon;
    return <Icon className="h-4 w-4" />;
  };

  const getCategoryLabel = (type: string) =>
    categoryOptions.find((c) => c.value === type)?.label || type || 'Senza categoria';

  const shopifyAdminUrl = `https://admin.shopify.com/store/vw0uvu-vf`;

  return (
    <AdminLayout title="Shop – Prodotti Shopify">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {[{ value: 'all', label: 'Tutti' }, ...categoryOptions.map((c) => ({ value: c.value, label: c.label }))].map((f) => (
              <Button
                key={f.value}
                size="sm"
                variant={filterCategory === f.value ? 'default' : 'outline'}
                onClick={() => setFilterCategory(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </div>
          <Button asChild variant="outline">
            <a href={`${shopifyAdminUrl}/products/new`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Nuovo su Shopify
            </a>
          </Button>
        </div>

        {/* Product list */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Nessun prodotto trovato.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {filtered.map((product) => {
              const mainVariant = product.variants[0];
              const image = product.images[0];
              return (
                <Card key={product.id} className="overflow-hidden">
                  <div className="flex items-center gap-4 p-4">
                    {/* Image */}
                    <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {image ? (
                        <img src={image.src} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        getCategoryIcon(product.product_type)
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{product.title}</h3>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'} className="text-xs flex-shrink-0">
                          {product.status === 'active' ? 'Attivo' : 'Bozza'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          {getCategoryIcon(product.product_type)}
                          {getCategoryLabel(product.product_type)}
                        </span>
                        {mainVariant && (
                          <span className="font-medium text-foreground">{formatPrice(mainVariant.price)}</span>
                        )}
                        {product.variants.length > 1 && (
                          <span className="text-xs">({product.variants.length} varianti)</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Switch
                        checked={product.status === 'active'}
                        onCheckedChange={() => toggleStatus(product)}
                        aria-label="Stato"
                      />
                      <Button size="icon" variant="ghost" asChild>
                        <a href={`${shopifyAdminUrl}/products/${product.id}`} target="_blank" rel="noopener noreferrer">
                          <Pencil className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(product)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
