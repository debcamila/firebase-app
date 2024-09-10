import { useState } from "react";
import "./home.css";

import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/admin", { replace: true });
        })
        .catch(() => {
          console.log("Erro ao fazer o login");
        });
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
