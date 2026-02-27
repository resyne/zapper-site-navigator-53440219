import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Plus, Minus, Package, Droplets, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const categoryIcons: Record<string, React.ReactNode> = {
  ricambio: <Wrench className="w-4 h-4" />,
  consumabile: <Droplets className="w-4 h-4" />,
};

const categoryLabels: Record<string, string> = {
  ricambio: "Ricambio",
  consumabile: "Consumabile",
};

const formatPrice = (cents: number) => {
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(cents / 100);
};

const Shop = () => {
  const [filter, setFilter] = useState<string>("all");
  const { addItem, totalItems } = useCart();

  const { data: products, isLoading } = useQuery({
    queryKey: ["shop-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shop_products")
        .select("*")
        .eq("in_stock", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const filtered = filter === "all" ? products : products?.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="bg-zapper-black py-16 md:py-24">
          <div className="container px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="bg-primary/20 text-primary border-0 mb-4">
                  <Package className="w-3 h-3 mr-1" /> Shop Ricambi
                </Badge>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                  Ricambi & Consumabili
                </h1>
                <p className="text-lg text-white/70 max-w-xl">
                  Acquista ricambi originali e prodotti consumabili ZAPPER® per mantenere il tuo sistema sempre efficiente.
                </p>
              </div>
              {totalItems > 0 && (
                <Link to="/shop/checkout">
                  <Button variant="accent" size="lg" className="relative">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Carrello
                    <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {totalItems}
                    </span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-background sticky top-16 md:top-20 z-40">
          <div className="container px-4 sm:px-6 py-3 flex gap-2">
            {[
              { key: "all", label: "Tutti" },
              { key: "ricambio", label: "Ricambi" },
              { key: "consumabile", label: "Consumabili" },
            ].map((f) => (
              <Button
                key={f.key}
                variant={filter === f.key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="py-12 md:py-16">
          <div className="container px-4 sm:px-6">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted rounded-t-lg" />
                    <CardContent className="p-5 space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-8 bg-muted rounded w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={() => {
                      addItem({
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        price_cents: product.price_cents,
                        image_url: product.image_url,
                      });
                      toast.success(`${product.name} aggiunto al carrello`);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    category: string;
    price_cents: number;
    image_url: string | null;
  };
  onAdd: () => void;
}

const ProductCard = ({ product, onAdd }: ProductCardProps) => (
  <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="h-48 bg-muted flex items-center justify-center">
      {product.image_url ? (
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
      ) : (
        <Package className="w-16 h-16 text-muted-foreground/30" />
      )}
    </div>
    <CardContent className="p-5">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary" className="text-xs gap-1">
          {categoryIcons[product.category]}
          {categoryLabels[product.category]}
        </Badge>
      </div>
      <h3 className="font-display font-semibold text-lg mb-1 text-foreground">{product.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-foreground">{formatPrice(product.price_cents)}</span>
        <Button variant="accent" size="sm" onClick={onAdd}>
          <Plus className="w-4 h-4 mr-1" /> Aggiungi
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default Shop;
