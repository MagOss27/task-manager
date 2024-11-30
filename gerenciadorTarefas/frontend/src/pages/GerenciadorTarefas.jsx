import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

function GerenciadorTarefas() {
  const [tarefas, setTarefas] = useState([]);

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
    buscarTarefas();
  }, []);

  const tarefasAFazer = tarefas.filter((tarefa) => tarefa.status === 'A Fazer');
  const tarefasFazendo = tarefas.filter((tarefa) => tarefa.status === 'Fazendo');
  const tarefasPronto = tarefas.filter((tarefa) => tarefa.status === 'Pronto');

  return (
    <div>
      <h2> ➜ Gerenciador de Tarefas</h2>
      <div className="dashboard">
        <div className="coluna-dashboard">
          <h3>A Fazer</h3>
          {tarefasAFazer.map((tarefa) => (
            <Card key={tarefa.id_tarefa} tarefa={tarefa} buscarTarefas={buscarTarefas} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h3>Fazendo</h3>
          {tarefasFazendo.map((tarefa) => (
            <Card key={tarefa.id_tarefa} tarefa={tarefa} buscarTarefas={buscarTarefas} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h3>Pronto</h3>
          {tarefasPronto.map((tarefa) => (
            <Card key={tarefa.id_tarefa} tarefa={tarefa} buscarTarefas={buscarTarefas} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GerenciadorTarefas;
