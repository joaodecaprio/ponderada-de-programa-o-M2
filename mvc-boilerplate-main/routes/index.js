const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');
const TarefaController = require('../controllers/TarefaController');
                              
/////////////////////////////
// Rotas para páginas (Views)
/////////////////////////////

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

/////////////////////////////
// Rotas de API - Usuários
/////////////////////////////

router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:id', userController.getUserById);
router.post('/api/users', userController.createUser);
router.put('/api/users/:id', userController.updateUser);
router.delete('/api/users/:id', userController.deleteUser);

/////////////////////////////
// Rotas de API - Tarefas
/////////////////////////////

router.post('/api/tarefas', TarefaController.criarTarefa);
router.get('/api/tarefas', TarefaController.listarTarefas);
router.put('/api/tarefas/:id', TarefaController.editarTarefa);
router.delete('/api/tarefas/:id', TarefaController.excluirTarefa);

module.exports = router;
