import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cat from '../lib/models/Cat.js';

describe('cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('creates a cat via POST', async () => {
    const res = await request(app)
      .post('/api/v1/cats')
      .send({ 
        name: 'calvin', 
        age: 3, 
        weight: '20 lbs' 
      });

    expect (res.body).toEqual({
      id: '1',
      name: 'calvin',
      age: 3,
      weight: '20 lbs',
    });
  });

  test('finds all cats via Get', async () => {
    const calvin = await Cat.insert({
      name: 'calvin',
      age: 3,
      weight: '20 lbs'
    });

    const scarlet = await Cat.insert({
      name: 'scarlet',
      age: 4,
      weight: '10 lbs'
    });

    const bubbaton = await Cat.insert({
      name: 'bubbaton',
      age: 3,
      weight: '22 lbs'
    });

    const res = await request(app)
      .get('/api/v1/cats');

    expect(res.body).toEqual([calvin, scarlet, bubbaton]);

  });
});
