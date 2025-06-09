const Category = require('../models/Category');

exports.renderPage = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.render('layout/category', { categories });
  } catch (error) {
    res.status(500).send('Erro ao carregar categorias');
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

exports.getById = async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categoria' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.create({ name, description });
    res.redirect('/category');
  } catch (error) {
    res.status(500).send('Erro ao criar categoria');
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Category.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Category.delete(req.params.id);
    res.json({ success: deleted });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
};
