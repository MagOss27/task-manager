import React, { useEffect, useState } from 'react';
import Card from './components/Card';




function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [isAddingUsuario, setIsAddingUsuario] = useState(false);
  const [isAddingTarefa, setIsAddingTarefa] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
  });
  const [novaTarefa, setNovaTarefa] = useState({
    descricao: '',
    setor: '',
    prioridade: '',
    data_cadastro: '',
    status: 'A Fazer',
    fk_id_usuario: '',
  });




  const salvarUsuario = async () => {
    try {
      await fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario),
      });
      setIsAddingUsuario(false);
      setNovoUsuario({ nome: '', email: '' });
      buscarUsuarios();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };




  const salvarTarefa = async () => {
    try {
      await fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTarefa),
      });
      setIsAddingTarefa(false);
      setNovaTarefa({
        descricao: '',
        setor: '',
        prioridade: '',
        data_cadastro: '',
        status: 'A Fazer',
        fk_id_usuario: '',
      });
      buscarTarefas();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };




  const buscarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuario');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };




  const buscarTarefas = async () => {
    try {
      const response = await fetch('http://localhost:3000/tarefas');
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };




  useEffect(() => {
    buscarUsuarios();
    buscarTarefas();
  }, []);




  // Filtrando as tarefas por status
  const tarefasAFazer = tarefas.filter(tarefa => tarefa.status === 'A Fazer');
  const tarefasFazendo = tarefas.filter(tarefa => tarefa.status === 'Fazendo');
  const tarefasPronto = tarefas.filter(tarefa => tarefa.status === 'Pronto');




  return (
    <div>
      <header>
        <h1>Gerenciador de Tarefas</h1>
        <button onClick={() => setIsAddingUsuario(true)}>Adicionar Usuário</button>
        <button onClick={() => setIsAddingTarefa(true)}>Adicionar Tarefa</button>
      </header>
      <div className="dashboard">
        <div className="coluna-dashboard">
          <h2>A Fazer</h2>
          {tarefasAFazer.map((tarefa) => (
            <Card key={tarefa.id_tarefa} tarefa={tarefa} buscarTarefas={buscarTarefas} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h2>Fazendo</h2>
          {tarefasFazendo.map((tarefa) => (
            <Card key={tarefa.id_tarefa} tarefa={tarefa} buscarTarefas={buscarTarefas} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h2>Pronto</h2>
          {tarefasPronto.map((tarefa) => (
            <Card key={tarefa.id_tarefa} tarefa={tarefa} buscarTarefas={buscarTarefas} />
          ))}
        </div>
      </div>
      {isAddingUsuario && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Usuário</h2>
            <input
              placeholder="Nome"
              value={novoUsuario.nome}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
            />
            <input
              placeholder="Email"
              value={novoUsuario.email}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
            />
            <button onClick={salvarUsuario}>Salvar</button>
            <button onClick={() => setIsAddingUsuario(false)}>Cancelar</button>
          </div>
        </div>
      )}
      {isAddingTarefa && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Tarefa</h2>
            <input
              placeholder="Descrição"
              value={novaTarefa.descricao}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
            />
            <input
              placeholder="Setor"
              value={novaTarefa.setor}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, setor: e.target.value })}
            />
            <input
              placeholder="Prioridade"
              value={novaTarefa.prioridade}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, prioridade: e.target.value })}
            />
            <input
              type="date"
              placeholder="Data de Cadastro"
              value={novaTarefa.data_cadastro}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, data_cadastro: e.target.value })}
            />
            {/* <input
              placeholder="Status"
              value={novaTarefa.status}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, status: e.target.value })}
            /> */}
            <select
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
            <button onClick={salvarTarefa}>Salvar</button>
            <button onClick={() => setIsAddingTarefa(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}




export default App;



