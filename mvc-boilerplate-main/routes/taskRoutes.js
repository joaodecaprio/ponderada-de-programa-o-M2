const express = require('express');
const router = express.Router();
const taskModel = require('../models/task');  // Renomeado para evitar conflito
const tarefaController = require('../controllers/taskController');


// Rotas usando o controller
router.post('/task', tarefaController.criarTarefa);
router.get('/task', tarefaController.listarTarefas);
router.put('/task/:id', tarefaController.editarTarefa);
router.delete('/task/:id', tarefaController.excluirTarefa);

// Rotas usando diretamente o modelo (exemplo)
// Listar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tasks = await taskModel.getAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar tarefas', error: error.message });
  }
});

// Buscar tarefa por ID
router.get('/:id', async (req, res) => {
  try {
    const task = await taskModel.getById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefa', error: error.message });
  }
});

// Criar tarefa
router.post('/', async (req, res) => {
  try {
    const task = await taskModel.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error: error.message });
  }
});

// Atualizar tarefa
router.put('/:id', async (req, res) => {
  try {
    const task = await taskModel.update(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa', error: error.message });
  }
});

// Deletar tarefa
router.delete('/:id', async (req, res) => {
  try {
    const success = await taskModel.delete(req.params.id);
    if (success) {
      res.json({ message: 'Tarefa deletada' });
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa', error: error.message });
  }
});

module.exports = router;