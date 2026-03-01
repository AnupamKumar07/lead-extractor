-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS (Public profile assumption)
create table if not exists public.users (
  id uuid references auth.users not null primary key,
  email text,
  name text,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- PREMIUM CRM LAYER (Validated Data)
-- ==========================================

-- COMPANIES
create table if not exists public.companies (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  domain text unique, -- UNIQUE domain prevents duplicates
  website text,
  email text,
  phone text,
  industry text,
  location text,
  founded_year int,
  linkedin_url text,
  
  -- Premium Intelligence Fields
  estimated_company_size text,
  incorporation_date text,
  funding_status text,
  verification_status text default 'Unverified',
  description text,
  revenue_range text,

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- LEADS
create table if not exists public.leads (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id),
  first_name text,
  last_name text,
  email text unique, -- UNIQUE constraint critical for Apollo-style sync
  phone text,
  job_title text,
  
  -- Classical Fields
  status text default 'New', -- 'New', 'Contacted', 'Qualified', 'Converted', 'Lost'
  source text default 'Manual',
  linkedin_url text unique,
  notes text,

  -- Premium AI Intelligence Fields
  lead_score int default 0,
  opportunity_score int default 0,
  data_confidence_score int default 0,
  trend_alignment_score int default 0,
  deal_potential_estimate text,
  risk_flag text default 'Low', -- 'Low', 'Medium', 'High'
  freshness_tag text default 'Recently Updated', -- 'Recently Updated', '1-6 Months', 'Outdated'
  engagement_status text default 'Cold',
  smart_tags jsonb default '[]'::jsonb, -- dynamic generated arrays like "AI Startup", "Bootstrapped"
  intent_signals jsonb default '[]'::jsonb, -- news arrays, hiring spikes etc.

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- RAW DATA LAYER (Layer 2 API Integration)
-- ==========================================
create table if not exists public.raw_companies (
  id uuid default uuid_generate_v4() primary key,
  raw_data jsonb not null, -- The entire unparsed external payload
  source text not null, -- e.g., 'Crunchbase', 'OpenCorporates', 'LinkedIn'
  processed boolean default false,
  extracted_domain text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.raw_leads (
  id uuid default uuid_generate_v4() primary key,
  raw_data jsonb not null,
  source text not null, 
  processed boolean default false,
  extracted_email text,
  extracted_linkedin text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.raw_news (
  id uuid default uuid_generate_v4() primary key,
  raw_data jsonb not null,
  source text not null,
  company_domain text,
  processed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- SYSTEM & OUTREACH
-- ==========================================

-- OUTREACH
create table if not exists public.outreach (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references public.leads(id),
  type text, -- 'Email', 'LinkedIn', 'Call'
  status text default 'Draft', -- 'Draft', 'Sent', 'Replied'
  subject text,
  content text,
  sent_at timestamp with time zone,
  response_received boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SCRAPER JOBS
create table if not exists public.scraper_jobs (
  id uuid default uuid_generate_v4() primary key,
  type text not null, -- 'LinkedIn', 'GoogleMaps', etc.
  status text default 'Pending', -- 'Pending', 'Running', 'Completed', 'Failed'
  url text,
  leads_found int default 0,
  duration int,
  error text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SOURCES CONFIG
create table if not exists public.sources_config (
  id uuid default uuid_generate_v4() primary key,
  source_name text unique not null, -- 'LinkedIn', 'GoogleMaps', 'Apollo'
  is_enabled boolean default false,
  api_key text,
  settings jsonb default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PROXIES
create table if not exists public.proxies (
  id uuid default uuid_generate_v4() primary key,
  ip_address text not null,
  port int not null,
  username text,
  password text,
  status text default 'Active', -- 'Active', 'Dead'
  last_checked_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ANALYTICS EVENTS (Optional, for detailed tracking)
create table if not exists public.analytics_events (
  id uuid default uuid_generate_v4() primary key,
  event_type text not null,
  properties jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
