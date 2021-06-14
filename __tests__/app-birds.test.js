import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Bird from '../lib/models/Bird.js';
// import Dog from '../lib/models/Dog.js';

// CRUD
// C - create POST      INSERT
// R - read   GET       SELECT
// U - update PUT       UPDATE
// D - delete DELETE    DELETE
describe('bird routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('creates a bird via POST', async () => {
    const res = await request(app)
      .post('/api/v1/birds')
      .send({ 
        name: 'bluejay', 
        age: 5, 
        weight: '20 oz' 
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'bluejay',
      age: 5,
      weight: '20 oz',
    });
  });
  test('finds all birds via GET', async () => {
    const bluejay = await Bird.insert({
      name: 'bluejay',
      age: 5,
      weight: '20 oz'
    });

    const redbird = await Bird.insert({
      name: 'redbird',
      age: 3,
      weight: '25 oz'
    });

    const hummingBird = await Bird.insert({
      name: 'hummingBird',
      age: 3,
      weight: '78 oz'
    });

    const res = await request(app)
      .get('/api/v1/birds');

    expect(res.body).toEqual([bluejay, redbird, hummingBird]);

  });

  test('find a bird via GET', async () => {
    const bird = await Bird.insert({
      name: 'cardinal',
      age: 9,
      weight: '75 oz'
    });

    const res = await request(app)
      .get(`/api/v1/birds/${bird.id}`);

    expect(res.body).toEqual(bird);
  });

  test('update a bird via PUT', async () => {
    const bird = await Bird.insert({
      name: 'cockatoo',
      age: 3,
      weight: '1.5 lbs'
    });

    bird.age = 21;

    const res = await request(app)
      .put(`/api/v1/birds/${bird.id}`)
      .send(bird);

    expect(res.body).toEqual(bird);
  });

  test('delete a bird via DELETE', async () => {
    const bird = await Bird.insert({
      name: 'baldEagle',
      age: 8,
      weight: '4 lbs'
    });
    
    const res = await request(app)
      .delete(`/api/v1/birds/${bird.id}`)
      .send(bird);

    expect(res.body).toEqual(bird);
  });

});
