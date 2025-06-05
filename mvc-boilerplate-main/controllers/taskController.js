const pool = require('../config/db');
const task = require('../models/task');

// Listar todas as tarefas e renderizar a view
exports.listarTarefas = async (req, res) => {
  try {
    const tasks = await task.getAll();
    res.render('layout/task', { tasks, pageTitle: 'Tarefas' }); // Ajuste o nome da view conforme seu projeto
  } catch (err) {
    res.status(500).send('Erro ao listar tarefas: ' + err.message);
  }
};

// Criar uma nova tarefa e renderizar a lista atualizada
exports.criarTarefa = async (req, res) => {
  const { taskName, categoryId } = req.body;
    console.log(taskName, categoryId);
  try {
    
    await task.create({
      taskName,
      categoryId,
      user_id: 1
    });
    const tasks = await task.getAll();
    res.render('task', { tasks, pageTitle: 'Tarefas' });
  } catch (err) {
    res.status(500).send('Erro ao criar tarefa: ' + err.message);
  }
};

// Editar tarefa (retorna JSON)
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, status } = req.body;

  const query = `
    UPDATE tarefas SET nome = $1, descricao = $2, status = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4 RETURNING *`;
  const values = [nome, descricao, status, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir tarefa (retorna JSON)
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM tarefas WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};