import request from 'supertest';
import express from 'express';
import authRoutes from '../src/routes/auth.routes/auth.routes';

describe('POST /api/auth/login', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);

  it('returns validation error when credentials are missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Validation failed');
  });
});
