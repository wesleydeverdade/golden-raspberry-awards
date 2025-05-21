import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import request from 'supertest';

describe('Awards Intervals (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get information', async () => {
    const response = await request(app.server).get('/awards/intervals');

    const reply = {
      min: [
        {
          producer: 'Producer 1',
          interval: 1,
          previousWin: 2008,
          followingWin: 2009,
        },
        {
          producer: 'Producer 2',
          interval: 1,
          previousWin: 2018,
          followingWin: 2019,
        },
      ],
      max: [
        {
          producer: 'Producer 1',
          interval: 99,
          previousWin: 1900,
          followingWin: 1999,
        },
        {
          producer: 'Producer 2',
          interval: 99,
          previousWin: 2000,
          followingWin: 2099,
        },
      ],
    };

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(reply);
  });
});
