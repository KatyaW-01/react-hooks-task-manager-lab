import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
      fetch('http://localhost:6001/tasks')
      .then(r=>r.json())
      .then(data=>setTasks(data))
      
    }, []);

    function toggleComplete(id) {
      const taskToUpdate = tasks.find(task => task.id === id) // finds the single task with that id
      const updatedTask = {...taskToUpdate, completed: !taskToUpdate.completed} //changes the value of completed

      fetch(`http://localhost:6001/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({completed: updatedTask.completed}) //fetch request changing the value of completed in the server
      })
      .then((response) => response.json())
      .then((updatedData) => {
        const updatedTasks = tasks.map(task => task.id === id ? updatedData : task)
        setTasks(updatedTasks)
      })
    }

    async function addTask(task) {
      try {
        const response = await fetch("http://localhost:6001/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(task)
        })
        const newTask = await response.json()
        setTasks(prevTasks => [...prevTasks, newTask])
      } catch (error) {
        console.error("Error adding task", error)
      }
    }

    return (
      <TaskContext.Provider value={{tasks,setTasks, toggleComplete, addTask}} >
        {children}
      </TaskContext.Provider>
    )

}
