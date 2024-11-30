import React, { useState } from 'react';

function CadastroUsuario() {
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
  });
  const [erro, setErro] = useState('');

  const validarEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const salvarUsuario = async () => {
    if (!novoUsuario.nome || !novoUsuario.email) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    if (!validarEmail(novoUsuario.email)) {
      setErro('Por favor, insira um email válido.');
      return;
    }

    try {
      await fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario),
      });
      alert('Usuário cadastrado com sucesso!');
      setNovoUsuario({ nome: '', email: '' });
      setErro('');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: 'var(--cor-fundo)',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ textAlign: 'center', color: 'var(--cor-texto)' }}>Cadastro de Usuário</h2>

      {erro && (
        <div
          style={{
            color: 'red',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          {erro}
        </div>
      )}

      <input
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
        }}
        placeholder="Nome"
        value={novoUsuario.nome}
        onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
      />
      <input
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
        }}
        placeholder="Email"
        value={novoUsuario.email}
        onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
      />
      <button
        onClick={salvarUsuario}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: 'var(--cor-fundo-destaque)',
          color: 'var(--cor-fundo)',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        Salvar
      </button>
    </div>
  );
}

export default CadastroUsuario;
