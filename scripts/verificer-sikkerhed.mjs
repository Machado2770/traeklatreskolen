// Måler om Supabase faktisk er lukket for offentligheden.
// Kør:  node scripts/verificer-sikkerhed.mjs
//
// Bruger den offentlige nøgle fra .env.local. Når legacy-JWT'erne er
// deaktiveret, sæt i stedet PUBLIC_KEY_TIL_TEST=sb_publishable_... i .env.local.
//
// Baggrund: 6. sep. 2026 var alle tabeller åbne, fordi de havde politikker med
// USING true for rollen public — RLS alene beskytter intet. Kør denne efter
// enhver ændring af politikker eller nøgler.
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = Object.fromEntries(
  fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);
const publicKey = env.PUBLIC_KEY_TIL_TEST || env.LEGACY_ANON_JWT_KUN_TIL_TEST || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!publicKey) { console.error('Mangler en offentlig nøgle at teste med. Sæt PUBLIC_KEY_TIL_TEST i .env.local.'); process.exit(2); }

const pub   = createClient(env.NEXT_PUBLIC_SUPABASE_URL, publicKey);
const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const TABLES = ['admins', 'participants', 'calendar_items', 'courses_cms', 'shop_products'];
let fail = 0;
const ok = (c, m) => { console.log(`  ${c ? '✔' : '✗ FEJL'}  ${m}`); if (!c) fail++; };

console.log('── Tabeller lukket for den offentlige nøgle ──');
for (const t of TABLES) {
  const { data, error } = await pub.from(t).select('*').limit(1);
  ok(!!error || data.length === 0, `${t.padEnd(16)} ${error ? error.message : (data.length === 0 ? 'ingen rækker' : `ÅBEN — ${data.length} række(r)!`)}`);
}

console.log('\n── Skrivning blokeret (sentinel — rører ikke rigtige data) ──');
const S = 'zz-sikkerhedstest';
const { error: insErr } = await pub.from('courses_cms').insert({ slug: S, title: 'test', price: '0 kr.' });
ok(!!insErr, `INSERT ${insErr ? 'blokeret' : '— KUNNE INDSÆTTE!'}`);
await admin.from('courses_cms').delete().eq('slug', S);

console.log('\n── Billed-bucketen lukket ──');
const f = 'ZZ-sikkerhedstest.txt';
const { error: upErr } = await pub.storage.from('site-images').upload(f, new Blob(['x']), { contentType: 'text/plain' });
ok(!!upErr, `upload ${upErr ? 'blokeret' : '— KUNNE UPLOADE!'}`);
if (!upErr) await admin.storage.from('site-images').remove([f]);

console.log('\n── Serveren kan stadig alt (ellers er sitet nede) ──');
for (const t of TABLES) {
  const { count, error } = await admin.from(t).select('*', { count: 'exact', head: true });
  ok(!error, `${t.padEnd(16)} ${error ? error.message : count + ' rækker'}`);
}

console.log(fail ? `\n✗ ${fail} fejl — databasen er IKKE lukket.` : '\n✔ Alt lukket. Serveren kører.');
process.exit(fail ? 1 : 0);
