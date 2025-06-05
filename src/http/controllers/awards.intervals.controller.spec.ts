import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import fs from 'fs';
import path from 'path';

const expectedResponse = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'awards.intervals.result.json'), 'utf8'),
);

describe('Awards Intervals (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get information', async () => {
    const response = await request(app.server).get('/awards/intervals');

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedResponse);
  });
});
