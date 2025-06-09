const pool = require('../config/db');
const Category = require('../models/Category');
const task = require('../models/task'); // <-- Adicione esta linha

// Listar todas as tarefas e renderizar a view
exports.listarTarefas = async (req, res) => {
  const tasks = await task.getAll();
  const categories = await Category.getAll();
  res.render('layout/main', {
    pageTitle: 'Tarefas',
    content: 'layout/task',
    tasks,
    categories
  });
};

// Criar uma nova tarefa e renderizar a lista atualizada
exports.criarTarefa = async (req, res) => {
  console.log('REQ.BODY:', req.body); // Adicione esta linha
  const { taskName, description, categoryId, userId, status } = req.body;

  // Monta o objeto conforme o model espera
  const newTask = {
    title: taskName,
    description: description || '', // ou ajuste conforme seu formulário
    category_id: Number(categoryId),
    user_id: Number(userId) || 1, // ajuste conforme sua lógica de usuário
    status: status || 'pendente'   // ou ajuste conforme seu sistema
  };

  try {
    await task.create(newTask);
    const tasks = await task.getAll();
    const categories = await Category.getAll();
    res.render('layout/main', {
      pageTitle: 'Tarefas',
      content: 'layout/task',
      tasks,
      categories
    });
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