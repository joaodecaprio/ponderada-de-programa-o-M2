const Category = require('../models/Category');

class CategoryController {
  // Listar todas as categorias
  static async getAll(req, res) {
    try {
      const categories = await Category.getAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar categorias', error: error.message });
    }
  }

  // Buscar uma categoria pelo ID
  static async getById(req, res) {
    try {
      const id = req.params.id;
      const category = await Category.getById(id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar categoria', error: error.message });
    }
  }

  // Criar uma nova categoria
  static async create(req, res) {
    try {
      const data = req.body;
      const newCategory = await Category.create(data);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar categoria', error: error.message });
    }
  }

  // Atualizar uma categoria existente
  static async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedCategory = await Category.update(id, data);
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar categoria', error: error.message });
    }
  }

  // Deletar uma categoria
  static async delete(req, res) {
    try {
      const id = req.params.id;
      const success = await Category.delete(id);
      if (success) {
        res.json({ message: 'Categoria deletada com sucesso' });
      } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar categoria', error: error.message });
    }
  }
}


module.exports = CategoryController;
