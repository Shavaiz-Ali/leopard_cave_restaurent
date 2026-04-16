-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public insert on reservations" ON reservations;
DROP POLICY IF EXISTS "Allow public select on reservations" ON reservations;
DROP POLICY IF EXISTS "Allow public insert on reservation_items" ON reservation_items;
DROP POLICY IF EXISTS "Allow select reservation items by reservation id" ON reservation_items;

-- Enable RLS (in case not already enabled)
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reservations table
CREATE POLICY "Allow public insert on reservations"
  ON reservations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public select on reservations"
  ON reservations
  FOR SELECT
  TO public
  USING (true);

-- RLS Policies for reservation_items table
CREATE POLICY "Allow public insert on reservation_items"
  ON reservation_items
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow select reservation items by reservation id"
  ON reservation_items
  FOR SELECT
  TO public
  USING (true);

-- Verify policies
SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN ('reservations', 'reservation_items');
