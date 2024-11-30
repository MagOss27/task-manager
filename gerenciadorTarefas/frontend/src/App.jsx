import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CadastroUsuario from './pages/CadastroUsuario';
import CadastroTarefa from './pages/CadastroTarefa';
import GerenciadorTarefas from './pages/GerenciadorTarefas';
import './App.css'; // Estilos externos para melhorar a organização

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-logo">TaskManager</div>
          <ul className="navbar-links">
            <li>
              <NavLink 
                to="/gerenciador-tarefas" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Gerenciador de Tarefas
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/cadastro-usuario" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Cadastro de Usuário
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/cadastro-tarefa" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Cadastro de Tarefa
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Rotas */}
        <Routes>
          <Route path="/gerenciador-tarefas" element={<GerenciadorTarefas />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
          <Route path="/cadastro-tarefa" element={<CadastroTarefa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
