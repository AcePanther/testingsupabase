-- Enables uuid generation (run once per DB)
create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text unique not null,
  created_at timestamp with time zone default now()
);

-- Seed sample data
insert into users (name, email) values
  ('Alice Johnson', 'alice@example.com'),
  ('Bob Smith', 'bob@example.com')
on conflict (email) do nothing;
