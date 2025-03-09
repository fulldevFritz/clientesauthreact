import React from "react";
import "./styles.css";
import logoImage from "../../assets/login.png";

export default function Login() {
  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImage} alt="Login" id="img1" />
        <h1>Cadastro de Clientes</h1>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button class="button" type="submit">Login</button>
        </form>
      </section>
    </div>
  );
}
