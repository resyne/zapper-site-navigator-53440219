
-- Table for partner documents (technical sheets, videos, etc.)
CREATE TABLE public.partner_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'scheda_tecnica',
  file_url text NOT NULL,
  thumbnail_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.partner_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage partner documents" ON public.partner_documents
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Partners can read partner documents" ON public.partner_documents
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'partner'));

-- Table for partner price lists
CREATE TABLE public.partner_price_lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.partner_price_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage partner price lists" ON public.partner_price_lists
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Partners can read partner price lists" ON public.partner_price_lists
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'partner'));

-- Table for partner-specific pricing (dynamic discounts)
CREATE TABLE public.partner_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  model_id uuid REFERENCES public.models(id) ON DELETE CASCADE,
  discount_percent numeric(5,2) NOT NULL DEFAULT 0,
  custom_price_cents integer,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.partner_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage partner pricing" ON public.partner_pricing
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Partners can read own pricing" ON public.partner_pricing
  FOR SELECT TO authenticated USING (partner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'partner'));

-- Triggers
CREATE TRIGGER update_partner_documents_updated_at BEFORE UPDATE ON public.partner_documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partner_price_lists_updated_at BEFORE UPDATE ON public.partner_price_lists
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partner_pricing_updated_at BEFORE UPDATE ON public.partner_pricing
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
