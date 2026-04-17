create table reservation_items (
  id uuid primary key default uuid_generate_v4(),
  reservation_id uuid not null references reservations(id) on delete cascade,
  menu_item_id uuid not null,
  menu_item_name text not null,
  price numeric not null,
  quantity integer not null check (quantity > 0),
  created_at timestamptz default now()
);

-- Enable RLS
alter table reservation_items enable row level security;

-- Policies
create policy "Allow public insert on reservation_items" on reservation_items for insert with check (true);
create policy "Allow public select on reservation_items" on reservation_items for select using (true);
