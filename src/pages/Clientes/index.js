import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import api from "../../services/api";
import logoCadastro from "../../assets/cadastro.png";
import { FiEdit, FiUserX, FiXCircle } from "react-icons/fi";

export default function Clientes() {
  //const [nome, setNome] = useState("");
  const [clientes, setClientes] = useState([]);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
        <input type="text" placeholder="Nome" />
        <button class="button" type="button">
          Filtrar cliente por nome (parcial)
        </button>
      </form>
      <h1>Relação de Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <strong>Nome:</strong>
            <p>{cliente.nome}</p>
            <strong>Email:</strong>
            <p>{cliente.email}</p>
            <strong>Idade:</strong>
            <p>{cliente.idade}</p>
            <button type="button">
              <FiEdit size={20} color="#17202a" />
            </button>
            <button type="button">
              <FiUserX size={20} color="#17202a" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
