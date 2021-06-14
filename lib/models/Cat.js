import pool from '../utils/pool';

export default class Cat {
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
      'INSERT INTO cats (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
      [name, age, weight]
    );
    return new Cat(rows[0]);

  }

  static async findAll() {

    const { rows } = await pool.query(`SELECT * 
    FROM cats
    `);

    return rows.map(row => new Cat(row));
  }
}
