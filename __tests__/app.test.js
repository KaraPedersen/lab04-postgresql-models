import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Dog from '../lib/models/Dog.js';
// import Dog from '../lib/models/Dog.js';

// CRUD
// C - create POST      INSERT
// R - read   GET       SELECT
// U - update PUT       UPDATE
// D - delete DELETE    DELETE
describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('creates a dog via POST', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({ 
        name: 'spot', 
        age: 5, 
        weight: '20 lbs' 
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'spot',
      age: 5,
      weight: '20 lbs',
    });
  });
  test('finds all dogs via GET', async () => {
    const spot = await Dog.insert({
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    });

    const wilma = await Dog.insert({
      name: 'wilma',
      age: 3,
      weight: '25 lbs'
    });

    const denali = await Dog.insert({
      name: 'denali',
      age: 3,
      weight: '78 lbs'
    });

    const res = await request(app)
      .get('/api/v1/dogs');

    expect(res.body).toEqual([spot, wilma, denali]);

  });

  test('find a dog via GET', async () => {
    const dog = await Dog.insert({
      name: 'sara',
      age: 9,
      weight: '75 lbs'
    });

    const res = await request(app)
      .get(`/api/v1/dogs/${dog.id}`);

    expect(res.body).toEqual(dog);
  });

  test('update a dog via PUT', async () => {
    const dog = await Dog.insert({
      name: 'harley',
      age: 3,
      weight: '55 lbs'
    });

    dog.age = 21;

    const res = await request(app)
      .put(`/api/v1/dogs/${dog.id}`)
      .send(dog);

    expect(res.body).toEqual(dog);
  });

  test('delete a dog via DELETE', async () => {
    const dog = await Dog.insert({
      name: 'sami',
      age: 8,
      weight: '20 lbs'
    });
    
    const res = await request(app)
      .delete(`/api/v1/dogs/${dog.id}`)
      .send(dog);

    expect(res.body).toEqual(dog);
  });

});
