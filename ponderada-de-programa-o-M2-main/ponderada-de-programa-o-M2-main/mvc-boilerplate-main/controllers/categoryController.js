const Category = require('../models/Category');

exports.renderPage = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.render('layout/category', { categories });
  } catch (error) {
    res.status(500).send('Erro ao carregar categorias');
  }
};

exports.listarTarefas = async (req, res) => {
  const tasks = await task.getAll();
  const categories = await Category.getAll();
  res.render('layout/task', { tasks, categories, pageTitle: 'Tarefas' });
};

exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.create({ name, description });
    // Após criar, redireciona para a página de categorias
    res.redirect('/category');
  } catch (error) {
    res.status(500).send('Erro ao criar categoria');
  }
};