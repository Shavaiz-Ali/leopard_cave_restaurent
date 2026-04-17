-- Migration: Add payment_method column to reservations table
-- Run this in the Supabase Dashboard (SQL Editor)

alter table reservations add column if not exists total_amount text not null default '0';
alter table reservations add column if not exists total_amount text not null default '0';

