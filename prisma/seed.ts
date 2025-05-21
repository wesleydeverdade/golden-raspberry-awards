import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type CsvRow = {
  year: string;
  title: string;
  studios: string;
  producers: string;
  winner: string;
};

const splitNames = (raw: string): string[] =>
  raw
    .split(',')
    .flatMap((name) => name.split(' and '))
    .map((name) => name.trim())
    .filter(Boolean);

async function upsertStudios(studioNames: string[]) {
  return Promise.all(
    studioNames.map((name) =>
      prisma.studio.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );
}

async function upsertProducers(producerNames: string[]) {
  return Promise.all(
    producerNames.map((name) =>
      prisma.producer.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );
}

async function main() {
  const existing = await prisma.movie.findFirst();

  if (existing) {
    console.log('⚠️  Seed already applied!');
    return;
  }

  const csvText = fs.readFileSync('./Movielist.csv', 'utf-8');
  const records: CsvRow[] = parse(csvText, {
    delimiter: ';',
    columns: true,
    skip_empty_lines: true,
  });

  for (const record of records) {
    const year = parseInt(record.year, 10);
    const title = record.title.trim();
    const isWinner = record.winner?.toLowerCase() === 'yes';

    const studioNames = splitNames(record.studios || '');
    const producerNames = splitNames(record.producers || '');

    const studioEntities = await upsertStudios(studioNames);
    const producerEntities = await upsertProducers(producerNames);

    await prisma.movie.create({
      data: {
        title,
        year,
        winner: isWinner,
        studios: {
          connect: studioEntities.map((studio) => ({ id: studio.id })),
        },
        producers: {
          connect: producerEntities.map((producer) => ({ id: producer.id })),
        },
      },
    });
  }

  console.log('✅ Seed completed');
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error('❌ Error during seed:', error);
  await prisma.$disconnect();
  process.exit(1);
});
