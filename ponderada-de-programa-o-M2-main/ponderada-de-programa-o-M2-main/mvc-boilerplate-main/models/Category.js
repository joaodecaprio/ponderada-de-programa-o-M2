// models/Category.js
const db = require('../config/db');

class Category {
  static async getAll() {
    const result = await db.query('SELECT * FROM category');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT id, name, description FROM category WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create({ name, description }) {
    return db.query(
      'INSERT INTO category (name, description) VALUES ($1, $2)',
      [name, description]
    );
  }

  static async update(id, data) {
    const { name, description } = data;
    const result = await db.query(
      'UPDATE category SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description || null, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM category WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Category;