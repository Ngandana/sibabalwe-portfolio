-- Conversation log for the portfolio AI assistant.
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
--
-- Deliberately stores NO personal data: no IP addresses, no user agents, no
-- cookies. session_id is a random value generated in the browser purely so
-- multi-turn conversations group together — it identifies a conversation, not
-- a person, and it dies with the browser tab.

create table if not exists public.chat_logs (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  session_id   text,
  turn_index   integer,
  question     text not null,
  answer       text not null,
  model        text,
  latency_ms   integer
);

create index if not exists chat_logs_created_at_idx on public.chat_logs (created_at desc);
create index if not exists chat_logs_session_idx    on public.chat_logs (session_id, turn_index);

-- Lock the table down. RLS is on with no policies, so the anon/public key can
-- neither read nor write it. Only the service-role key (used server-side in
-- the Vercel function, never shipped to the browser) can touch these rows.
alter table public.chat_logs enable row level security;

-- Handy views for actually reading the thing:

-- What visitors ask most, roughly grouped.
create or replace view public.chat_common_questions as
select lower(trim(question)) as question, count(*) as times_asked, max(created_at) as last_asked
from public.chat_logs
group by 1
order by times_asked desc, last_asked desc;

-- Recent conversations, in reading order.
create or replace view public.chat_recent as
select session_id, turn_index, created_at, question, answer, latency_ms
from public.chat_logs
order by created_at desc, turn_index asc;
