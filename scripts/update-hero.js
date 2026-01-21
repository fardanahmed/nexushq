import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Read .env.local file
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const dbUrl = envContent.match(/DATABASE_URL=(.+)/)[1].trim();

const sql = neon(dbUrl);

async function updateHeroContent() {
  try {
    // First, check current value
    console.log('Current hero_content:');
    const current =
      await sql`SELECT value FROM site_settings WHERE key = 'hero_content'`;
    console.log(JSON.stringify(current[0]?.value, null, 2));

    // Update headline and primary CTA
    const result = await sql`
      UPDATE site_settings 
      SET value = jsonb_set(
        jsonb_set(
          value::jsonb,
          '{headline}',
          '"Nasir Uddin Centre for Applied Research & Educational Resources"'::jsonb
        ),
        '{ctaPrimary}',
        '"Our People"'::jsonb
      )
      WHERE key = 'hero_content'
      RETURNING value
    `;

    console.log('\nUpdated hero_content:');
    console.log(JSON.stringify(result[0]?.value, null, 2));

    console.log('\n✅ Database updated successfully!');
  } catch (error) {
    console.error('❌ Error updating database:', error);
    process.exit(1);
  }
}

updateHeroContent();
