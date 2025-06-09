require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');

const app = express();

console.clear(); // Isso limpa o console ao iniciar o servidor

// Middlewares para parsear o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "assets")));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const taskRoutes = require('./routes/taskRoutes');
const indexRoutes = require('./routes/index'); // Adicione esta linha

app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/task', taskRoutes);
app.use('/', indexRoutes); // Adicione esta linha antes do middleware 404

// Middleware para rota não encontrada
app.use((req, res, next) => {
  res.status(404).send('Página não encontrada');
});

// Middleware para erros internos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro no servidor');
});

// Conexão com o banco e start do servidor
db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });