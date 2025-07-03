-- extensies (eenmalig)
create extension if not exists pgcrypto;
create extension if not exists vector;

-- provider-tabel
create table if not exists provider (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  specialty text,
  city text,
  rating numeric(2,1) default 0,
  description text,
  modality_default text default 'clinic',
  embedding vector(384)
);

-- slot-tabel
create table if not exists slot (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  provider_id uuid references provider(id),
  start_at timestamptz,
  end_at timestamptz,
  price_eur numeric(6,2) default 0,
  is_booked boolean default false,
  modality text default 'clinic'
);

-- booking-tabel
create table if not exists booking (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  slot_id uuid references slot(id),
  customer_name text,
  customer_email text,
  status text default 'PENDING',
  intake_json jsonb default '{}'::jsonb,
  pdf_url text,
  payment_intent_id text
);

