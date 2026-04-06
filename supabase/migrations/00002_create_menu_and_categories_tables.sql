create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  status text not null check (status in ('Active', 'Inactive')) default 'Active',
  created_at timestamptz default now()
);

create table menu_items (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category_id uuid references categories(id) on delete cascade,
  price text not null,
  description text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table categories enable row level security;
alter table menu_items enable row level security;

-- Policies for Categories (allowing full access for admin logic right now, similar to existing setup)
create policy "Public can read categories" on categories for select using (true);
create policy "Anyone can insert categories" on categories for insert with check (true);
create policy "Anyone can update categories" on categories for update using (true);
create policy "Anyone can delete categories" on categories for delete using (true);

-- Policies for Menu Items
create policy "Public can read menu items" on menu_items for select using (true);
create policy "Anyone can insert menu items" on menu_items for insert with check (true);
create policy "Anyone can update menu items" on menu_items for update using (true);
create policy "Anyone can delete menu items" on menu_items for delete using (true);
