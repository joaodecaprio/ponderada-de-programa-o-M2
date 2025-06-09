// models/Category.js
const db = require('../config/db');

class Category {
  static async getAll() {
    const result = await db.query('SELECT id, name, description FROM category');
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

  static async updateDescriptions() {
    await db.query("UPDATE category SET description = 'Tarefas relacionadas ao trabalho' WHERE name = 'Trabalho'");
    await db.query("UPDATE category SET description = 'Atividades de estudo e aprendizado' WHERE name = 'Estudos'");
    await db.query("UPDATE category SET description = 'Compromissos pessoais' WHERE name = 'Pessoal'");
    await db.query("UPDATE category SET description = 'Cuidados com a saúde' WHERE name = 'Saúde'");
    await db.query("UPDATE category SET description = 'Práticas esportivas e exercícios' WHERE name = 'Esportes'");
  }
}

module.exports = Category;
