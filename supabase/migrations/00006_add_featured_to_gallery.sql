-- Migration: Add featured column to gallery table
-- Run this in the Supabase Dashboard (SQL Editor)

alter table gallery add column if not exists featured boolean not null default false;
