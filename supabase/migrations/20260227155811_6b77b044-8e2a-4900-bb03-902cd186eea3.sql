
-- Products table for spare parts and consumables
CREATE TABLE public.shop_products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  category text NOT NULL DEFAULT 'consumabile',
  price_cents integer NOT NULL,
  currency text NOT NULL DEFAULT 'EUR',
  image_url text,
  in_stock boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.shop_products ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public can read shop products" ON public.shop_products
  FOR SELECT USING (true);

-- Admin manage
CREATE POLICY "Admins can manage shop products" ON public.shop_products
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Orders table
CREATE TABLE public.shop_orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id text,
  stripe_payment_intent text,
  status text NOT NULL DEFAULT 'pending',
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text,
  shipping_address jsonb,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_cents integer NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'EUR',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.shop_orders ENABLE ROW LEVEL SECURITY;

-- Admin can manage orders
CREATE POLICY "Admins can manage orders" ON public.shop_orders
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Anyone can insert orders (checkout)
CREATE POLICY "Anyone can create orders" ON public.shop_orders
  FOR INSERT WITH CHECK (true);

-- Seed products
INSERT INTO public.shop_products (name, slug, description, category, price_cents, sort_order) VALUES
  ('Pompa dosatrice peristaltica', 'pompa-dosatrice-peristaltica', 'Pompa dosatrice peristaltica di ricambio per sistemi ZAPPER. Compatibile con tutti i modelli.', 'ricambio', 18500, 1),
  ('Elettrovalvola 1/2"', 'elettrovalvola-12', 'Elettrovalvola di ricambio in ottone 1/2" per circuiti idraulici ZAPPER.', 'ricambio', 7500, 2),
  ('Elettrovalvola 3/4"', 'elettrovalvola-34', 'Elettrovalvola di ricambio in ottone 3/4" per circuiti idraulici ZAPPER.', 'ricambio', 8900, 3),
  ('Z-KOR Enzimatico 1L', 'z-kor-enzimatico-1l', 'Prodotto Z-KOR a base enzimatica per il trattamento degli odori. Flacone da 1 litro.', 'consumabile', 3200, 4),
  ('Z-KOR Enzimatico 5L', 'z-kor-enzimatico-5l', 'Prodotto Z-KOR a base enzimatica per il trattamento degli odori. Tanica da 5 litri.', 'consumabile', 12500, 5),
  ('Z-KOR Enzimatico 20L', 'z-kor-enzimatico-20l', 'Prodotto Z-KOR a base enzimatica per il trattamento degli odori. Tanica da 20 litri.', 'consumabile', 39900, 6),
  ('Kit ugelli nebulizzazione', 'kit-ugelli-nebulizzazione', 'Set di 6 ugelli di ricambio per il sistema di nebulizzazione ZAPPER.', 'ricambio', 4500, 7),
  ('Filtro a carboni attivi', 'filtro-carboni-attivi', 'Filtro a carboni attivi di ricambio per modelli Destink e Z-MAX.', 'ricambio', 9800, 8);
