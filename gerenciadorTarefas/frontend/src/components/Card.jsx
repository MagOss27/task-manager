import React, { useState } from 'react';








function Card({ tarefa, buscarTarefas, buscarUsuarios }) {
  const [editedTask, setEditedTask] = useState({ ...tarefa });
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    id_usuario: '',
    data_cadastro: '',
  });








  const alterarSituacao = async (novaSituacao) => {
    if (novaSituacao === 'atribuida') {
      setIsAssignmentModalOpen(true);
    } else {
      await atualizarTarefa(novaSituacao);
    }
  };








  const atualizarTarefa = async (novaSituacao, dadosAtribuicao = null) => {
    const body = { ...tarefa, status: novaSituacao };
    if (dadosAtribuicao) {
      body.fk_id_usuario = dadosAtribuicao.id_usuario; // Certifique-se de que o nome da chave está correto
      body.data_cadastro = dadosAtribuicao.data_cadastro;
    }
  
    console.log('Enviando PUT com os dados:', body); // Log dos dados enviados
  
    try {
      const response = await fetch(`http://localhost:3000/tarefas/${tarefa.id_tarefa}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Erro ao atualizar tarefa:', errorMessage);
      } else {
        buscarTarefas();
      }
    } catch (error) {
      console.error('Erro na requisição:', error.message);
    }
  };







  const salvarAtribuicao = async () => {
    await atualizarTarefa('atribuida', assignmentData);
    setIsAssignmentModalOpen(false);
    setAssignmentData({ id_usuario: '', data_cadastro: '' });
  };








  const editarTarefa = async () => {
    await fetch(`http://localhost:3000/tarefas/${tarefa.id_tarefa}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedTask),
    });
    buscarTarefas();
    setIsEditModalOpen(false);
  };








  const deletarTarefa = async () => {
    const confirmed = window.confirm("Tem certeza de que deseja deletar esta tarefa?");
    if (confirmed) {
      await fetch(`http://localhost:3000/tarefas/${tarefa.id_tarefa}`, { method: 'DELETE' });
      buscarTarefas();
    }
  };








  return (
    <div className="card">
      <p>Descrição: {tarefa.descricao}</p>
      <p>Prioridade: {tarefa.prioridade}</p>
      <p>Situação: {tarefa.status}</p>


      {tarefa.status === 'A Fazer' && (
        <>
          <button onClick={() => alterarSituacao('Fazendo')}>Fazendo</button>
          <button onClick={() => alterarSituacao('Pronto')}>Pronto</button>
        </>
      )}


      {tarefa.status === 'Fazendo' && (
        <button onClick={() => alterarSituacao('Pronto')}>Pronto</button>
      )}


      <button onClick={() => setIsEditModalOpen(true)}>Editar</button>
      <button onClick={deletarTarefa}>Deletar</button>








      {isAssignmentModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Registrar Atribuição</h2>
            <input
              placeholder="ID do Usuário"
              value={assignmentData.id_usuario}
              onChange={(e) => setAssignmentData({ ...assignmentData, id_usuario: e.target.value })}
            />
            <input
              type="date"
              placeholder="Data de Início"
              value={assignmentData.data_cadastro}
              onChange={(e) => setAssignmentData({ ...assignmentData, data_cadastro: e.target.value })}
            />
            {/* <input
              type="date"
              placeholder="Data de Fim"
              value={assignmentData.data_fim}
              onChange={(e) => setAssignmentData({ ...assignmentData, data_fim: e.target.value })}
            /> */}
            <button onClick={salvarAtribuicao}>Confirmar Atribuição</button>
            <button onClick={() => setIsAssignmentModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}








      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Tarefa</h2>
            <input
              value={editedTask.titulo}
              onChange={(e) => setEditedTask({ ...editedTask, titulo: e.target.value })}
              placeholder="Título"
            />
            <textarea
              value={editedTask.descricao}
              onChange={(e) => setEditedTask({ ...editedTask, descricao: e.target.value })}
              placeholder="Descrição"
            />
            <select
              value={editedTask.prioridade}
              onChange={(e) => setEditedTask({ ...editedTask, prioridade: e.target.value })}
            >
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>




            <select
              value={editedTask.status}
              onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
            >
              <option value="A Fazer">A Fazer</option>
              <option value="Fazendo">Fazendo</option>
              <option value="Pronto">Pronto</option>
            </select>
            <button onClick={editarTarefa}>Salvar</button>
            <button onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );








}








export default Card;



