const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');

// <-- IMPORTOU

// Rotas para páginas (Views)
router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/page1')
  });
});

router.get('/about', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Sobre',
    content: path.join(__dirname, '../views/pages/page2')
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

// Rotas de API - Categorias
const categoryController = require('../controllers/CategoryController');

router.get('/api/category', categoryController.getAll);
router.get('/api/category/:id', categoryController.getById);
router.post('/api/category', categoryController.create);
router.put('/api/category/:id', categoryController.update);
router.delete('/api/category/:id', categoryController.delete);

module.exports = router;
