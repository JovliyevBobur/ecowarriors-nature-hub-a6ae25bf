-- Add completed field to events table for plans status tracking
ALTER TABLE public.events ADD COLUMN completed boolean NOT NULL DEFAULT false;