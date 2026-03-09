
CREATE TABLE public.shared_readings (
  id TEXT PRIMARY KEY DEFAULT encode(gen_random_bytes(8), 'hex'),
  reading_type TEXT NOT NULL DEFAULT 'tarot',
  question TEXT,
  cards JSONB NOT NULL DEFAULT '[]'::jsonb,
  interpretation TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.shared_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read shared readings"
  ON public.shared_readings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert shared readings"
  ON public.shared_readings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
