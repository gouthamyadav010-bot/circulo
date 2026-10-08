-- Circulo organization accounts: one organization is created with each signup.
-- Apply this file in Supabase SQL Editor before testing registration.

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  organization_type text not null check (organization_type in ('company', 'recycler')),
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_memberships (
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id),
  unique (user_id)
);

create index if not exists organization_memberships_user_id_idx
  on public.organization_memberships (user_id);

create or replace function public.is_organization_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_memberships membership
    where membership.organization_id = target_organization_id
      and membership.user_id = (select auth.uid())
  );
$$;

create or replace function public.is_organization_admin(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_memberships membership
    where membership.organization_id = target_organization_id
      and membership.user_id = (select auth.uid())
      and membership.role in ('owner', 'admin')
  );
$$;

revoke all on function public.is_organization_member(uuid) from public;
revoke all on function public.is_organization_admin(uuid) from public;
grant execute on function public.is_organization_member(uuid) to authenticated;
grant execute on function public.is_organization_admin(uuid) to authenticated;

alter table public.user_profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;

drop policy if exists "Users can read their own profile" on public.user_profiles;
create policy "Users can read their own profile"
  on public.user_profiles for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Users can update their own profile" on public.user_profiles;
create policy "Users can update their own profile"
  on public.user_profiles for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "Organization members can read their organization" on public.organizations;
create policy "Organization members can read their organization"
  on public.organizations for select to authenticated
  using (public.is_organization_member(id));

drop policy if exists "Organization admins can update their organization" on public.organizations;
create policy "Organization admins can update their organization"
  on public.organizations for update to authenticated
  using (public.is_organization_admin(id))
  with check (public.is_organization_admin(id));

drop policy if exists "Users can read memberships in their organization" on public.organization_memberships;
create policy "Users can read memberships in their organization"
  on public.organization_memberships for select to authenticated
  using (
    user_id = (select auth.uid())
    or public.is_organization_member(organization_id)
  );

grant select, update on public.user_profiles to authenticated;
grant select, update on public.organizations to authenticated;
grant select on public.organization_memberships to authenticated;

create or replace function public.create_circulo_organization_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_organization_name text;
  requested_organization_type text;
  new_organization_id uuid;
  requested_full_name text;
begin
  requested_organization_name := trim(coalesce(new.raw_user_meta_data ->> 'organization_name', ''));
  requested_organization_type := trim(coalesce(new.raw_user_meta_data ->> 'organization_type', ''));
  requested_full_name := trim(coalesce(new.raw_user_meta_data ->> 'full_name', ''));

  if char_length(requested_organization_name) not between 2 and 120 then
    raise exception 'Organization name must be between 2 and 120 characters';
  end if;

  if requested_organization_type not in ('company', 'recycler') then
    raise exception 'Organization type must be company or recycler';
  end if;

  if char_length(requested_full_name) not between 2 and 120 then
    raise exception 'Name must be between 2 and 120 characters';
  end if;

  insert into public.user_profiles (user_id, full_name)
  values (new.id, requested_full_name);

  insert into public.organizations (name, organization_type, created_by)
  values (requested_organization_name, requested_organization_type, new.id)
  returning id into new_organization_id;

  insert into public.organization_memberships (organization_id, user_id, role)
  values (new_organization_id, new.id, 'owner');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_circulo_organization on auth.users;
create trigger on_auth_user_created_circulo_organization
  after insert on auth.users
  for each row execute procedure public.create_circulo_organization_for_new_user();
