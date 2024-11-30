const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Importa o pacote mysql2 com suporte a Promises

const app = express();

// Configuração do banco de dados MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'magnus',
  database: 'gerenciadorTarefas',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(cors());
app.use(express.json());

// Endpoints para tarefas
app.get('/tarefas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tarefas');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

app.get('/tarefas/:id_tarefa', async (req, res) => {
  const { id_tarefa } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM tarefas WHERE id_tarefa = ?', [id_tarefa]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar tarefa' });
  }
});

app.post('/tarefas', async (req, res) => {
  const { descricao, setor, prioridade, data_cadastro, status, fk_id_usuario } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO tarefas (descricao, setor, prioridade, data_cadastro, status, fk_id_usuario) VALUES (?, ?, ?, ?, ?, ?)',
      [descricao, setor, prioridade, data_cadastro, status, fk_id_usuario]
    );
    res.status(201).json({ id_tarefa: result.insertId, descricao, setor, prioridade, data_cadastro, status, fk_id_usuario });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao adicionar tarefa' });
  }
});

const formatarData = (dataISO) => {
  const data = new Date(dataISO);
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`; // Formato: YYYY-MM-DD
};

// No handler do PUT
app.put('/tarefas/:id_tarefa', async (req, res) => {
  const { id_tarefa } = req.params;
  const { descricao, setor, prioridade, data_cadastro, status, fk_id_usuario } = req.body;

  try {
    const dataFormatada = formatarData(data_cadastro); // Converte para o formato aceito pelo MySQL

    const [result] = await pool.query(
      `UPDATE tarefas 
       SET descricao = ?, setor = ?, prioridade = ?, data_cadastro = ?, status = ?, fk_id_usuario = ? 
       WHERE id_tarefa = ?`,
      [descricao, setor, prioridade, dataFormatada, status, fk_id_usuario, id_tarefa]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa atualizada com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err.message);
    res.status(500).json({ error: err.message });
  }
});


app.delete('/tarefas/:id_tarefa', async (req, res) => {
  const { id_tarefa } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM tarefas WHERE id_tarefa = ?', [id_tarefa]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
});

// Endpoints para usuário
app.post('/usuario', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO usuario (nome, email) VALUES (?, ?)', [nome, email]);
    res.status(201).json({ id_usuario: result.insertId, nome, email });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao adicionar usuário' });
  }
});

app.get('/usuario', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuario');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.get('/usuario/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
