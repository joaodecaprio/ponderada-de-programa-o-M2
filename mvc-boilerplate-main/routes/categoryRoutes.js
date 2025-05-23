const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Listar todas
router.get('/', async (req, res) => {
  const categories = await Category.getAll();
  res.json(categories);
});

// Buscar por ID
router.get('/:id', async (req, res) => {
  const category = await Category.getById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: 'Categoria não encontrada' });
  }
});

// Criar
router.post('/', async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

// Atualizar
router.put('/:id', async (req, res) => {
  const category = await Category.update(req.params.id, req.body);
  res.json(category);
});

// Deletar
router.delete('/:id', async (req, res) => {
  const success = await Category.delete(req.params.id);
  if (success) {
    res.json({ message: 'Categoria deletada' });
  } else {
    res.status(404).json({ message: 'Categoria não encontrada' });
  }
});




module.exports = router;
