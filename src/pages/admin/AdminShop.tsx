import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Package, Filter, Droplets, Wrench, GripVertical } from 'lucide-react';

interface ShopProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  price_cents: number;
  currency: string;
  image_url: string | null;
  in_stock: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const categoryOptions = [
  { value: 'ricambio', label: 'Ricambio', icon: Wrench },
  { value: 'consumabile', label: 'Consumabile', icon: Droplets },
  { value: 'filtro', label: 'Filtro', icon: Filter },
];

const emptyProduct = {
  name: '',
  slug: '',
  description: '',
  category: 'ricambio',
  price_cents: 0,
  currency: 'EUR',
  image_url: null as string | null,
  in_stock: true,
  sort_order: 0,
};

export default function AdminShop() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ShopProduct | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('shop_products')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      toast({ title: 'Errore', description: 'Impossibile caricare i prodotti.', variant: 'destructive' });
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const openCreate = () => {
    setEditingProduct(null);
    setForm({ ...emptyProduct, sort_order: products.length });
    setIsDialogOpen(true);
  };

  const openEdit = (product: ShopProduct) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      category: product.category,
      price_cents: product.price_cents,
      currency: product.currency,
      image_url: product.image_url,
      in_stock: product.in_stock,
      sort_order: product.sort_order,
    });
    setIsDialogOpen(true);
  };

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: editingProduct ? prev.slug : generateSlug(name),
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim()) {
      toast({ title: 'Campi obbligatori', description: 'Nome e slug sono obbligatori.', variant: 'destructive' });
      return;
    }
    setIsSaving(true);

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim() || null,
      category: form.category,
      price_cents: form.price_cents,
      currency: form.currency,
      image_url: form.image_url,
      in_stock: form.in_stock,
      sort_order: form.sort_order,
    };

    let error;
    if (editingProduct) {
      ({ error } = await supabase.from('shop_products').update(payload).eq('id', editingProduct.id));
    } else {
      ({ error } = await supabase.from('shop_products').insert(payload));
    }

    if (error) {
      toast({ title: 'Errore', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: editingProduct ? 'Prodotto aggiornato' : 'Prodotto creato' });
      setIsDialogOpen(false);
      fetchProducts();
    }
    setIsSaving(false);
  };

  const handleDelete = async (product: ShopProduct) => {
    if (!confirm(`Eliminare "${product.name}"?`)) return;
    const { error } = await supabase.from('shop_products').delete().eq('id', product.id);
    if (error) {
      toast({ title: 'Errore', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Prodotto eliminato' });
      fetchProducts();
    }
  };

  const toggleStock = async (product: ShopProduct) => {
    const { error } = await supabase
      .from('shop_products')
      .update({ in_stock: !product.in_stock })
      .eq('id', product.id);
    if (!error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, in_stock: !p.in_stock } : p))
      );
    }
  };

  const filtered = filterCategory === 'all'
    ? products
    : products.filter((p) => p.category === filterCategory);

  const formatPrice = (cents: number) => `€ ${(cents / 100).toFixed(2).replace('.', ',')}`;

  const getCategoryIcon = (cat: string) => {
    const opt = categoryOptions.find((c) => c.value === cat);
    if (!opt) return <Package className="h-4 w-4" />;
    const Icon = opt.icon;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <AdminLayout title="Shop – Prodotti">
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
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Nuovo prodotto
          </Button>
        </div>

        {/* Product list */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Nessun prodotto trovato.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {filtered.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                  {/* Image */}
                  <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      getCategoryIcon(product.category)
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <Badge variant={product.in_stock ? 'default' : 'secondary'} className="text-xs flex-shrink-0">
                        {product.in_stock ? 'Disponibile' : 'Esaurito'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(product.category)}
                        {categoryOptions.find((c) => c.value === product.category)?.label || product.category}
                      </span>
                      <span className="font-medium text-foreground">{formatPrice(product.price_cents)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Switch
                      checked={product.in_stock}
                      onCheckedChange={() => toggleStock(product)}
                      aria-label="Disponibilità"
                    />
                    <Button size="icon" variant="ghost" onClick={() => openEdit(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(product)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Modifica prodotto' : 'Nuovo prodotto'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Nome *</Label>
              <Input value={form.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="es. Filtro a tasche F7" />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="filtro-tasche-f7" />
              <p className="text-xs text-muted-foreground mt-1">Identificativo URL, generato automaticamente</p>
            </div>
            <div>
              <Label>Descrizione</Label>
              <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Categoria *</Label>
                <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Prezzo (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={(form.price_cents / 100).toFixed(2)}
                  onChange={(e) => setForm((f) => ({ ...f, price_cents: Math.round(parseFloat(e.target.value || '0') * 100) }))}
                />
              </div>
            </div>
            <div>
              <Label>Immagine prodotto</Label>
              <ImageUpload
                label="Immagine"
                value={form.image_url ? [form.image_url] : []}
                onChange={(urls) => setForm((f) => ({ ...f, image_url: urls[0] || null }))}
                maxImages={1}
                bucket="media"
                folder="shop"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.in_stock}
                onCheckedChange={(v) => setForm((f) => ({ ...f, in_stock: v }))}
              />
              <Label>Disponibile</Label>
            </div>
            <div>
              <Label>Ordine visualizzazione</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value || '0') }))}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annulla</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Salvataggio...' : editingProduct ? 'Salva modifiche' : 'Crea prodotto'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
