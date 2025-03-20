import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  // Function to update todos when a new task is added
  const handleTaskAdded = (newTask) => {
    setTodos([...todos, newTask]);
  };

  // Function to update task status
  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3002/update/${id}`)
      .then((result) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  // Function to delete a task without reloading
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3002/delete/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <div>Todo List</div>
      <Create onTaskAdded={handleTaskAdded} />
      <br />
      {todos.length === 0 ? (
        <div>
          <h1>Nothing has been added</h1>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
