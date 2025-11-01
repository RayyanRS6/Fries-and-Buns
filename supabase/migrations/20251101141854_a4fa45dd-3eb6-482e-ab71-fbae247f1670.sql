-- Fix search_path for update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix search_path for generate_order_number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_number TEXT;
  counter INTEGER;
BEGIN
  SELECT COALESCE(MAX(SUBSTRING(order_number FROM 6)::INTEGER), 0) + 1
  INTO counter
  FROM public.orders
  WHERE order_number LIKE 'ORD-%';
  
  new_number := 'ORD-' || LPAD(counter::TEXT, 6, '0');
  RETURN new_number;
END;
$$;