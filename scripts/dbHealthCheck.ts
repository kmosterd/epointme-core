/**
 * dbHealthCheck.ts – controleert in één run of het schema, extensies,
 * kolommen, voorbeeld‐data en functie ‘match_provider’ aanwezig zijn.
 *
 * Werkwijze:
 *   1.  Zet .env.local met NEXT_PUBLIC_SUPABASE_URL en SUPABASE_SERVICE_ROLE
 *   2.  pnpm add -D ts-node dotenv @supabase/supabase-js
 *   3.  npx ts-node scripts/dbHealthCheck.ts
 */

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// ──────────────────────────────────────────────────────────── helpers
const supa = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

// list_extensions(): aangemaakt via SQL-editor
// column_exists(table_name, col_name): idem
type BoolRow = { [k: string]: boolean };

function logResult(label: string, pass: boolean) {
  console.log(`${pass ? '✅' : '❌'}  ${label}`);
}

async function hasExtension(name: string) {
  const { data } = await supa.rpc<BoolRow[]>('list_extensions');
  return data?.some((e) => e.extname === name) ?? false;
}

async function columnExists(table: string, col: string) {
  const { data } = await supa.rpc('column_exists', {
    table_name: table,
    col_name: col,
  });
  return Boolean(data);
}

// ──────────────────────────────────────────────────────────── main
(async () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE) {
    console.error('❌  Env-vars ontbreken'); process.exit(1);
  }

  // 1. extensies
  const pgTrgm  = await hasExtension('pg_trgm');
  const vector  = await hasExtension('vector');
  logResult('pg_trgm extension', pgTrgm);
  logResult('vector extension',  vector);

  // 2. embedding-kolom
  const embedCol = await columnExists('provider', 'embedding');
  logResult('provider.embedding column', embedCol);

  // 3. dummy-rows
  const { count } = await supa.from('provider').select('*', { count: 'exact', head: true });
  logResult('provider rows ≥ 3', (count ?? 0) >= 3);

  // 4. match_provider-functie
  const { error } = await supa.rpc('match_provider', { search_text: 'massage' });
  logResult('match_provider function', !error);

  console.log('\nHealth-check klaar.');
  process.exit(0);
})();