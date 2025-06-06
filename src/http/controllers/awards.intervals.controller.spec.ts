import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import fs from 'fs';
import path from 'path';
// import { movies, producers, studios } from '@/database';
// import { randomUUID } from 'crypto';

let expectedResponse: unknown;

describe('Awards Intervals E2E', () => {
  beforeAll(async () => {
    const jsonPath = path.resolve(__dirname, './awards.intervals.result.json');
    const fileContent = fs.readFileSync(jsonPath, 'utf-8');
    expectedResponse = JSON.parse(fileContent);

    // Adding a new movie to break the e2e test
    // const matthew = producers.find((p) => p.name === 'Matthew Vaughn');

    // if (!matthew) {
    //   throw new Error('Producer Matthew Vaughn not found');
    // }

    // const studio = {
    //   id: randomUUID(),
    //   name: 'Future Studio',
    //   movies: [],
    // };
    // studios.push(studio);

    // const newMovie = {
    //   id: randomUUID(),
    //   title: 'The Next Big Hit',
    //   year: 2030,
    //   winner: true,
    //   studios: [studio],
    //   producers: [matthew],
    // };

    // matthew.movies.push(newMovie);
    // studio.movies.push(newMovie);
    // movies.push(newMovie);

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return min and max intervals correctly', async () => {
    const response = await request(app.server).get('/awards/intervals');

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedResponse);
  });
});
