-- Migration: Create menu_images table and storage bucket
-- Run this in the Supabase Dashboard (SQL Editor)

-- 1. Create the menu_images table
create table menu_images (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  url text not null,
  storage_path text,
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

-- Enable RLS
alter table menu_images enable row level security;

-- Policies
create policy "Public can read menu images" on menu_images for select using (true);
create policy "Anyone can insert menu images" on menu_images for insert with check (true);
create policy "Anyone can update menu images" on menu_images for update using (true);
create policy "Anyone can delete menu images" on menu_images for delete using (true);

-- 2. Create the 'menu-images' storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage policies
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Menu Images Public Access' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Menu Images Public Access"
    on storage.objects for select
    using ( bucket_id = 'menu-images' );
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Menu Images Admin Upload' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Menu Images Admin Upload"
    on storage.objects for insert
    with check (
      bucket_id = 'menu-images' 
      AND auth.role() = 'authenticated'
    );
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Menu Images Admin Update' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Menu Images Admin Update"
    on storage.objects for update
    using (
      bucket_id = 'menu-images' 
      AND auth.role() = 'authenticated'
    );
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Menu Images Admin Delete' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Menu Images Admin Delete"
    on storage.objects for delete
    using (
      bucket_id = 'menu-images' 
      AND auth.role() = 'authenticated'
    );
  END IF;
END $$;
