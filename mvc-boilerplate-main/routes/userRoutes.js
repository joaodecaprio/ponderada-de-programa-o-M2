const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Listar todos
router.get('/', async (req, res) => {
  const users = await User.getAll();
  res.json(users);
});

// Buscar por ID
router.get('/:id', async (req, res) => {
  const user = await User.getById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Criar
router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// Atualizar
router.put('/:id', async (req, res) => {
  const user = await User.update(req.params.id, req.body);
  res.json(user);
});

// Deletar
router.delete('/:id', async (req, res) => {
  const success = await User.delete(req.params.id);
  if (success) {
    res.json({ message: 'Usuário deletado' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

module.exports = router;
