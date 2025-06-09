# Task Maker

Este é um projeto com o propósito de gerenciar as tarefas do usuário, além de catalogar as tarefas sendo elas pessoais, saúde, lazer, trabalho etc. O Task maker visa ajudar na organização do usuário, auxiliando-o na organização das tarefas do cotidiano. Nesta aplicação web você primeiro cria seu usuário e é redirecionado para a tela de usuários com uma lista dos já cadastrados, depois você vai para a tela de tarefas e cria uma tarefa colocando ela na categoria mais adequada, caso você queria ver as categorias com mais clareza pode visitar a página das categorias onde haverá uma lista com todas as categorias disponiveis e com a opção de criar a sua própria categoria também.

## Requisitos

- Node.js (versão 22.13.1)

## Instalação

1. **Clonar o repositório:**

```bash
   git clone https://github.com/joaodecaprio/Projeto-Individual-COMP-Parte-1-Estruturando-a-Base-do-Projeto
   cd Projeto-Individual-COMP-Parte-1-Estruturando-a-Base-do-Projeto
```

2. **Instalar as dependências:**
    
```bash
npm install
```
    //caso de algum ero tentar "npm -y"
3. **Configurar o arquivo `.env`:**
    
Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias, como as configurações do banco de dados PostgreSQL.
    

Configuração do Banco de Dados
------------------------------

1. **Criar banco de dados:**
    
    Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo `.env`.
    
2. **Executar o script SQL de inicialização:**
    
```bash
npm run init-db
```
    
Isso criará a tabela `users` no seu banco de dados PostgreSQL com UUID como chave primária e inserirá alguns registros de exemplo.
    

Funcionalidades
---------------

* **Padrão MVC:** Estrutura organizada em Model, View e Controller.
* **PostgreSQL:** Banco de dados relacional utilizado para persistência dos dados.
* **UUID:** Utilização de UUID como chave primária na tabela `users`.
* **Scripts com `nodemon`:** Utilização do `nodemon` para reiniciar automaticamente o servidor após alterações no código.
* **Testes:** Inclui estrutura básica para testes automatizados.

Scripts Disponíveis
-------------------

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
* `npm run test`: Executa os testes automatizados.
* `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.

Estrutura de Diretórios
-----------------------

* **`config/`**: Configurações do banco de dados e outras configurações do projeto.
* **`controllers/`**: Controladores da aplicação (lógica de negócio).
* **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
* **`routes/`**: Rotas da aplicação.
* **`tests/`**: Testes automatizados.
* **`views/`**: Views da aplicação (se aplicável).

Contribuição
------------

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request.

Licença
-------

Este projeto está licenciado sob a Licença MIT.

Este README.md fornece uma visão geral clara do boilerplate, incluindo instruções de instalação, configuração do banco de dados, funcionalidades principais, scripts disponíveis, estrutura de diretórios, como contribuir e informações de licença. Certifique-se de personalizar as seções com detalhes específicos do seu projeto conforme necessário.
