import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Goat from '../lib/models/Goat.js';

describe('goat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('creates a goat via POST', async () => {
    const res = await request(app)
      .post('/api/v1/goats')
      .send({ 
        name: 'billy', 
        age: 5, 
        weight: '20 lbs' 
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'billy',
      age: 5,
      weight: '20 lbs',
    });
  });
  test('finds all goats via GET', async () => {
    const billy = await Goat.insert({
      name: 'billy',
      age: 5,
      weight: '20 lbs'
    });

    const betty = await Goat.insert({
      name: 'betty',
      age: 3,
      weight: '25 lbs'
    });

    const sunshine = await Goat.insert({
      name: 'sunshine',
      age: 3,
      weight: '78 lbs'
    });

    const res = await request(app)
      .get('/api/v1/goats');

    expect(res.body).toEqual([billy, betty, sunshine]);

  });

  test('find a goat via GET', async () => {
    const goat = await Goat.insert({
      name: 'sara',
      age: 9,
      weight: '75 lbs'
    });

    const res = await request(app)
      .get(`/api/v1/goats/${goat.id}`);

    expect(res.body).toEqual(goat);
  });

  test('update a goat via PUT', async () => {
    const goat = await Goat.insert({
      name: 'harley',
      age: 3,
      weight: '55 lbs'
    });

    goat.age = 21;

    const res = await request(app)
      .put(`/api/v1/goats/${goat.id}`)
      .send(goat);

    expect(res.body).toEqual(goat);
  });

  test('delete a goat via DELETE', async () => {
    const goat = await Goat.insert({
      name: 'sami',
      age: 8,
      weight: '20 lbs'
    });
    
    const res = await request(app)
      .delete(`/api/v1/goats/${goat.id}`)
      .send(goat);

    expect(res.body).toEqual(goat);
  });

});
