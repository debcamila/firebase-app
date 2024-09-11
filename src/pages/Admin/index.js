import { useState, useEffect } from "react";
import "./admin.css";

import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";

import { addDoc, collection } from "firebase/firestore";

export default function Admin() {
  const [taskInput, setTaskInput] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadTasks() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));
    }
    loadTasks();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    if (taskInput === "") {
      alert("Digite sua tarefa");
      return;
    }

    await addDoc(collection(db, "tasks"), {
      task: taskInput,
      created: new Date(),
      userUid: user?.uid,
    })
      .then(() => {
        console.log("Tarefa registrada com sucesso.");
        setTaskInput("");
      })
      .catch((error) => {
        console.log("Erro ao registrar tarefa " + error);
      });
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
