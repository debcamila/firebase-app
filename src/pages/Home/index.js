import { useState } from "react";
import "./home.css";

import { Link } from "react-router-dom";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      alert("registrar");
    } else {
      alert("Preencha todos os campos.");
    }
  }

  return (
    <div className="home_container">
      <h1>Lista de Tarefas</h1>
      <span>Gerencie suas tarefas de forma fácil.</span>

      <form className="home_form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          autoComplete={false}
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Acessar</button>
      </form>

      <Link className="home_link" to="/register">
        Não possui uma conta? Cadastra-se
      </Link>
    </div>
  );
}
