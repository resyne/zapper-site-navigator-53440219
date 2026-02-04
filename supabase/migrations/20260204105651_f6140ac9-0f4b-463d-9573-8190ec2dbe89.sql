-- Add datasheet_url to models table
ALTER TABLE public.models ADD COLUMN IF NOT EXISTS datasheet_url text;

-- Create table to collect lead data for datasheet requests
CREATE TABLE public.datasheet_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id uuid REFERENCES public.models(id) ON DELETE SET NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.datasheet_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit datasheet requests"
ON public.datasheet_requests
FOR INSERT
WITH CHECK (true);

-- Only admins can view requests
CREATE POLICY "Admins can view datasheet requests"
ON public.datasheet_requests
FOR SELECT
USING (is_admin());

-- Only admins can delete requests
CREATE POLICY "Admins can delete datasheet requests"
ON public.datasheet_requests
FOR DELETE
USING (is_admin());