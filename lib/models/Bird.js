import birds from '../controllers/birds';
import pool from '../utils/pool';

export default class Bird {
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
      'INSERT INTO birds (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
      [name, age, weight]
    );
    return new Bird(rows[0]);
  }

  static async findAll() {

    const { rows } = await pool.query(`SELECT * 
    FROM birds
    `);

    return rows.map(row => new Bird(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM birds
    WHERE id= $1
    `, [id]);

    if (!rows[0]) return null;

    return new Bird(rows[0]);
  }

  static async update(bird, id) {

    const { rows } = await pool.query(`
    UPDATE birds
    SET      name = $1,
             age = $2,
             weight = $3
    WHERE    id = $4
    RETURNING *
    `, [bird.name, bird.age, bird.weight, id]);

    return new Bird(rows[0]);
  }

  static async delete(id) {

    const { rows } = await pool.query(`
    DELETE FROM birds
    WHERE id = $1
    RETURNING   *
    `, [id]);

    return new Bird(rows[0]);
  }
}
