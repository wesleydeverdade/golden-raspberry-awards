import { FastifyInstance } from 'fastify';
import { register } from './controllers/awards.intervals.controller';

export async function appRoutes(app: FastifyInstance) {
  app.get('/awards/intervals', register);
}
