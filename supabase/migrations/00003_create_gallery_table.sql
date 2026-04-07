-- Migration: Create gallery table for images and videos
-- Run in Supabase SQL Editor

create table gallery (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('image', 'video')),
  url text not null,
  storage_path text,
  title text not null,
  alt_text text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table gallery enable row level security;

-- Policies
create policy "Public can read gallery" on gallery for select using (true);
create policy "Anyone can insert gallery items" on gallery for insert with check (true);
create policy "Anyone can update gallery items" on gallery for update using (true);
create policy "Anyone can delete gallery items" on gallery for delete using (true);
