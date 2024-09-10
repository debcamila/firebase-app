import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/admin", { replace: true });
        })
        .catch(() => {
          console.log("Erro ao fazer o cadastro");
        });
    } else {
      alert("Preencha todos os campos.");
    }
  }

  return (
    <div className="home_container">
      <h1>Cadastra-se</h1>
      <span>Crie uma conta.</span>

      <form className="home_form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Digite um e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Digite uma senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      <Link className="home_link" to="/">
        Já possui uma conta? Faça o Login
      </Link>
    </div>
  );
}
