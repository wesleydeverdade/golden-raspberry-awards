import { seedDatabase } from './seed';

(async () => {
  await seedDatabase();
  console.log('✅ Database seeded before all tests');
})();
