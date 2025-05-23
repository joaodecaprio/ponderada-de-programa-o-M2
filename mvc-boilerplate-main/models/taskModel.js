const db = require('../config/db');

class Task {
  static async getAll() {
    const result = await db.query('SELECT * FROM tasks');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO tasks (title, description, category_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.title, data.description, data.category_id, data.user_id]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE tasks SET title = $1, description = $2, category_id = $3, user_id = $4 WHERE id = $5 RETURNING *',
      [data.title, data.description, data.category_id, data.user_id, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Task;
