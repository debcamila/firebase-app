import { useState } from "react";
import "./admin.css";

import { auth } from "../../firebaseConnection";
import { signOut } from "firebase/auth";

export default function Admin() {
  const [taskInput, setTaskInput] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    alert("clicou");
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="admin_container">
      <h1>Minhas Tarefas</h1>

      <form className="home_form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />

        <button className="admin_btn_register" type="submit">
          Registrar nova tarefa
        </button>
      </form>

      <article className="admin_list">
        <p>Estudar JavaScript e React.js este mês</p>

        <div>
          <button>Editar</button>
          <button className="admin_btn_done">Concluir</button>
        </div>
      </article>

      <button className="admin_btn_logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
