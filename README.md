# TaskManager - Gerenciador de Tarefas

TaskManager é uma aplicação web projetada para facilitar o gerenciamento de tarefas e usuários, oferecendo uma interface intuitiva para cadastro, edição, consulta e exclusão de dados. O projeto combina um backend robusto em Node.js com um frontend dinâmico em React.

## 🚀 Sobre o Projeto

O objetivo do TaskManager é oferecer uma solução eficiente para organizar tarefas em diferentes setores, priorizando simplicidade e funcionalidade. Ideal para pequenos times ou uso pessoal, ele permite manter controle sobre o progresso e status das atividades.

### Principais Funcionalidades:

- Gerenciamento de Tarefas: Criação, edição, listagem e exclusão de tarefas com priorização e status.
- Cadastro de Usuários: Inclusão de usuários associados às tarefas.
- API RESTful: Backend desenvolvido para fácil integração e escalabilidade.

## 📌 Tecnologias Utilizadas

###  Backend

- Node.js
- Express.js
- MySQL (com mysql2)
- CORS
  
### Frontend
- React
- React Router Dom
- CSS

## 1. Banco de Dados:
Execute o script SQL para criar o banco e as tabelas:

    CREATE DATABASE gerenciadorTarefas;  
    USE gerenciadorTarefas;  

    CREATE TABLE usuario (  
     id_usuario INT AUTO_INCREMENT PRIMARY KEY,  
     nome VARCHAR(60) NOT NULL,  
     email VARCHAR(60) NOT NULL  
    );  

    CREATE TABLE tarefas (  
     id_tarefa INT AUTO_INCREMENT PRIMARY KEY,  
     descricao VARCHAR(100) NOT NULL,  
     setor VARCHAR(60) NOT NULL,  
     prioridade VARCHAR(5) NOT NULL,  
     data_cadastro DATE NOT NULL,  
     status VARCHAR(7) NOT NULL,  
     fk_id_usuario INT NOT NULL,  
     FOREIGN KEY (fk_id_usuario) REFERENCES usuario (id_usuario)  
     ON DELETE CASCADE ON UPDATE CASCADE  
    );

## 2. Backend:
2.1 Navegue até a pasta backend:

    cd backend  

2.2 Instale as dependências:

    npm install  

2.3 Inicie o servidor:

    npm start

## 3. Frontend:

3.1 Navegue até a pasta frontend:

    cd frontend  

3.2 Instale as dependências:

    npm install  

3.3 Inicie o aplicativo:

    npm run dev






