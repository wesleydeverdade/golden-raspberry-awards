import { app } from '@/app';
import { env } from '@/env';
import { seedDatabase } from '@/seed';

async function bootstrap() {
  await seedDatabase();

  app
    .listen({
      host: '0.0.0.0',
      port: env.PORT,
    })
    .then(() => {
      console.log(`🚀 HTTP Server running on port ${env.PORT}`);
    })
    .catch((err) => {
      console.error('Failed to start server:', err);
      process.exit(1);
    });
}

bootstrap();
