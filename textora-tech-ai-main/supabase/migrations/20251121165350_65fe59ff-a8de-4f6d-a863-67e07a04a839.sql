-- Create rate limiting table for edge functions
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier text NOT NULL,
  endpoint text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_endpoint 
ON public.rate_limits(identifier, endpoint, window_start);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- No public access to rate limits table
CREATE POLICY "No public access to rate limits"
ON public.rate_limits FOR ALL
USING (false);

-- Add explicit SELECT policy for leads table (requires authentication)
CREATE POLICY "Authenticated users can view leads"
ON public.leads FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Add UPDATE and DELETE policies for authenticated users
CREATE POLICY "Authenticated users can update leads"
ON public.leads FOR UPDATE
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete leads"
ON public.leads FOR DELETE
USING (auth.uid() IS NOT NULL);