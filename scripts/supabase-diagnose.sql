-- Læser kun. Ændrer intet. Kør i SQL Editor og send resultatet tilbage.
SELECT 'RLS' AS hvad, tablename AS navn, rowsecurity::text AS vaerdi
FROM   pg_tables
WHERE  schemaname='public'
  AND  tablename IN ('admins','participants','calendar_items','courses_cms','shop_products')
UNION ALL
SELECT 'POLITIK', tablename||' · '||policyname, cmd||' → '||roles::text
FROM   pg_policies
WHERE  schemaname='public'
  AND  tablename IN ('admins','participants','calendar_items','courses_cms','shop_products')
UNION ALL
SELECT 'ANON-RETTIGHED', t, has_table_privilege('anon','public.'||t,'SELECT')::text
FROM   unnest(array['admins','participants','calendar_items','courses_cms','shop_products']) t
UNION ALL
SELECT 'JEG KØRER SOM', 'current_user', current_user::text
UNION ALL
SELECT 'EJER AF TABEL', tablename, tableowner
FROM   pg_tables
WHERE  schemaname='public'
  AND  tablename IN ('admins','participants','calendar_items','courses_cms','shop_products')
ORDER  BY 1,2;
