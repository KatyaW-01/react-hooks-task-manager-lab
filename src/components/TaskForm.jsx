import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const {addTask} = useContext(TaskContext)

  const id = useId()

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return;
    
    const newTask = {
      title: taskName.trim(),
      completed: false,
    }

    addTask(newTask)
    setTaskName("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={id}>New Task:</label>
      <input
        id={id}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
