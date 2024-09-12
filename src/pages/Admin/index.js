import { useState, useEffect } from "react";
import "./admin.css";

import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export default function Admin() {
  const [taskInput, setTaskInput] = useState("");
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState({});

  useEffect(() => {
    async function loadTasks() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);
        const taskRef = collection(db, "tasks");
        const q = query(
          taskRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );
        const unsub = onSnapshot(q, (snapshpt) => {
          let list = [];

          snapshpt.forEach((doc) => {
            list.push({
              id: doc.id,
              task: doc.data().task,
              userUid: doc.data().userUid,
            });
          });
          setTasks(list);
        });
      }
    }
    loadTasks();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    if (taskInput === "") {
      alert("Digite sua tarefa");
      return;
    }

    if (editTask?.id) {
      handleUpdateTask();
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

  async function handleDoneTask(id) {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
  }

  function handleEditTask(item) {
    setTaskInput(item.task);
    setEditTask(item);
  }

  async function handleUpdateTask() {
    const docRef = doc(db, "tasks", editTask?.id);
    await updateDoc(docRef, {
      task: taskInput,
    })
      .then(() => {
        console.log("Tarefa atualizada com sucesso!");
        setTaskInput("");
        setEditTask({});
      })
      .catch(() => {
        console.log("Erro ao atualizar tarefa.");
        setTaskInput("");
        setEditTask({});
      });
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

        {Object.keys(editTask).length > 0 ? (
          <button className="admin_btn_register" type="submit">
            Atualizar tarefa
          </button>
        ) : (
          <button className="admin_btn_register" type="submit">
            Registrar nova tarefa
          </button>
        )}
      </form>

      {tasks.map((item) => (
        <article key={item.id} className="admin_list">
          <p>{item.task}</p>

          <div>
            <button
              onClick={() => {
                handleEditTask(item);
              }}
            >
              Editar
            </button>
            <button
              className="admin_btn_done"
              onClick={() => {
                handleDoneTask(item.id);
              }}
            >
              Concluir
            </button>
          </div>
        </article>
      ))}

      <button className="admin_btn_logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
