-- Migration: Create blogs table and blog-images storage bucket
-- Run this in the Supabase Dashboard (SQL Editor)

-- 1. Create the blogs table
create table blogs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  image text,
  image_storage_path text,
  author text not null default 'Leopard Cave Team',
  featured boolean not null default false,
  status text not null check (status in ('Active', 'Draft')) default 'Draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table blogs enable row level security;

-- Policies for Blogs (matching existing pattern)
create policy "Public can read blogs" on blogs for select using (true);
create policy "Anyone can insert blogs" on blogs for insert with check (true);
create policy "Anyone can update blogs" on blogs for update using (true);
create policy "Anyone can delete blogs" on blogs for delete using (true);

-- Auto-update the updated_at timestamp
create or replace function update_blogs_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blogs_updated_at
  before update on blogs
  for each row
  execute function update_blogs_updated_at();

-- 2. Create the 'blog-images' storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage policies for blog-images bucket
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Blog Images Public Access' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Blog Images Public Access"
    on storage.objects for select
    using ( bucket_id = 'blog-images' );
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Blog Images Admin Upload' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Blog Images Admin Upload"
    on storage.objects for insert
    with check (
      bucket_id = 'blog-images' 
      AND auth.role() = 'authenticated'
    );
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Blog Images Admin Update' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Blog Images Admin Update"
    on storage.objects for update
    using (
      bucket_id = 'blog-images' 
      AND auth.role() = 'authenticated'
    );
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Blog Images Admin Delete' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Blog Images Admin Delete"
    on storage.objects for delete
    using (
      bucket_id = 'blog-images' 
      AND auth.role() = 'authenticated'
    );
  END IF;
END $$;
