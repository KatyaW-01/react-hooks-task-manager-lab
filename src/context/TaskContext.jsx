import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
      fetch('http://localhost:6001/tasks')
      .then(r=>r.json())
      .then(data=>setTasks(data))
      
    }, []);

    return (
      <TaskContext.Provider value={{tasks,setTasks}} >
        {children}
      </TaskContext.Provider>
    )

}
