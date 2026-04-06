-- Script to create an initial admin user in Supabase Auth
-- Run this in your Supabase SQL Editor.
-- NOTE: If this script throws an error, the easiest and most reliable way to create an admin user
-- is by going to your Supabase Dashboard -> Authentication -> Users -> "Add User" -> "Create New User"

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  uid uuid := uuid_generate_v4();
BEGIN
  -- 1. Create the user
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    uid,
    'authenticated',
    'authenticated',
    'admin@leopardcave.com',
    crypt('admin@leopardcave123', gen_salt('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{"role":"admin"}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
  );

  -- 2. Create the identity for the user
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  )
  VALUES (
    uuid_generate_v4(),
    uid,
    format('{"sub":"%s","email":"%s"}', uid::text, 'admin@leopardcave.com')::jsonb,
    'email',
    uid::text,
    current_timestamp,
    current_timestamp,
    current_timestamp
  );

END $$;
