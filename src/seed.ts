import fs from 'fs';
import { parse } from 'csv-parse/sync';
import {
  splitNames,
  upsertStudios,
  upsertProducers,
  createMovie,
  movies,
} from './database';

export async function seedDatabase() {
  if (movies.length > 0) {
    console.log('⚠️  Seed already applied!');
    return;
  }

  const csvText = fs.readFileSync('./Movielist.csv', 'utf-8');
  const records = parse(csvText, {
    delimiter: ';',
    columns: true,
    skip_empty_lines: true,
  }) as Array<{
    year: string;
    title: string;
    studios: string;
    producers: string;
    winner: string;
  }>;

  for (const record of records) {
    const year = parseInt(record.year, 10);
    const title = record.title.trim();
    const isWinner = record.winner?.toLowerCase() === 'yes';

    const studioNames = splitNames(record.studios || '');
    const producerNames = splitNames(record.producers || '');

    const studioEntities = upsertStudios(studioNames);
    const producerEntities = upsertProducers(producerNames);

    createMovie({
      title,
      year,
      winner: isWinner,
      studioEntities,
      producerEntities,
    });
  }

  console.log('✅ Seed completed');
}
