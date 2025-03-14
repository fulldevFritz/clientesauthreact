import React, {useEffect, useState} from "react";
import "./styles.css";
import api from "../../services/api";
import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function NovoCliente() {

  const [id, setId] = useState('');
  const [nome, setNome] = useState(''); 
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState(0);

  const { clienteId } = useParams();
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  async function loadCliente() {
    try {
      if (clienteId !== '0') {
        const response = await api.get(`api/Clientes/${clienteId}`, 
          authorization);
        setId(response.data.id);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setIdade(response.data.idade);
      }
    } catch (error) {
      alert("Falha ao carregar cliente. " + error.message);
      navigate("/clientes");
    }
  };

  async function saveClienteOrUpdate(e) {
    e.preventDefault();
    const data = {
      nome,
      email,
      idade,
    };

    try {
      if (clienteId === '0') {
        await api.post("api/Clientes", data, authorization);
      } else {
        data.id = id;
        await api.put(`api/Clientes/${id}`, data, authorization);
      }
    } catch (error) {
      alert("Falha ao salvar cliente. " + error.message);
    }
    navigate("/clientes");
  }

  useEffect(() => {
    if(clienteId === '0') {
      return;
    } else {
      loadCliente();
    }
  }, clienteId);


  return (
    <div className="novo-cliente-container">
      <div className="content">
        <section className="form">
          <FiUserPlus size={105} color="#17202a" />
          <h1>
            {clienteId === '0' ? 'Incluir Novo Cliente' : 'Atualizar Cliente'}
          </h1>
          <Link className="back-link" to="/clientes">
            <FiCornerDownLeft size={25} color="#17202a" />
            Retornar
          </Link>
        </section>
        <form onSubmit={saveClienteOrUpdate}>
          <input type="text" placeholder="Nome" 
          value={nome}
          onChange={e => setNome(e.target.value)}
          />
          <input type="email" placeholder="E-mail" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
          <input type="idade" placeholder="Idade" 
          value={idade}
          onChange={e => setIdade(e.target.value)}
          />
          <button className="button" type="submit">
            {clienteId === '0' ? 'Incluir' : 'Atualizar'}
          </button>
        </form>
      </div>
    </div>
  );
}
