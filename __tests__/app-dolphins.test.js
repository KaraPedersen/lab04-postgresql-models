import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Dolphin from '../lib/models/Dolphin.js';
import { ESLint } from 'eslint';
// import Dolphin from '../lib/models/Dolphin.js';


describe('dolphin routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('creates a dolphin via POST', async () => {
    const res = await request(app)
      .post('/api/v1/dolphins')
      .send({
        name: 'finn',
        age: 4,
        weight: '250 lbs'
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'finn',
      age: 4,
      weight: '250 lbs'
    });
  });

  test('finds all dolphins via GET', async () => {
    const finn = await Dolphin.insert({
      name: 'finn',
      age: 4,
      weight: '250 lbs'
    });

    const betty = await Dolphin.insert({
      name: 'betty',
      age: 6,
      weight: '400 lbs'
    });

    const diego = await Dolphin.insert({
      name: 'diego',
      age: 1,
      weight: '150 lbs'
    });

    const res = await request(app)
      .get('/api/v1/dolphins');

    expect(res.body).toEqual([finn, betty, diego]);
  });

  test('find a dolphin via GET', async () => {
    const dolphin = await Dolphin.insert({
      name: 'flipper',
      age: 10,
      weight: '400 lbs'
    });

    const res = await request(app)
      .get(`/api/v1/dolphins/${dolphin.id}`);

    expect(res.body).toEqual(dolphin);
  });

  test('update a dolphin via PUT', async () => {
    const dolphin = await Dolphin.insert({
      name: 'bubba',
      age: 3,
      weight: '670 lbs'
    });

    dolphin.age = 21;

    const res = await request(app)
      .put(`/api/v1/dolphins/${dolphin.id}`)
      .send(dolphin);

    expect(res.body).toEqual(dolphin);
  });

  test('delete a dolphin via DELETE', async () => {
    const dolphin = await Dolphin.insert({
      name: 'finnigan',
      age: 10,
      weight: '450 lbs'
    });
    const res = await request(app)
      .delete(`/api/v1/dolphins/${dolphin.id}`)
      .send(dolphin);

    expect(res.body).toEqual(dolphin);
  });

});
