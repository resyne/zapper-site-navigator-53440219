-- Change datasheet_url from text to JSONB to support multiple languages
-- Format: { "it": "url", "en": "url", "fr": "url", ... }
ALTER TABLE public.models 
ALTER COLUMN datasheet_url TYPE jsonb 
USING CASE 
  WHEN datasheet_url IS NOT NULL THEN jsonb_build_object('it', datasheet_url)
  ELSE '{}'::jsonb
END;

-- Set default to empty object
ALTER TABLE public.models 
ALTER COLUMN datasheet_url SET DEFAULT '{}'::jsonb;