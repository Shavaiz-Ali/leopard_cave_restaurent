-- Migration: Add public update policy for reservations (for cancellation)
-- Run this in the Supabase Dashboard (SQL Editor)

create policy "Allow public update on reservations"
  on reservations
  for update
  to public
  using (true)
  with check (true);
