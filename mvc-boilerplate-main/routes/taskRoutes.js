const express = require('express');
const router = express.Router();


// Listar todas
router.get('/', async (req, res) => {
  const tasks = await Task.getAll();
  res.json(tasks);
});

// Buscar por ID
router.get('/:id', async (req, res) => {
  const task = await Task.getById(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

// Criar
router.post('/', async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// Atualizar
router.put('/:id', async (req, res) => {
  const task = await Task.update(req.params.id, req.body);
  res.json(task);
});

// Deletar
router.delete('/:id', async (req, res) => {
  const success = await Task.delete(req.params.id);
  if (success) {
    res.json({ message: 'Tarefa deletada' });
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

module.exports = router;
