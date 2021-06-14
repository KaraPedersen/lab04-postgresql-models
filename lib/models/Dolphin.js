import pool from '../utils/pool';

export default class Dolphin {
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
      'INSERT INTO dolphins (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
      [name, age, weight]
    );
    return new Dolphin(rows[0]);
  }

  static async findAll() {

    const { rows } = await pool.query(`SELECT * FROM dolphins
    `);

    return rows.map(row => new Dolphin(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM dolphins
    WHERE id = $1
    `, [id]);

    if (!rows[0]) return null;

    return new Dolphin(rows[0]);
  }

  
}
