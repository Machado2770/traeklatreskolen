# Træklatreskolen v8

Version 8 gør de sidste fire ting klar før go-live:

1. Admin-beskyttelse via NextAuth og middleware
2. Opdatering af betalingsstatus i admin-UI
3. Filtrering på kursus, betalingsstatus og søgning
4. Eksport til CSV

## Opsætning

```bash
npm install
npm run dev
```

## Environment variables

Kopiér `.env.example` til `.env.local` og udfyld:

- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Supabase SQL

Opret tabellen sådan:

```sql
create table if not exists participants (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  email text not null,
  phone text,
  course text not null,
  notes text,
  payment_status text not null default 'pending'
);
```

## Login

Besøg `/login` eller `/api/auth/signin`.

## Go-live checkliste

Før I går online, bør I gøre dette:

- udfyld miljøvariabler i Vercel
- opret `participants` i Supabase
- test bookingflow
- test login og /admin
- test CSV-eksport
- test opdatering af betalingsstatus
- tilpas bankoplysninger i `/app/booking/page.jsx`

## Bemærkning

Denne version fokuserer på de fire sidste mangler før go-live. Den antager, at jeres eksisterende frontend kan kobles på eller erstattes gradvist.
