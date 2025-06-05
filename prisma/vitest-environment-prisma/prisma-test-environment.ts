import 'dotenv/config';

import { execSync } from 'node:child_process';
import type { Environment } from 'vitest/environments';

const testDatabaseName = 'test-golden-raspberry-awards.db';

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    process.env.DATABASE_URL = `file:./db/${testDatabaseName}`;

    // Creating database for e2e tests
    execSync('npx prisma migrate deploy');

    console.log('✅ Database created.');

    console.log('✅ Seed init.');

    // Seeding test enviroment
    execSync('npx tsx prisma/seed.ts');

    console.log('✅ Seed finished.');

    return {
      async teardown() {
        // Deleting database for e2e tests
        try {
          execSync(`rm -f prisma/db/${testDatabaseName}`);
          execSync(`rm -f prisma/db/${testDatabaseName}-journal`);

          console.log('✅ Database deleted.');
        } catch (err) {
          if (err instanceof Error) {
            console.error('❌ Error during database delete:', err.message);
          } else {
            console.error('❌ Unkwown error:', err);
          }
        }
      },
    };
  },
};
