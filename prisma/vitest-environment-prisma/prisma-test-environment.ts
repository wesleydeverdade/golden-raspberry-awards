import 'dotenv/config';

import { execSync } from 'node:child_process';
import type { Environment } from 'vitest/environments';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testDatabaseName = 'test-golden-raspberry-awards.db';

const seed = async () => {
  console.log('✅ Seed init.');

  const csvData = [
    {
      year: 2008,
      title: 'Movie 1',
      studios: ['Studio 1'],
      producers: ['Producer 1'],
      winner: true,
    },
    {
      year: 2009,
      title: 'Movie 2',
      studios: ['Studio 1'],
      producers: ['Producer 1'],
      winner: true,
    },
    {
      year: 2018,
      title: 'Movie 3',
      studios: ['Studio 2'],
      producers: ['Producer 2'],
      winner: true,
    },
    {
      year: 2019,
      title: 'Movie 4',
      studios: ['Studio 2'],
      producers: ['Producer 2'],
      winner: true,
    },
    {
      year: 1900,
      title: 'Movie 5',
      studios: ['Studio 1'],
      producers: ['Producer 1'],
      winner: true,
    },
    {
      year: 1999,
      title: 'Movie 6',
      studios: ['Studio 1'],
      producers: ['Producer 1'],
      winner: true,
    },
    {
      year: 2000,
      title: 'Movie 7',
      studios: ['Studio 2'],
      producers: ['Producer 2'],
      winner: true,
    },
    {
      year: 2099,
      title: 'Movie 8',
      studios: ['Studio 2'],
      producers: ['Producer 2'],
      winner: true,
    },
  ];

  for (const row of csvData) {
    const studios = await Promise.all(
      row.studios.map(async (studio) =>
        prisma.studio.upsert({
          where: { name: studio },
          update: {},
          create: { name: studio },
        }),
      ),
    );

    const producers = await Promise.all(
      row.producers.map(async (producer) =>
        prisma.producer.upsert({
          where: { name: producer },
          update: {},
          create: { name: producer },
        }),
      ),
    );

    await prisma.movie.create({
      data: {
        title: row.title,
        year: row.year,
        winner: row.winner,
        studios: {
          connect: studios.map((s) => ({ id: s.id })),
        },
        producers: {
          connect: producers.map((p) => ({ id: p.id })),
        },
      },
    });
  }

  console.log('✅ Seed finished.');
};

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    process.env.DATABASE_URL = `file:./db/${testDatabaseName}`;

    // Criando banco de testes
    execSync('npx prisma migrate deploy');

    console.log('✅ Database created.');

    seed().catch((e) => {
      console.error(e);
      process.exit(1);
    });

    return {
      async teardown() {
        // Apagando banco de testes
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

        await prisma.$disconnect();
      },
    };
  },
};
