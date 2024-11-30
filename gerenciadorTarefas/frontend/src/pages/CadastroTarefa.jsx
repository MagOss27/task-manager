import React, { useState, useEffect } from 'react';

function CadastroTarefa() {
  const [novaTarefa, setNovaTarefa] = useState({
    descricao: '',
    setor: '',
    prioridade: '',
    data_cadastro: '',
    status: 'A Fazer',
    fk_id_usuario: '',
  });
  const [usuarios, setUsuarios] = useState([]);

  const buscarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuario');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const salvarTarefa = async () => {
    try {
      await fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTarefa),
      });
      alert('Tarefa cadastrada com sucesso!');
      setNovaTarefa({
        descricao: '',
        setor: '',
        prioridade: '',
        data_cadastro: '',
        status: 'A Fazer',
        fk_id_usuario: '',
      });
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      border: '1px solid #cccccc',
      borderRadius: '4px',
      fontSize: '16px',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#4caf50',
      outline: 'none',
    },
    button: {
      backgroundColor: 'var(--cor-fundo-destaque)',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '12px',
      width: '100%',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    select: {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      border: '1px solid #cccccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Cadastro de Tarefa</h2>
      <input
        style={styles.input}
        placeholder="Descrição"
        value={novaTarefa.descricao}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
      />
      <input
        style={styles.input}
        placeholder="Setor"
        value={novaTarefa.setor}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, setor: e.target.value })}
      />
      <input
        style={styles.input}
        placeholder="Prioridade"
        value={novaTarefa.prioridade}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, prioridade: e.target.value })}
      />
      <input
        type="date"
        style={styles.input}
        value={novaTarefa.data_cadastro}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, data_cadastro: e.target.value })}
      />
      <select
        style={styles.select}
        value={novaTarefa.fk_id_usuario}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, fk_id_usuario: e.target.value })}
      >
        <option value="">Selecione o Usuário</option>
        {usuarios.map((usuario) => (
          <option key={usuario.id_usuario} value={usuario.id_usuario}>
            {usuario.nome}
          </option>
        ))}
      </select>
      <button
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={salvarTarefa}
      >
        Salvar
      </button>
    </div>
  );
}

export default CadastroTarefa;
