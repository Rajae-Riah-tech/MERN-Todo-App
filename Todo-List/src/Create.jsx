import React, { useState } from "react";
import axios from "axios";

function Create({ onTaskAdded }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    axios
      .post("http://localhost:3002/add", { task })
      .then((result) => {
        onTaskAdded(result.data); // Call the function passed from Home
        setTask(""); // Clear the input field
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
