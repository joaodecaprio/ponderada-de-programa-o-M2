-- Remover tabelas se existirem (em ordem que respeita dependências)
DROP TABLE IF EXISTS task CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS category CASCADE;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- Criar tabela de categorias
CREATE TABLE IF NOT EXISTS category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

-- Criar tabela de tarefas
CREATE TABLE IF NOT EXISTS task (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) NOT NULL,
  user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  category_id INT NOT NULL REFERENCES category(id) ON DELETE CASCADE
);

-- Inserção de usuários
INSERT INTO "user" (name, email) VALUES
  ('Ana Martins', 'ana.martins@example.com'),
  ('Pedro Silva', 'pedro.silva@example.com'),
  ('Júlia Ferreira', 'julia.ferreira@example.com'),
  ('Lucas Almeida', 'lucas.almeida@example.com'),
  ('Marina Rocha', 'marina.rocha@example.com'),
  ('Felipe Souza', 'felipe.souza@example.com'),
  ('Camila Torres', 'camila.torres@example.com');

-- Inserção de categorias
INSERT INTO category (name, description) VALUES
  ('Trabalho', 'Atividades relacionadas ao trabalho e carreira'),
  ('Estudos', 'Tarefas acadêmicas e de aprendizado'),
  ('Pessoal', 'Compromissos pessoais e familiares'),
  ('Saúde', 'Atividades de saúde e bem-estar'),
  ('Esportes', 'Práticas esportivas e exercícios');
 
