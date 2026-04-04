create table reservations (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone_number text not null,
  reservation_date date not null,
  reservation_time time not null,
  guests_count integer not null check (guests_count > 0),
  special_requests text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table reservations enable row level security;

-- Policies
create policy "Anyone can insert a reservation" on reservations for insert with check (true);
create policy "Public can read reservations for demo" on reservations for select using (true);
