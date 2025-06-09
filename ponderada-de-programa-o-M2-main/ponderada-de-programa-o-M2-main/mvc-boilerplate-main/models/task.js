const db = require('../config/db');

class task {
  static async getAll() {
    const result = await db.query(`
      SELECT 
        task.*, 
        category.name AS category_name 
      FROM task
      JOIN category ON task.category_id = category.id
    `);
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM task WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Agora recebe um objeto com os campos da tarefa
  static async create({ title, description, category_id, user_id, status }) {
    const result = await db.query(
      'INSERT INTO task (title, description, category_id, user_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, category_id, user_id, status]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE task SET title = $1, description = $2, category_id = $3, user_id = $4 WHERE id = $5 RETURNING *',
      [data.title, data.description, data.category_id, data.user_id, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = task;