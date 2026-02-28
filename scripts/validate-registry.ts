import { readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ToolSchema } from '../src/data/schema.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, '..', 'src', 'data', 'tools');
const files = readdirSync(dir).filter(f => f.endsWith('.json'));
const slugs = new Set<string>();

let valid = 0;
let errors = 0;

for (const file of files) {
  const raw = JSON.parse(readFileSync(join(dir, file), 'utf-8'));
  const result = ToolSchema.safeParse(raw);
  if (!result.success) {
    console.error(`\n❌ FAIL: ${file}`);
    const flat = result.error.flatten();
    for (const [field, msgs] of Object.entries(flat.fieldErrors)) {
      console.error(`   ${field}: ${msgs?.join(', ')}`);
    }
    if (flat.formErrors.length) console.error(`   form: ${flat.formErrors.join(', ')}`);
    errors++;
  } else {
    const slug = result.data.slug;
    const expectedSlug = file.replace('.json', '');
    if (slug !== expectedSlug) {
      console.error(`❌ SLUG MISMATCH: file="${expectedSlug}", slug="${slug}" in ${file}`);
      errors++;
    } else if (slugs.has(slug)) {
      console.error(`❌ DUPLICATE SLUG: "${slug}" in ${file}`);
      errors++;
    } else {
      slugs.add(slug);
      console.log(`✅ ${slug} (score: ${result.data.agentFirstScore}/10)`);
      valid++;
    }
  }
}

console.log(`\n${'─'.repeat(40)}`);
console.log(`${valid} valid   ${errors} errors   ${files.length} total`);

if (errors > 0) process.exit(1);
