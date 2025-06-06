import { randomUUID } from 'crypto';

// Types
export type Movie = {
  id: string;
  title: string;
  year: number;
  winner: boolean;
  studios: Studio[];
  producers: Producer[];
};

export type Studio = {
  id: string;
  name: string;
  movies: Movie[];
};

export type Producer = {
  id: string;
  name: string;
  movies: Movie[];
};

// In-memory data
export const movies: Movie[] = [];
export const producers: Producer[] = [];
export const studios: Studio[] = [];

export const splitNames = (raw: string): string[] =>
  raw
    .split(',')
    .flatMap((name) => name.split(' and '))
    .map((name) => name.trim())
    .filter(Boolean);

export function upsertStudios(studioNames: string[]): Studio[] {
  return studioNames.map((name) => {
    let studio = studios.find((s) => s.name === name);
    if (!studio) {
      studio = { id: randomUUID(), name, movies: [] };
      studios.push(studio);
    }
    return studio;
  });
}

export function upsertProducers(producerNames: string[]): Producer[] {
  return producerNames.map((name) => {
    let producer = producers.find((p) => p.name === name);
    if (!producer) {
      producer = { id: randomUUID(), name, movies: [] };
      producers.push(producer);
    }
    return producer;
  });
}

export function createMovie({
  title,
  year,
  winner,
  studioEntities,
  producerEntities,
}: {
  title: string;
  year: number;
  winner: boolean;
  studioEntities: Studio[];
  producerEntities: Producer[];
}): Movie {
  const movie: Movie = {
    id: randomUUID(),
    title,
    year,
    winner,
    studios: [],
    producers: [],
  };

  studioEntities.forEach((studio) => {
    movie.studios.push(studio);
    studio.movies.push(movie);
  });

  producerEntities.forEach((producer) => {
    movie.producers.push(producer);
    producer.movies.push(movie);
  });

  movies.push(movie);
  return movie;
}
