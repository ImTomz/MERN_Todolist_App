import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [complete, setComplete] = useState(0);
  const inputRef = useRef();

  //Showing todos on mount
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/");
      const data = await res.json();
      setTodos(data);
      console.log(data);
    }

    fetchData();
  }, [complete]);

  //Handling adding new todo
  const handleSubmit = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    };
    const req = await fetch("http://localhost:5000/", options);
    const res = await req.json();
    setTodos([...todos, res]);
    inputRef.current.value = "";
  };

  //Handling marking like complete
  const handleComplete = async (todoID) => {
    const url = "http://localhost:5000/" + todoID;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isComplete: true }),
    };
    const req = await fetch(url, options);
    setComplete(complete + 1);
  };

  //Handling deleting todo
  const handleDelete = async (todoID) => {
    const url = "http://localhost:5000/" + todoID;
    const req = await fetch(url, { method: "DELETE" });
    const list = todos.filter((e) => e._id !== todoID);
    setTodos(list);
  };

  return (
    <div className="App">
      <h1>Todos</h1>
      <div className="input-div">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          ref={inputRef}
          className="todo-input"
          onSubmit={handleSubmit}
        />
        <button onClick={handleSubmit} className="add-btn">
          +
        </button>
      </div>
      <div>
        {todos.map((todo, index) => {
          return (
            <div key={index} className="todo">
              <p
                className={
                  todo.isComplete ? "todo-title todo-complete" : "todo-title"
                }
              >
                {todo.title}
              </p>
              <div>
                {!todo.isComplete ? (
                  <button
                    onClick={() => {
                      handleComplete(todo._id);
                    }}
                    className="remove-btn complete"
                  >
                    DONE
                  </button>
                ) : null}
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="remove-btn"
                >
                  X
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
