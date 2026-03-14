-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  stripe_customer_id text unique,
  stripe_subscription_id text,
  subscription_status text default 'free' check (subscription_status in ('free', 'active', 'canceled', 'past_due')),
  uploads_used integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Documents table
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  file_name text not null,
  file_url text not null,
  file_size integer not null,
  page_count integer,
  extracted_text text,
  status text default 'processing' check (status in ('processing', 'ready', 'failed')),
  created_at timestamptz default now()
);

-- Quizzes table
create table public.quizzes (
  id uuid default uuid_generate_v4() primary key,
  document_id uuid references public.documents(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  quiz_type text not null check (quiz_type in ('multiple_choice', 'flashcards', 'study_guide')),
  content jsonb not null,
  created_at timestamptz default now()
);

-- Quiz attempts table
create table public.quiz_attempts (
  id uuid default uuid_generate_v4() primary key,
  quiz_id uuid references public.quizzes(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  score integer,
  answers jsonb,
  completed_at timestamptz default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.documents enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_attempts enable row level security;

-- RLS policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Users can CRUD own documents" on public.documents for all using (auth.uid() = user_id);
create policy "Users can CRUD own quizzes" on public.quizzes for all using (auth.uid() = user_id);
create policy "Users can CRUD own attempts" on public.quiz_attempts for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Storage bucket for documents
-- Run this in Supabase SQL Editor:
-- insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- values ('documents', 'documents', false, 10485760, array['application/pdf']);

-- Storage policy: users can upload to their own folder
-- create policy "Users can upload to own folder"
-- on storage.objects for insert
-- with check (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

-- Storage policy: users can read their own files
-- create policy "Users can read own files"
-- on storage.objects for select
-- using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

-- Storage policy: users can delete their own files
-- create policy "Users can delete own files"
-- on storage.objects for delete
-- using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);
