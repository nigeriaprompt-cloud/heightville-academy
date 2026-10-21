-- Only needed if you already ran the earlier schema.sql. Run once in Supabase > SQL Editor.
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('News','Event')),
  title text not null,
  body text not null,
  event_date date,
  created_by uuid references staff(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table news enable row level security;
