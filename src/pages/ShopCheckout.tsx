import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const formatPrice = (cents: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(cents / 100);

const ShopCheckout = () => {
  const { items, updateQuantity, removeItem, clearCart, totalCents } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    cap: "",
    province: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async () => {
    if (!form.name || !form.email) {
      toast.error("Inserisci nome e email");
      return;
    }
    if (items.length === 0) {
      toast.error("Il carrello è vuoto");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("stripe-checkout", {
        body: {
          items: items.map((i) => ({
            name: i.name,
            price_cents: i.price_cents,
            quantity: i.quantity,
          })),
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
          },
          shipping: {
            address: form.address,
            city: form.city,
            cap: form.cap,
            province: form.province,
          },
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Save order locally before redirect
        clearCart();
        window.location.href = data.url;
      } else {
        toast.error("Errore durante la creazione del pagamento. Riprova.");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error("Stripe non è ancora configurato. Contattaci per ordinare.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="container px-4 sm:px-6 py-24 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-6" />
            <h1 className="text-2xl font-display font-bold mb-4 text-foreground">Carrello vuoto</h1>
            <p className="text-muted-foreground mb-8">Non hai ancora aggiunto prodotti al carrello.</p>
            <Button variant="accent" asChild>
              <Link to="/shop">Torna allo shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24 pb-16">
        <div className="container px-4 sm:px-6 py-8">
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Continua lo shopping
          </Link>

          <h1 className="text-3xl font-display font-bold mb-8 text-foreground">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prodotti nel carrello</CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-6 h-6 text-muted-foreground/30" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{formatPrice(item.price_cents)} cad.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium text-foreground">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <span className="font-semibold w-24 text-right text-foreground">{formatPrice(item.price_cents * item.quantity)}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeItem(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dati di spedizione</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome e cognome *</Label>
                    <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefono</Label>
                    <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Indirizzo</Label>
                    <Input id="address" name="address" value={form.address} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Città</Label>
                    <Input id="city" name="city" value={form.city} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cap">CAP</Label>
                    <Input id="cap" name="cap" value={form.cap} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Provincia</Label>
                    <Input id="province" name="province" value={form.province} onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-36">
                <CardHeader>
                  <CardTitle className="text-lg">Riepilogo ordine</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                      <span className="text-foreground font-medium">{formatPrice(item.price_cents * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Spedizione</span>
                      <span>Da calcolare</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-bold text-lg text-foreground">
                      <span>Totale</span>
                      <span>{formatPrice(totalCents)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">IVA inclusa</p>
                  </div>
                  <Button
                    variant="cta"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    {loading ? "Elaborazione..." : "Paga con Stripe"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Verrai reindirizzato alla pagina di pagamento sicura Stripe
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopCheckout;
