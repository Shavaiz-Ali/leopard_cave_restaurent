-- Migration: Add storage_path to gallery table and create storage bucket
-- Run this in the Supabase Dashboard (SQL Editor)

-- 1. Add storage_path column to the gallery table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='gallery' AND column_name='storage_path') THEN
    ALTER TABLE gallery ADD COLUMN storage_path text;
  END IF;
END $$;

-- 2. Create the 'gallery' storage bucket if it doesn't exist
-- Note: 'public: true' allows anyone with the URL to view the files
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up storage policies for the 'gallery' bucket
-- These policies allow anyone to view files, but only authenticated users (admins) to manage them

-- Policy to allow public access to the bucket
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Public Access"
    on storage.objects for select
    using ( bucket_id = 'gallery' );
  END IF;
END $$;

-- Policy to allow authenticated users (admins) to upload files
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin Upload' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Admin Upload"
    on storage.objects for insert
    with check (
      bucket_id = 'gallery' 
      AND auth.role() = 'authenticated'
    );
  END IF;
END $$;

-- Policy to allow authenticated users (admins) to update files
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin Update' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Admin Update"
    on storage.objects for update
    using (
      bucket_id = 'gallery' 
      AND auth.role() = 'authenticated'
    );
  END IF;
END $$;

-- Policy to allow authenticated users (admins) to delete files
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin Delete' AND tablename = 'objects' AND schemaname = 'storage') THEN
    create policy "Admin Delete"
    on storage.objects for delete
    using (
      bucket_id = 'gallery' 
      AND auth.role() = 'authenticated'
    );
  END IF;
END $$;
