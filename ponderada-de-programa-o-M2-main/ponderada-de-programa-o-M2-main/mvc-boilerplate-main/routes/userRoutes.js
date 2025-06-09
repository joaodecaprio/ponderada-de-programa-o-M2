const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para renderizar a página HTML com tabela e formulário
router.get('/', async (req, res) => {
  const users = await User.getAll();
  res.render('pages/user', { users });
});

// Rota para API (JSON)
router.get('/api', async (req, res) => {
  const users = await User.getAll();
  res.json(users);
});

// Buscar por ID (JSON)
router.get('/:id', async (req, res) => {
  const user = await User.getById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Criar usuário (HTML)
router.post('/', async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect('/user');
  } catch (error) {
    let errorMsg = 'Erro ao criar usuário.';
    if (error.code === '23505') {
      errorMsg = 'E-mail já cadastrado!';
    }
    const users = await User.getAll();
    res.render('pages/user', { users, errorMsg });
  }
});

// Atualizar usuário (JSON)
router.put('/:id', async (req, res) => {
  const user = await User.update(req.params.id, req.body);
  res.json(user);
});

// Deletar usuário (JSON)
router.delete('/:id', async (req, res) => {
  const success = await User.delete(req.params.id);
  if (success) {
    res.json({ message: 'Usuário deletado' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

module.exports = router;