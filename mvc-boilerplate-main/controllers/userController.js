// controllers/userController.js

const userService = require('../services/userService');
exports.renderUserPage = (req, res) =>
res.render('user', { title: 'Usuários' });

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.render('pages/user', { users }); // Renderiza a página de usuários com a lista
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    await userService.createUser(name, email);
    res.redirect('/user');
  } catch (error) {
    let errorMsg = 'Erro ao criar usuário.';
    if (error.code === '23505') {
      errorMsg = 'E-mail já cadastrado!';
    }
    // Busca novamente os usuários para exibir a lista junto com o erro
    const users = await userService.getAllUsers();
    res.render('pages/user', { users, errorMsg });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await userService.updateUser(req.params.id, name, email);
    if (updatedUser) {
      res.redirect('/user'); // Redireciona para a página de usuários após atualizar
    } else {
      const users = await userService.getAllUsers();
      res.render('pages/user', { users, errorMsg: 'Usuário não encontrado!' });
    }
  } catch (error) {
    const users = await userService.getAllUsers();
    res.render('pages/user', { users, errorMsg: 'Erro ao atualizar usuário.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (deletedUser) {
      res.redirect('/user'); // Redireciona para a página de usuários após deletar
    } else {
      const users = await userService.getAllUsers();
      res.render('pages/user', { users, errorMsg: 'Usuário não encontrado!' });
    }
  } catch (error) {
    const users = await userService.getAllUsers();
    res.render('pages/user', { users, errorMsg: 'Erro ao deletar usuário.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
