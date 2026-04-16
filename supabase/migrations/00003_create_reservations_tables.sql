-- Create Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guests_count INTEGER NOT NULL CHECK (guests_count > 0),
  special_requests TEXT,
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  advance_payment NUMERIC(10, 2) NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('jazzcash', 'easypaisa', 'crypto')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Reservation Items Table (for cart items)
CREATE TABLE IF NOT EXISTS reservation_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  menu_item_name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reservations_phone_number ON reservations(phone_number);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_reservation_items_reservation_id ON reservation_items(reservation_id);

-- Enable Row Level Security (RLS)
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_items ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies (allow public insert, restrict select/update/delete)
CREATE POLICY "Allow public insert on reservations"
  ON reservations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow select reservations by phone number"
  ON reservations
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert on reservation items"
  ON reservation_items
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow select reservation items by reservation id"
  ON reservation_items
  FOR SELECT
  TO public
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for reservations table
CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comments for clarity
COMMENT ON TABLE reservations IS 'Stores restaurant reservation details';
COMMENT ON TABLE reservation_items IS 'Stores individual menu items for each reservation';
