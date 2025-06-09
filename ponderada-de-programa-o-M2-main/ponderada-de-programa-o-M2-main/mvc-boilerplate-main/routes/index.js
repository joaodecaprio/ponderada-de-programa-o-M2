const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const categoryRoutes = require('./categoryRoutes');

// Rotas para páginas (Views)
router.get('/', (req, res) => {
  res.render('layout/main', {
    pageTitle: 'Página Inicial',
    content: 'pages/page1'
  });
});

router.get('/about', (req, res) => {
  res.render('layout/main', {
    pageTitle: 'Sobre',
    content: 'pages/page2'
  });
});

// Rotas de API - Usuários
router.get('/api/user', userController.getAllUsers);
router.get('/api/user/:id', userController.getUserById);
router.post('/api/user', userController.createUser);
router.put('/api/user/:id', userController.updateUser);
router.delete('/api/user/:id', userController.deleteUser);

// Rotas de API - Tarefas
router.post('/api/task', taskController.criarTarefa);
router.get('/api/task', taskController.listarTarefas);
router.put('/api/task/:id', taskController.editarTarefa);
router.delete('/api/task/:id', taskController.excluirTarefa);

// Use as rotas de categoria
router.use('/categorias', categoryRoutes);

module.exports = router;
