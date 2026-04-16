-- Add advance_payment_status column to reservations table
ALTER TABLE reservations 
ADD COLUMN IF NOT EXISTS advance_payment_status TEXT 
DEFAULT 'pending' 
CHECK (advance_payment_status IN ('pending', 'received'));

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_reservations_advance_payment_status ON reservations(advance_payment_status);

-- Comment
COMMENT ON COLUMN reservations.advance_payment_status IS 'Status of advance payment: pending or received';
