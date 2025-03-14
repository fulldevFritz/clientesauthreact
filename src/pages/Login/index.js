import React, {useState} from "react";
import "./styles.css";
import api from "../../services/api";
import {useNavigate} from "react-router-dom";
import logoImage from "../../assets/login.png";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      email,
      password
    }

    try {

      const response = await api.post('api/Account/LoginUser', data);

      localStorage.setItem('email', email);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiration', response.data.expiration);

      navigate('/clientes');

    } catch (error) {
      alert('Falha no login, tente novamente. ' + error.message || error.response?.data);
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImage} alt="Login" id="img1" />
        <h1>Cadastro de Clientes</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input type="password" placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}        
          />

          <button className="button" type="submit">Login</button>
        </form>
      </section>
    </div>
  );
}
