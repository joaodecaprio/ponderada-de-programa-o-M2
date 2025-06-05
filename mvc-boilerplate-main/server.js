require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const cors = require('cors');
const path = require('path');

app.use(express.static(path.join(__dirname, "assets")));

// Configura o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // 'views' é a pasta onde está o user.ejs

// ...suas rotas e middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

db.connect()



  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    app.use(express.json());

    const userRoutes = require('./routes/index');
    app.use('/user', userRoutes);

    const frontendRoutes = require('./routes/index');
    app.use('/', frontendRoutes);

    // Middleware para lidar com erros de rota não encontrada
    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    // Middleware para lidar com erros internos do servidor
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Erro no servidor');
    });

    const runSQLScript = require('./scripts/runSQLScript')
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, async() => {
      await runSQLScript()
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

  app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

  // server.js
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Usando as rotas definidas
app.use('/api', routes);

app.use(express.static(path.join(__dirname, "assets")));

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/task', taskRoutes);

