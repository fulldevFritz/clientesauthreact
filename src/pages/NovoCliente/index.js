import React from "react";
import "./styles.css";
import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

export default function NovoCliente() {
  const { alunoId } = useParams();

  return (
    <div className="novo-cliente-container">
      <div className="content">
        <section className="form">
          <FiUserPlus size={105} color="#17202a" />
          <h1>
            {alunoId === '0' ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}
          </h1>
          <Link className="back-link" to="/clientes">
            <FiCornerDownLeft size={25} color="#17202a" />
            Retornar
          </Link>
        </section>
        <form>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="idade" placeholder="Idade" />
          <button class="button" type="submit">
            {alunoId === '0' ? 'Incluir' : 'Atualizar'}
          </button>
        </form>
      </div>
    </div>
  );
}
