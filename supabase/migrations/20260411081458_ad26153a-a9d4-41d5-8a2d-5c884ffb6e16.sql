
-- Create a validation trigger to enforce field length limits on shared_readings
CREATE OR REPLACE FUNCTION public.validate_shared_reading()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Validate question length
  IF NEW.question IS NOT NULL AND char_length(NEW.question) > 500 THEN
    RAISE EXCEPTION 'Question must be 500 characters or less';
  END IF;

  -- Validate interpretation length
  IF char_length(NEW.interpretation) > 10000 THEN
    RAISE EXCEPTION 'Interpretation must be 10000 characters or less';
  END IF;

  -- Validate reading_type
  IF NEW.reading_type NOT IN ('tarot', 'rune', 'angel') THEN
    RAISE EXCEPTION 'Invalid reading type';
  END IF;

  -- Validate cards is an array and not too large
  IF jsonb_typeof(NEW.cards) != 'array' THEN
    RAISE EXCEPTION 'Cards must be a JSON array';
  END IF;

  IF jsonb_array_length(NEW.cards) > 20 THEN
    RAISE EXCEPTION 'Too many cards';
  END IF;

  -- Validate total payload size (cards JSONB under 50KB)
  IF octet_length(NEW.cards::text) > 51200 THEN
    RAISE EXCEPTION 'Cards payload too large';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_shared_reading_trigger
  BEFORE INSERT ON public.shared_readings
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_shared_reading();
