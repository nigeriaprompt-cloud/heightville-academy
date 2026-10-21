-- Run this once in Supabase: SQL Editor > New query > paste > Run.
create extension if not exists pgcrypto;

create table staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  username text not null unique,
  role text not null check (role in ('proprietor','teacher')),
  pw_lookup text not null,
  pw_enc text not null,
  created_at timestamptz not null default now()
);
create table students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  class_level text not null,
  pw_lookup text not null unique,   -- one student per password (students sign in with the password only)
  pw_enc text not null,
  created_by uuid references staff(id) on delete set null,
  created_at timestamptz not null default now()
);
create table exams (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null,
  class_level text not null,        -- a class, or 'All classes'
  timed boolean not null default false,
  duration_minutes int,
  published boolean not null default false,
  created_by uuid references staff(id) on delete set null,
  created_at timestamptz not null default now()
);
create table exam_questions (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references exams(id) on delete cascade,
  position int not null default 0,
  question text not null,
  options jsonb not null,
  answer_index int not null,
  explanation text,
  created_at timestamptz not null default now()
);
create table attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  exam_id uuid references exams(id) on delete cascade,   -- null for practice sessions
  label text not null,
  subject text,
  started_at timestamptz not null default now(),
  duration_seconds int,
  submitted_at timestamptz,
  score int,
  total int,
  percent numeric
);
create unique index one_attempt_per_exam on attempts (student_id, exam_id) where exam_id is not null;
create table settings (key text primary key, value jsonb not null);
insert into settings values ('ranking_enabled', 'false'::jsonb) on conflict do nothing;
create table login_attempts (ip text not null, at timestamptz not null default now());
create index on login_attempts (ip, at);

-- Lock every table to the public key. Only the server (service role key) can read or write.
alter table staff enable row level security;
alter table students enable row level security;
alter table exams enable row level security;
alter table exam_questions enable row level security;
alter table attempts enable row level security;
alter table settings enable row level security;
alter table login_attempts enable row level security;

-- News and events written by the proprietor
create table news (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('News','Event')),
  title text not null,
  body text not null,
  event_date date,
  created_by uuid references staff(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table news enable row level security;
