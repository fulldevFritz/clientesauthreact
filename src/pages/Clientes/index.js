import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import logoCadastro from "../../assets/cadastro.png";
import { FiEdit, FiUserX, FiXCircle } from "react-icons/fi";

export default function Clientes() {
  return (
    <div className="cliente-container">
      <header>
        <img src={logoCadastro} alt="Cadastro" />
        <span>
          Bem vindo, <strong>Fritas</strong>
        </span>
        <Link className="button" to="/cliente/novo/0">
          Novo Cliente
        </Link>
        <button type="button">
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
      <li>
          <b>Nome:</b>Liz<br /><br />
          <b>Email:</b>lizpililica@gmail.com<br /><br />
          <b>Idade:</b>5<br /><br />
          <button type="button">
            <FiEdit size={20} color="#17202a" />
          </button>
          <button type="button">
            <FiUserX size={20} color="#17202a" />
          </button>
        </li>
        <li>
          <b>Nome:</b>Iza<br /><br />
          <b>Email:</b>izatililica@gmail.com<br /><br />
          <b>Idade:</b>4<br /><br />
          <button type="button">
            <FiEdit size={20} color="#17202a" />
          </button>
          <button type="button">
            <FiUserX size={20} color="#17202a" />
          </button>
        </li>
      </ul>
    </div>
  );
}
