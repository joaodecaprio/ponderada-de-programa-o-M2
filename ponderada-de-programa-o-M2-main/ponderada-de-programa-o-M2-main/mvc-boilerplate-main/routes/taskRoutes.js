const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/taskController');

// Rotas usando o controller
router.get('/', tarefaController.listarTarefas); // <-- /task
router.post('/', tarefaController.criarTarefa);
router.put('/:id', tarefaController.editarTarefa);
router.delete('/:id', tarefaController.excluirTarefa);

// Rota para renderizar o HTML do task.ejs com as tarefas
router.get('/view', async (req, res) => {
  try {
    const tasks = await taskModel.getAll();
    res.render('layouyt/task', { tasks });
  } catch (error) {
    res.status(500).send('Erro ao carregar tarefas');
  }
});

module.exports = router;