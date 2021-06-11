import pool from '../utils/pool';

export default class Dog {
  id;
  name;
  age;
  weight;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.weight = row.weight;
  }

  static async insert({ name, age, weight }) {
    const { rows } = await pool.query(
      'INSERT INTO dogs (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
      [name, age, weight]
    );
    return new Dog(rows[0]);
  }

  static async findAll() {

    const { rows } = await pool.query(`SELECT * 
    FROM dogs
    `);

    return rows.map(row => new Dog(row));
  }
}


