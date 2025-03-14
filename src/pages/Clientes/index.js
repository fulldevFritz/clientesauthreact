import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import api from "../../services/api";
import logoCadastro from "../../assets/cadastro.png";
import { FiEdit, FiUserX, FiXCircle } from "react-icons/fi";

export default function Clientes() {

  const [searchInput, setSearchInput] = useState("");
  const [filtro, setFiltro] = useState("");
   
  const [clientes, setClientes] = useState([]);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const searchClientes = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const dadosFiltrados = clientes.filter((item) => {
        return Object.values(item).join('').toLowerCase()
        .includes(searchInput.toLowerCase());
      });
      setFiltro(dadosFiltrados);
    } else {
      setFiltro(clientes);
    }
  };

  useEffect(() => {
    api.get("api/Clientes", authorization).then((response) => {
      setClientes(response.data);
    }, token);
  });

  async function logout() {
    try {
      localStorage.clear();
      localStorage.setItem("token", '');
      authorization.headers = '';
      navigate("/");
    } catch (error) {
      alert("Falha no logout, tente novamente. " + error.message);
    }
  }

  async function editCliente(id) {
    try {
      navigate(`/cliente/novo/${id}`);  
    } catch (error) {
      alert("Falha ao editar cliente. " + error.message);
    }
  }

  async function deleteCliente(id){
    try {
      if(window.confirm('Deseja deletar o clinte de id = ' + id + ' ?')){
        await api.delete(`api/Clientes/${id}`, authorization)
        setClientes(clientes.filter(cliente => cliente.id !== id))
      }
    } catch (error) {
      alert('Não foi possível excluir o aluno')
    }
  }

  return (
    <div className="cliente-container">
      <header>
        <img src={logoCadastro} alt="Cadastro" />
        <span>
          Bem vindo, <strong>{email}</strong>
        </span>
        <Link className="button" to="/cliente/novo/0">
          Novo Cliente
        </Link>
        <button onClick={logout} type="button">
          <FiXCircle size={35} color="#17202a" />
        </button>
      </header>
      <form>
        <input type="text" placeholder="Filtrar por nome.." 
          onChange={(e) => searchClientes(e.target.value)}
        />
      </form>
      <h1>Relação de Clientes</h1>
      { searchInput.length > 1 ? (
      <ul>
        {filtro.map((cliente) => (
          <li key={cliente.id}>
            <strong>Nome:</strong>
            <p>{cliente.nome}</p>
            <strong>Email:</strong>
            <p>{cliente.email}</p>
            <strong>Idade:</strong>
            <p>{cliente.idade}</p>
            <button onClick={() => editCliente(cliente.id)} type="button">
              <FiEdit size={20} color="#17202a" />
            </button>
            <button type="button" onClick={() => deleteCliente(cliente.id)}>
              <FiUserX size={20} color="#17202a" />
            </button>
          </li>
        ))}
      </ul>) : 
      (<ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <strong>Nome:</strong>
            <p>{cliente.nome}</p>
            <strong>Email:</strong>
            <p>{cliente.email}</p>
            <strong>Idade:</strong>
            <p>{cliente.idade}</p>
            <button onClick={() => editCliente(cliente.id)} type="button">
              <FiEdit size={20} color="#17202a" />
            </button>
            <button type="button" onClick={() => deleteCliente(cliente.id)}>
              <FiUserX size={20} color="#17202a" />
            </button>
          </li>
        ))}
      </ul>)}
    </div>
  );
}
