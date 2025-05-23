// models/Category.js
const db = require('../config/db'); // Assumindo que você tem uma conexão com o banco de dados

class Category {
  static async getAll() {
    // Sua lógica para buscar todas as categorias do banco de dados
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
  }

  static async getById(id) {
    // Sua lógica para buscar uma categoria por ID
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0]; // Retorna a primeira linha encontrada ou undefined
  }

  static async create(data) {
    // Sua lógica para criar uma nova categoria
    const { name } = data; // Exemplo, ajuste conforme seus campos
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    return { id: result.insertId, ...data }; // Retorna a categoria criada com ID
  }

  static async update(id, data) {
    // Sua lógica para atualizar uma categoria
    const { name } = data;
    await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
    return { id, ...data };
  }

  static async delete(id) {
    // Sua lógica para deletar uma categoria
    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows > 0; // Retorna true se deletou, false se não encontrou
  }
}

module.exports = Category; // Exporta a classe Category